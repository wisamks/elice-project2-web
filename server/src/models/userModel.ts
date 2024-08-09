import UserDb from "@_models/userDb";
import { User, UserCreationData, UserUpdateData, OAuthUserInfo, SnsCode, JoinUser } from "@_/customTypes/userType";
import { NotFoundError, BadRequestError, ConflictError, DataNotFoundError, QueryExecutionError } from "@_utils/customError";
import UserUpdateDTO from "@_/middlewares/DTOs/userUpdateDTO";
// low-level의 오류를 high-level로 전달해서 변환하기


class UserModel extends UserDb {
    public static async initiateUserFromOauth(oauthUserInfo: JoinUser): Promise<User> {
        try {
            const existingUser = await this.findByOauth(oauthUserInfo.email, oauthUserInfo.snsCode);
            if (existingUser) {
                return existingUser;
            }
            return await this.createInitialUser(oauthUserInfo);
        } catch (err) {
            if (err instanceof QueryExecutionError) {
                throw new BadRequestError('Failed to initiate user from OAuth');
            }
            throw err;
        }
    }
    
    public static async findByOauth(email: string, snsCode: SnsCode): Promise<User | null> {
        const sql = 'SELECT * FROM user WHERE email = ? AND sns_code = ? AND deleted_at IS NULL';
        try {
            return await this.findOne(sql, [email, snsCode]);
        } catch (err) {
            if (err instanceof DataNotFoundError) {            
                return null;
            }
            throw err;
        }
    }

    private static async createInitialUser(oauthUserInfo: JoinUser): Promise<User> {
        const userData: UserCreationData = {
            email: oauthUserInfo.email,
            name: oauthUserInfo.name,
            nickname: oauthUserInfo.nickname,
            image: oauthUserInfo.image || null,
            snsCode: oauthUserInfo.snsCode
        };

        const { email, name, nickname, image, snsCode } = userData;

        const sql = `
            INSERT INTO user (email, name, nickname, image, sns_code)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [email, name, nickname, image, snsCode];

        try {
            const insertId = await this.insert(sql, values);
            return {
                id: insertId,
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            } as User;
        } catch (err) {
            if (err instanceof QueryExecutionError) {
                throw new ConflictError('User already exists or invalid data');
            }
            throw err;
        }
    }

    public static async completeRegistration(id: number, nickname: string): Promise<User | null> {
        const sql = `
            UPDATE user 
            SET nickname = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ? AND nickname IS NULL AND deleted_at IS NULL
        `;

        try {
            const result = await this.update(sql, [nickname, id]);
            if (result > 0) {
                return this.findById(id);
            }
            return null;
        } catch (err) {
            if (err instanceof QueryExecutionError) {
                throw new BadRequestError('Failed to complete user registration');
            }
            throw err;
        }
    }

    public static async findById(id: number): Promise<User | null> {
        const sql = `SELECT * FROM user WHERE id = ? AND deleted_at IS NULL`;
        try {
            return await this.findOne(sql, [id]);
        } catch (err) {
            if (err instanceof DataNotFoundError) {
                return null;
            }
            throw err;
        }
    }

    public static async findExistNickname(nickname: string): Promise<boolean> {
        const sql = 'SELECT COUNT(*) as count FROM user WHERE nickname = ? AND deleted_at IS NULL';
        try {
            const result: { count: number } = await this.findOne(sql, [nickname]);
            return result.count > 0;
        } catch (err) {
            if (err instanceof DataNotFoundError) {
                return false;
            }
            throw err;
        }
    }

    public static async updateUser(data: UserUpdateDTO): Promise<User | null> {
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        
        if (data.nickname !== undefined) {
            updateFields.push('nickname = ?');
            updateValues.push(data.nickname);
        } 
        
        if (data.image !== undefined) {
            updateFields.push('image = ?');
            updateValues.push(data.image);
        }

        if (updateFields.length === 0) return null;

        const sql = `
            UPDATE user 
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ? AND deleted_at IS NULL
        `;

        updateValues.push(data.userId);

        try {
            await super.update(sql, updateValues);
            return this.findById(data.userId);
        } catch (err) {
            if (err instanceof QueryExecutionError) {
                throw new ConflictError('Failed to update user');
            }
            throw err;
        }
    }

    public static async softDelete(id: number): Promise<boolean> {
        const sql = 'UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL';
        try {
            const result = await this.update(sql, [id]);
            return result > 0;
        } catch (err) {
            if (err instanceof QueryExecutionError) {
                throw new BadRequestError('Failed to delete user');
            }
            throw err;
        }
    }
}

export default UserModel;


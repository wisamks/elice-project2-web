import UserDb from "@_models/userDb";
import { User, UserCreationData, UserUpdateData, OAuthUserInfo, SnsCode, JoinUser } from "@_/customTypes/userType";


class UserModel extends UserDb {
    public static async initiateUserFromOauth(oauthUserInfo: JoinUser): Promise<User> {
        // 유저 확인
        const existingUser = await this.findByOauth(oauthUserInfo.email, oauthUserInfo.snsCode);
        if (existingUser) {
            return existingUser;
        }

        return await this.createInitialUser(oauthUserInfo);
    }
    
    // oauth 제공자 + email로 조회
    public static async findByOauth(email: string, snsCode: SnsCode): Promise<User | null> {
        const sql = 'SELECT * FROM user WHERE email = ? AND sns_code = ? AND deleted_at IS NULL';
        return await this.findOne(sql, [email, snsCode]);
    }

    // oauth데이터 기반 필드 넣기 nickname null 상태
    private static async createInitialUser(oauthUserInfo: JoinUser): Promise<User> {
        const userData: UserCreationData = {
            email: oauthUserInfo.email,
            name: oauthUserInfo.name,
            nickname: oauthUserInfo.nickname, // 닉네임 입력 전 
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
            console.error('cannot user create: ', err);
            throw err;
        }
    }

    // 필드 추가 완료 데이터    
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
            console.error('cannot complete user :', err);
            throw err;
        }
    }

    // id로 조회
    public static async findById(id: number): Promise<User | null> {
        const sql = `SELECT * FROM user WHERE id = ? AND deleted_at IS NULL`;
        return await this.findOne(sql, [id]);
    }

    // 닉네임 있는지 조회 
    public static async findExistNickname(nickname: string): Promise<boolean> {
        const sql = 'SELECT COUNT(*) as count FROM user WHERE nickname = ? AND deleted_at IS NULL';
        try {
            const result: { count: number } = await this.findOne(sql, [nickname]);
            return result.count > 0;        // count: n or 0
        } catch (err) {
            console.error('findExistNickname fail:', err);
            throw err;
        }
    }

    // updateuser는 변경 예정
    public static async updateUser(id: number, updatedData: UserUpdateData): Promise<User | null> {
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        
        if (updatedData.nickname !== undefined) {
            updateFields.push('nickname = ?');
            updateValues.push(updatedData.nickname);
        } 
        
        if (updatedData.image !== undefined) {
            updateFields.push('image = ?');
            updateValues.push(updatedData.image);
        }

        if (updateFields.length === 0) return null;

        const sql = `
            UPDATE user 
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ? AND deleted_at IS NULL
        `;

        updateValues.push(id);

        try {
            await super.update(sql, updateValues);
            return this.findById(id);
        } catch (err) {
            console.error('cannot update user: ', err);
            throw err;
        }
    }
    // soft delete
    public static async softDelete(id: number): Promise<boolean> {
        const sql = 'UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL';

        try {
            const result = await this.update(sql, [id]);
            return result > 0;
        } catch (err) {
            console.error('cannot softdelete:', err);
            throw err;
        }
    }
}



export default UserModel;

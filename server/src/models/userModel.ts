import UserDb from "@_models/userDb";
import { User, UserCreationData, UserUpdateData, OauthUserInfo, SnsCode, UserRegistrationData } from "@_/customTypes/userType";




class UserModel extends UserDb {
    public static async createFromOauth(oauthInfo: OauthUserInfo): Promise<User> {
        const existUser = await this.oAuthCheck(oauthInfo.email, oauthInfo.snsCode);
        if (existUser) {
            return existUser;               // 이미 oauth email이랑 snscode로 있으면 확인 후에 유저 반환
        }

        // 없을 때
        const newUserData: UserCreationData = {
            email: oauthInfo.email,
            name: oauthInfo.name,
            nickname: null,              // oauth로 안받는상태이니 null로 받기
            phone: '',                  // phone이 못받아 오는 경우? 아니면 나중에 바꾸기 phone
            profileImage: oauthInfo.picture,
            snsCode: oauthInfo.snsCode
        };

        return await this.create(newUserData);
    }

    // create new user
    private static async create(userData: UserCreationData): Promise<User> {
        const { email, name, nickname, phone, profileImage, snsCode } = userData;

        const sql =`
            INSERT INTO users (email, name, nickname, phone, profileImage, snsCode)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [email, name, nickname, profileImage, snsCode];

        try {
            const insertId = await this.insert(sql, values);
            return {
                id: insertId,
                ...userData,
                createdAt: new Date()
            } as User;
        } catch (err) {
            console.error('cannot user create: ', err);
            throw err;
        }
    }


    // GET => find by id 
    private static async findById(id: number): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE id = ? AND deletedAt IS NULL`;
        return await this.findOne(sql, [id]);
    }

    // UPDATE/PUT ? update
    public static async updateUser(id: number, updatedData: UserUpdateData): Promise<User | null> {
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        
        // 닉네임, 프사, 폰 업데이트 => 나중에 회원가입 완료까지 바뀌는것들
        if (updatedData.nickname !== undefined) {
            updateFields.push('nickname = ?');
            updateValues.push(updatedData.nickname);
        } 
        if (updatedData.profileImage !== undefined) {
            updateFields.push('profileImage = ?');
            updateValues.push(updatedData.profileImage);
        }
        if (updatedData.phone !== undefined) {
            updateFields.push('phone = ?');
            updateValues.push(updatedData.phone);
        }

        if (updateFields.length === 0) return null;

        const sql = `
            UPDATE users 
            SET ${updateFields.join(', ')}, updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ? AND deletedAt IS NULL
        `;

        updateValues.push(id);

        try {
            await super.update(sql, updateValues);
            return this.findById(id);
        } catch (err) {
            console.error('User update failed:', err);
            throw err;
        }
    }

    private static async oAuthCheck(email: string, snsCode: SnsCode): Promise<User | null> {
        const sql = 'SELECT * FROM users WHERE email = ? AND snsCode = ? AND deletedAt IS NULL';
        return await this.findOne(sql, [email, snsCode]);
    }
    
    // 폰이랑 닉네임 나중 추가로 테이블 완성
    public static async completeRegistration(id: number, registrationData: UserRegistrationData): Promise<User | null> {
        const updateData: UserUpdateData = {
            nickname: registrationData.nickname,
            phone: registrationData.phone
        };
        return await this.updateUser(id, updateData);
    }
        
    // soft delete
    public static async softDelete(id: number): Promise<boolean> {
        const sql = 'UPDATE users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ? AND deletedAt IS NULL';
        try {
            const result = await this.update(sql, [id]);
            return result > 0;
        } catch (err) {
            console.error('User soft delete failed:', err);
            throw err;
        }
    }
}



export default UserModel;

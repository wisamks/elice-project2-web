import UserDb from "./userDb";
import { User, SnsCode, UserCreationData } from "./usertype";




class UserModel extends UserDb {
    public static async create(userData: UserCreationData): Promise<User> {
        const { email, nickname, phone, profileImage, name, snsCode } = userData;


        // SQL 쿼리
        const sql = `
        INSERT INTO users (email, nickname, phone, profileImage, name, snsCode)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [email, nickname, phone, profileImage, name, snsCode];

        try {
            const result: any = await this.query(sql, values);

            // omit으로 빠진 부분 sql(db)에서 생성
            return {
                id: result.insertId,
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date()
            } as User;
        } catch (err) {
            console.error('create user table fail:', err);
            throw err;
        }
    }

    public static async findById(id: number): Promise<User | null> {
        const sql = 'SELECT * FROM users WHERE id = ? AND deletedAt IS NULL';           //활성 상태인 id를 조회

        try {
            const results: User[] = await this.query(sql, [id]);
            return results.length ? results[0] : null;
        } catch (err) {
            console.error('find by user id fail:', err);
            throw err;
        }
    }


    // update 함수 정의 완료해야함
    // public static async update(id: number, updateData: UserUpdateData): Promise<User | null> {
    //     const updates = Object.entries(updateData)
    // }

    

    // soft delete
    public static async softDelete(id: number): Promise<boolean> {
        const sql = 'UPDATE users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?';      //지금 timestamp deletedAt에 추가

        try {
            const result: any = await this.query(sql, [id]);        // 바뀐게 있으면 1 / 0 (T/F)
            return result.affectedRows > 0;
        } catch (err) {
            console.error('soft delete fail: ', err);
            throw err;
        }
    }
}


export default UserModel;

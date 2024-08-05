import { Pool, PoolConnection } from 'mysql2/promise'; 
import { pool as dbPool } from '@_config/index';


class TokenModel {
    private static pool: Pool = dbPool;

    protected static async query(sql: string, values: any[] = []): Promise<any> {
        const connection = await this.pool.getConnection();
        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch (err) {
            console.error('Query execution failed: ', err);
            throw err;
        } finally {
            connection.release();
        }
    }

    public static async create(userId: number, token: string) {
        const sql = `INSERT INTO refresh_token(user_id, token) VALUES(?, ?)`;
        const data = [userId, token];
        const result = await this.query(sql, data);
        return result;
    }

    public static async findOne(token: string) {
        const sql = `SELECT user_id, token FROM refresh_token WHERE token = ?`;
        const data = [token];
        const results = await this.query(sql, data);
        return results[0];
    }

    public static async findByUserId(userId: number) {
        const sql = `SELECT user_id, token FROM refresh_token WHERE user_id = ?`;
        const data = [userId];
        const results = await this.query(sql, data);
        return results[0];
    }

    public static async updateOne(userId: number, token: string) {
        const sql = `UPDATE refresh_token SET token = ? WHERE user_id = ?`;
        const data = [token, userId];
        const result = await this.query(sql, data);
        return result;
    }

    public static async delete(token: string) {
        const sql = `DELETE FROM refresh_token WHERE token = ?`;
        const data = [token];
        const result = await this.query(sql, data);
        return result;
    }
}

export default TokenModel;
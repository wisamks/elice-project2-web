import { Pool } from 'mysql2/promise';
import { pool as dbPool } from '@_config/index';

class PostDb {
    private static pool: Pool = dbPool;

    // 매 쿼리마다 새로운 커넥션을 가져오는 방식
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

    protected static async findOne(sql: string, values: any[] = []): Promise<any | null> {
        const results = await this.query(sql, values);
        return results.length ? results[0] : null;
    }

    protected static async findMany(sql: string, values: any[] = []): Promise<any[]> {
        return await this.query(sql, values);
    }

    protected static async insert(sql: string, values: any[] = []): Promise<number> {
        const result: any = await this.query(sql, values);
        return result.insertId;
    }

    protected static async update(sql: string, values: any[] = []): Promise<number> {
        const result: any = await this.query(sql, values);
        return result.affectedRows;
    }

    protected static async delete(sql: string, values: any[] = []): Promise<number> {
        const result: any = await this.query(sql, values);
        return result.affectedRows;
    }
}

export default PostDb;


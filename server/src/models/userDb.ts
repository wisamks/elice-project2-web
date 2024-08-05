import { Pool } from 'mysql2/promise'; 
import { pool as dbPool } from '@_config/index';
import { DatabaseConnectionError, QueryExecutionError, DataNotFoundError } from "@_utils/customError";      
// low-level의 에러처리는 최대한 많은 정보 반환하는것이 좋음

class UserDb {
    private static pool: Pool = dbPool;

    protected static async query(sql: string, values: any[] = []): Promise<any> {
        let connection;
        try {
            connection = await this.pool.getConnection();
        } catch (err) {
            throw new DatabaseConnectionError('Failed to connect to the DB');
        }

        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch (err) {
            throw new QueryExecutionError(`Failed to execute query: ${sql}`);           // 실패한 쿼리 알려주기
        } finally {
            connection.release();
        }
    }

    protected static async findOne(sql: string, values: any[] = []): Promise<any | null> {
        const results = await this.query(sql, values);
        if (results.length === 0) {
            throw new DataNotFoundError(`No data found for query: ${sql}`);             // 실패한 쿼리 알려주기
        }
        return results[0];
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
}

export default UserDb;


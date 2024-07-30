// db관련 연결, 쿼리
// config/db.ts에서 정의한 pool을 가져와서 사용
// 언젠가 커스텀 에러로 처리하기

import { Pool, PoolConnection } from 'mysql2/promise';      //타입 체크용
import { pool as dbPool } from '@_config/index';     // db 확인용


// UserDb 클래스 정의(private로 클래스 내부에서만 접근 가능)
class UserDb {
    private static pool: Pool = dbPool;
    private static connectionPromise: Promise<PoolConnection>;
    
    // db 연결 초기화
    static {
        this.initDb();
    }
    //Primise<void>를 꼭 지정해야 에러 발생 안함(타입스크립트 컴파일 에러)
    private static async initDb(): Promise<void> {  
        try {
            this.connectionPromise = this.pool.getConnection();
            console.log('DB connection init success!');
        } catch (err) {
            console.error('DB connection iniit fail: ', err)
            process.exit(1);                //init 실패하면 종료
        }
    }

    protected static async query(sql: string, values: any[] = []): Promise<any> {
        const connection = await this.connectionPromise;            //연결 connection으로 가져오기
        try {
            const [results] = await connection.execute(sql, values);
            return results;                                       
        } catch (err) {
            console.error('Query execution fail: ', err);
            throw err;
        } finally {
            connection.release();               // 오류랑 상관없이 연결한걸 pool로 반환
        }
    }


    protected static async findOne(sql: string, values: any[] = []): Promise<any | null>{
        const results = await this.query(sql, values);
        return results.length ? results[0] : null;          
    }

    protected static async findMany(sql: string, values: any[] = []): Promise<any[]> {
        return await this.query(sql, values);
    }

    protected static async insert(sql: string, values: any[] = []): Promise<number> {
        const result: any = await this.query(sql, values);
        return await result.insertId;                       // insert한 데이터 id 반환
    }

    protected static async update(sql: string, values: any[] = []): Promise<number> {
        const result: any = await this.query(sql, values);
        return result.affectRows;                           // update한 데이터 변경된 행 반환
    }

}

export default UserDb;


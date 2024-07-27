// db관련 연결, 쿼리
// config/db.ts에서 정의한 pool을 가져와서 사용

import { PoolConnection } from 'mysql2/promise';
import pool from '../config/db';


// UserDb 클래스 정의(private로 클래스 내부에서만 접근 가능)
class UserDb {
    private static connectionPromise: Promise<PoolConnection>;
    
    // db 연결 초기화
    static {
        this.initDb();
    }
    //Primise<void>를 꼭 지정해야 에러 발생 안함(타입스크립트 컴파일 에러)
    private static async initDb(): Promise<void> {  
        try {
            this.connectionPromise = pool.getConnection();
            console.log('DB connection init success!');
        } catch (err) {
            console.error('DB connection iniit fail: ', err)
            process.exit(1);
        }
    }

    // 쿼리문 실행
    // protected => userDb 클래스 + 상속 클래스에서만 접근가능
    // Promise<any> 아무 타입값 반환 가능
    // connection으로 db연결, execute로 결과 반환
    // finally는 예외 발생과 관계없이 실행
    protected static async query(sql: string, values: any[] = []): Promise<any> {
        const connection = await this.connectionPromise;
        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch (err) {
            console.error('query execution fail: ', err);
            throw err;
        } finally {
            connection.release();
        }
    }
}

export default UserDb;


// mysql db 설정
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path'

const envFile = process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env';
dotenv.config({ path: path.resolve(__dirname, `../../../${envFile}`) });


const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: 3306,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_NAME,
    waitForConnections: true,
};

const pool = mysql.createPool(dbConfig);

export default pool;
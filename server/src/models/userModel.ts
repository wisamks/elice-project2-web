import { pool } from '../config';
import { User } from '../customTypes/express';

class userModel {
    static async findByEmail(email: string) {
        const connection = await pool.getConnection();
        const query = 'SELECT * from user where email = ?';
        const data = [email];
        const [rows] = await connection.query(query, data);
        connection.release();
        return rows;
    }
    static async create({name, email}: User) {
        const connection = await pool.getConnection();
        const query = 'INSERT INTO user (name, email) VALUES (?, ?)';
        const data = [name, email];
        const [rows] = await connection.query(query, data);
        connection.release();
        return rows;
    }
}

export default userModel;
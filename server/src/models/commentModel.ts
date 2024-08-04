import { CreationComment, PaginationComment, UpdateComment, Comment } from "@_/customTypes/commentType";
import PostDb from "@_models/postDb";

class CommentModel extends PostDb {  
    public static async create({postId, content, secret, userId}: CreationComment) {
        const sql = `INSERT INTO comment(post_id, content, secret, user_id) VALUES(?, ?, ?, ?)`;
        const data = [postId, content, secret, userId];
        return await this.insert(sql, data);
    }

    public static async findAllByPostId({postId, page, perPage}: PaginationComment) {
        const sql = `
            SELECT 
                c.id AS commentId,
                c.user_id AS userId,
                c.content,
                c.created_at AS createdAt,
                c.updated_at AS updatedAt,
                c.secret,
                u.nickname,
                u.image
            FROM comment c 
            JOIN user u
                ON u.id = c.user_id
            WHERE c.post_id = ? AND c.deleted_at IS NULL
            ORDER BY c.created_at DESC
            LIMIT ? OFFSET ? 
        `;
        const offset = (page - 1) * perPage;
        const data = [postId, String(perPage), String(offset)];
        return await this.findMany(sql, data);
    }

    

    public static async findAllByUserId(userId: number) {}

    public static async findInPostByUserId(postId: number, userId: number) {}

    public static async findOneById(commentId: number) {
        const sql = `SELECT * FROM comment WHERE id = ? AND deleted_at IS NULL`;
        return await this.findOne(sql, [commentId]);
    }

    public static async findCountByPostId(postId: number) {
        const sql = `SELECT COUNT(id) AS count FROM comment WHERE post_id = ? AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [postId]);
        return result.count;
    }

    public static async findCountByUserId(userId: number) {}

    public static async updateOneById(commentId: number, data: UpdateComment): Promise<Comment | null> {
        const updates = [];
        const values = [];
        if (data.content !== undefined) {
            updates.push('content = ?');
            values.push(data.content);
        }
        if (data.secret !== undefined) {
            updates.push('secret = ?');
            values.push(data.secret);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');

        const sql = `UPDATE comment SET ${updates.join(', ')} WHERE id = ? AND deleted_at IS NULL`;
        values.push(commentId);

        const result = await this.update(sql, values);
        if (result > 0) {
            return this.findOneById(commentId);
        }
        return null;
    }

    public static async deleteByPostId(postId: number) {
        const sql = `UPDATE comment SET deleted_at = CURRENT_TIMESTAMP WHERE post_id = ? AND deleted_at IS NULL`;
        return await this.update(sql, [postId]);
    }

    public static async deleteByUserId(userId: number) {
        const sql = `UPDATE comment SET deleted_at = CURRENT_TIMESTAMP WHERE user_id = ? AND deleted_at IS NULL`;
        return await this.update(sql, [userId]);
    }

    public static async deleteById(commentId: number) {
        const sql = `UPDATE comment SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`;
        return await this.update(sql, [commentId]);
    }
}

export default CommentModel;
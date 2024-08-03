import PostDb from "@_models/postDb";

class FavoriteModel extends PostDb {  
    public static async create(postId: number, userId: number) {
        const sql = `INSERT INTO favorite(post_id, user_id) VALUES(?, ?)`;
        const data = [postId, userId];
        const result = await this.insert(sql, data);
        return result;
    }
    public static async findCountByPostId(postId: number) {
        const sql = `SELECT COUNT(id) AS count FROM favorite WHERE post_id = ? AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [postId]);
        return result.count;
    }

    public static async findOneByUserId(postId: number, userId: number) {
        const sql = `SELECT * FROM favorite WHERE post_id = ? AND user_id = ? AND deleted_at IS NULL`;
        const data = [postId, userId];
        const result = await this.findOne(sql, data);
        return result;
    }

    public static async deleteAllByPostId(postId: number) {
        const sql = `UPDATE favorite SET deleted_at = CURRENT_TIMESTAMP WHERE post_id = ? AND deleted_at IS NULL`;
        const result = await this.update(sql, [postId]);
        return result;
    }
}

export default FavoriteModel;
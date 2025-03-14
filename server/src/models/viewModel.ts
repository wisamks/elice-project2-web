import PostDb from "./postDb";

class ViewModel extends PostDb {
    public static async create(postId: number, userId: number|undefined) {
        const _userId = userId ? userId : 0;
        const sql = `INSERT INTO view(post_id, user_id) VALUES(?, ?)`;
        const result = await this.insert(sql, [postId, _userId]);
        return result;
    }

    public static async getCount(postId: number) {
        const sql = `SELECT COUNT(id) AS count FROM view WHERE post_id = ?`;
        const result = await this.findOne(sql, [postId]);
        return result.count;
    }
}

export default ViewModel;
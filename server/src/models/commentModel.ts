import PostDb from "@_models/postDb";

class CommentModel extends PostDb {  
    public static async create() {}

    public static async findAllByPostId(postId: number) {}

    public static async findAllByUserId(userId: number) {}

    public static async findInPostByUserId(postId: number, userId: number) {}

    public static async findOneById(commentId: number) {}

    public static async findCountByPostId(postId: number) {
        const sql = `SELECT COUNT(id) AS count FROM comment WHERE post_id = ? AND deleted_at IS NULL`;
        const result = await this.findOne(sql, [postId]);
        return result.count;
    }

    public static async findCountByUserId(userId: number) {}

    public static async updateOneById(commentId: number) {}

    public static async deleteByPostId(postId: number) {}

    public static async deleteByUserId(userId: number) {}

    public static async deleteById(commentId: number) {}
}

export default CommentModel;
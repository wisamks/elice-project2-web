import CommentModel from "@_/models/commentModel";
import { CreationComment } from "@_/customTypes/commentType";
import { InternalServerError, NotFoundError } from "@_/utils/customError";
import PostModel from "@_/models/postModel";

class CommentsService {
    static async getCommentsByPostId() {}
    static async createComment(data: CreationComment) {
        const foundPost = await PostModel.findById(data.postId);
        if(!foundPost) {
            throw new NotFoundError('게시글이 존재하지 않습니다.');
        }
        const createdCommentId = await CommentModel.create(data);
        if (!createdCommentId) {
            throw new InternalServerError('댓글 생성에 실패했습니다.');
        }
        return createdCommentId;
    }
    static async updateComment() {}
    static async deleteComment() {}
}

export default CommentsService;
import CommentModel from "@_/models/commentModel";
import { CreationComment, PaginationComment } from "@_/customTypes/commentType";
import { ForbiddenError, InternalServerError, NotFoundError } from "@_/utils/customError";
import PostModel from "@_/models/postModel";

class CommentsService {
    static async getCommentsByPostId(data: PaginationComment) {
        const foundPost = await PostModel.findById(data.postId);
        if (!foundPost) {
            throw new NotFoundError('게시글이 존재하지 않습니다.');
        }
        const foundComments = await CommentModel.findAllByPostId(data);
        const commentsCount = await CommentModel.findCountByPostId(data.postId);
        return {foundComments, commentsCount};
    }
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
    static async deleteComment(commentId: number, userId: number) {
        const foundComment = await CommentModel.findOneById(commentId);
        if (!foundComment) {
            throw new NotFoundError('댓글이 존재하지 않습니다.');
        }
        if (foundComment.user_id !== userId) {
            throw new ForbiddenError('잘못된 접근입니다.');
        }
        await CommentModel.deleteById(commentId);
        return;
    }
}

export default CommentsService;
import CommentModel from "@_/models/commentModel";
import { CreationComment, PaginationComment, UpdateComment, Comment } from "@_/customTypes/commentType";
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
        const comments = foundComments.map(comment => ({
            commentId: comment.commentId,
            userId: comment.userId,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            secret: !!comment.secret,
            nickname: comment.nickname,
            image: comment.image,
        }));
        return {comments, commentsCount};
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

    static async updateComment(commentId: number, userId: number, updateData: UpdateComment): Promise<Comment | null> {
        const comment = await CommentModel.findOneById(commentId);
        if (!comment) {
            throw new NotFoundError('댓글을 찾을 수 없습니다.');
        }
        if (comment.user_id !== userId) {
            throw new ForbiddenError('댓글을 수정할 권한이 없습니다.');
        }
        
        const updatedComment = await CommentModel.updateOneById(commentId, updateData);
        if (!updatedComment) {
            throw new InternalServerError('댓글 수정에 실패했습니다.');
        }
        
        return updatedComment;
    }

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
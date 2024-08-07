import { ReqUser } from '@_/customTypes/express';
import CommentsService from '@_/services/commentsService';
import { Request, Response, NextFunction } from 'express';
import { PaginationComment, UpdateComment } from '@_/customTypes/commentType';
import CommentGetDTO from '@_/middlewares/DTOs/commentGetDTO';
import CommentPostDTO from '@_/middlewares/DTOs/commentPostDTO';
import CommentPutDTO from '@_/middlewares/DTOs/commentPutDTO';
import CommentDeleteDTO from '@_/middlewares/DTOs/commentDeleteDTO';

class CommentsController {
    // 게시글에서 댓글 조회
    static async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
        const data: CommentGetDTO = req.body;
        try {
            const {comments, commentsCount} = await CommentsService.getCommentsByPostId(data);
            return res.status(200).json({
                commentsCount, 
                comments,
            });
        } catch(err) {
            return next(err);
        }
    }
    // 댓글 생성
    static async createComment(req: Request, res: Response, next: NextFunction) {
        const data: CommentPostDTO = req.body;
        try {
            const createdCommentId = await CommentsService.createComment(data);
            return res.status(201).json({
                commentId: createdCommentId
            });
        } catch(err) {
            return next(err);
        }
    }

    // 댓글 수정
    static async updateComment(req: Request, res: Response, next: NextFunction) {
        const data: CommentPutDTO = req.body;
        try {
            const updatedComment = await CommentsService.updateComment(data);
            // return res.status(200).json(updatedComment);
            return res.status(204).end();
        } catch (err) {
            return next(err);
        }
    }

    // 댓글 삭제
    static async deleteComment(req: Request, res: Response, next: NextFunction) {
        // 있는지 확인하고 404, 유저 아이디 다르면 403, 그 다음 삭제
        const { commentId, userId }: CommentDeleteDTO = req.body;
        try {
            await CommentsService.deleteComment(Number(commentId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default CommentsController;
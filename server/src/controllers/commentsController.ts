import { ReqUser } from '@_/customTypes/express';
import CommentsService from '@_/services/commentsService';
import { BadRequestError } from '@_/utils/customError';
import { Request, Response, NextFunction } from 'express';
import { PaginationComment, UpdateComment } from '@_/customTypes/commentType';

class CommentsController {
    // 게시글에서 댓글 조회
    static async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
        const {postId, page, perPage} = req.query;
        const data = {
            postId: Number(postId),
            page: page ? Number(page) : 1,
            perPage: perPage ? Number(perPage) : 10,
        };
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
        const {postId, content, secret} = req.body;
        const user = req.user as ReqUser;
        const userId = user.userId;
        const data = {
            postId: Number(postId),
            content,
            secret,
            userId,
        };
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
        const { commentId } = req.params;
        const { content, secret } = req.body;
        const user = req.user as ReqUser;
        const userId = user.userId;

        const updateData: UpdateComment = {};
        if (content !== undefined) updateData.content = content;
        if (secret !== undefined) updateData.secret = secret === 'true';

        try {
            const updatedComment = await CommentsService.updateComment(Number(commentId), userId, updateData);
            // return res.status(200).json(updatedComment);
            return res.status(204).end();
        } catch (err) {
            return next(err);
        }
    }

    // 댓글 삭제
    static async deleteComment(req: Request, res: Response, next: NextFunction) {
        // 있는지 확인하고 404, 유저 아이디 다르면 403, 그 다음 삭제
        const { commentId } = req.params;
        const user = req.user as ReqUser;
        const userId = user.userId;
        try {
            await CommentsService.deleteComment(Number(commentId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default CommentsController;
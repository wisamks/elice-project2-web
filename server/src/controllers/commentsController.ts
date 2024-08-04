import { Request, Response, NextFunction } from 'express';

class CommentsController {
    // 게시글에서 댓글 조회
    static async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {

    }
    // 댓글 생성
    static async createComment(req: Request, res: Response, next: NextFunction) {

    }
    // 댓글 수정
    static async updateComment(req: Request, res: Response, next: NextFunction) {

    }
    // 댓글 삭제
    static async deleteComment(req: Request, res: Response, next: NextFunction) {

    }
}

export default CommentsController;
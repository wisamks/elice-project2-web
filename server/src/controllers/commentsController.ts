import { Request, Response, NextFunction } from 'express';

class CommentsController {
    // 게시글에서 댓글 조회
    static async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
        // 페이지네이션 적용, 유저 테이블 조인
        // 전체 댓글 개수 이미 있긴 한데... 혹시 모르니...
    }
    // 댓글 생성
    static async createComment(req: Request, res: Response, next: NextFunction) {
        // 그냥 생성
    }
    // 댓글 수정
    static async updateComment(req: Request, res: Response, next: NextFunction) {
        // 있는지 확인하고 404, 유저 아이디 다르면 403, 그 다음 수정
    }
    // 댓글 삭제
    static async deleteComment(req: Request, res: Response, next: NextFunction) {
        // 있는지 확인하고 404, 유저 아이디 다르면 403, 그 다음 삭제
    }
}

export default CommentsController;
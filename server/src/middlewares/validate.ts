import { Request, Response, NextFunction } from 'express';
import { nicknameSchema } from '@_middlewares/schemas/nicknameSchema';
import { postSchema } from '@_middlewares/schemas/postSchema';
import { createCommentSchema, updateCommentSchema } from '@_middlewares/schemas/commentSchema';
import { toggleFavoriteSchema } from './schemas/favoriteSchema';
// import { findExistNickname } from '@_models/userModel';

// 닉네임 유효성 검사
export async function validateNickname(req: Request, res: Response, next: NextFunction) {
    const { error } = nicknameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

// 닉네임 중복 검사
// const nicknameExists = await findExistNickname(req.body.nickname);
// if (nicknameExists) {
//     return res.status(409).json({ message: '해당 닉네임은 이미 존재합니다.' });
// }

    next();
}

// 게시글 유효성 검사
export function validatePost(req: Request, res: Response, next: NextFunction) {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ messages: errorMessages });
    }
    next();
}

// 댓글 생성 유효성 검사
export function validateCreateComment(req: Request, res: Response, next: NextFunction) {
    const { error } = createCommentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

// 댓글 수정 유효성 검사
export function validateUpdateComment(req: Request, res: Response, next: NextFunction) {
    const { error } = updateCommentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();

}

// "좋아요" 토글 요청의 유효성을 검사하는 미들웨어
export const validateToggleFavorite = (req: Request, res: Response, next: NextFunction) => {
    const { error } = toggleFavoriteSchema.validate(req.body);
    if (error) {
        // 오류 메시지들을 배열로 수집하고, 이를 클라이언트에 반환
        return res.status(400).json({
            status: 'error',
            message: error.details.map(detail => detail.message).join(', ')
        });
    }
    next(); // 유효성 검사를 통과한 경우 다음 미들웨어로 진행
};

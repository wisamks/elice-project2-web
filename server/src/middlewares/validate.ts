import { Request, Response, NextFunction } from 'express';
import { nicknameSchema } from '@_middlewares/schemas/nicknameSchema';
import { postSchema } from '@_middlewares/schemas/postSchema';
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

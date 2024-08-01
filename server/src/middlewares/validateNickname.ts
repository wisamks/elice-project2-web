import { Request, Response, NextFunction } from 'express';
import { nicknameSchema } from '../schemas/nicknameSchema';
// import { findExistNickname } from '../models/userModel';

export async function validateNickname(req: Request, res: Response, next: NextFunction) {
    // Joi 스키마 유효성 검사
    const { error } = nicknameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // 닉네임 중복 검사
    // const nicknameExists = await findExistNickname(req.body.nickname);
    // if (nicknameExists) {
    //     return res.status(409).json({ message: 'Nickname already exists' });
    // }

    next();
} 

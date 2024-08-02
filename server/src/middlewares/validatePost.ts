import { Request, Response, NextFunction } from 'express';
import { postSchema } from '../schemas/postSchema';

export function validatePost(req: Request, res: Response, next: NextFunction) {
    const { error } = postSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ messages: errorMessages });
    }

    next();
}



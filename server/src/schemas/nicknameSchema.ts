import Joi from 'joi';

export const nicknameSchema = Joi.object({
    nickname: Joi.string().min(1).max(40).required()
});

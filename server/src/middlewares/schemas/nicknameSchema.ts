// DTO로 이사갔습니다.

// // import Joi from 'joi';

// // export const nicknameSchema = Joi.object({
// //     nickname: Joi.string().min(1).max(40).required()
// // });


// import Joi from 'joi';

// export const nicknameSchema = Joi.object({
//     nickname: Joi.string()
//         .min(3).messages({
//             'string.min': '닉네임은 최소 3글자 이상이어야 합니다.'
//         })
//         .max(10).messages({
//             'string.max': '닉네임은 최대 10글자까지 가능합니다.'
//         })
//         .required().messages({
//             'string.base': '닉네임은 문자열이어야 합니다.',
//             'any.required': '닉네임은 필수 입력 항목입니다.'
//         })
// });

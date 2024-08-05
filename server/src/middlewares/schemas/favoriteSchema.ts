import Joi from 'joi';

// "좋아요" 토글 요청의 유효성을 검사하기 위한 스키마
export const toggleFavoriteSchema = Joi.object({
    postId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': '게시물 ID는 숫자여야 합니다.',
            'number.integer': '게시물 ID는 정수여야 합니다.',
            'number.positive': '게시물 ID는 양의 정수여야 합니다.',
            'any.required': '게시물 ID는 필수 입력 항목입니다.'
        })
});

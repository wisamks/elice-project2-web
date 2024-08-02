import Joi from 'joi';

export const postSchema = Joi.object({
    saleType: Joi.string()
        .valid('판매', '나눔')
        .required().messages({
            'any.required': '판매 타입을 선택해야 합니다.',
            'any.only': '"판매" 또는 "나눔" 중 하나여야 합니다.'
        }),
    target: Joi.string()
        .valid('남성', '여성', '아동')
        .required().messages({
            'any.required': '대상을 선택해야 합니다.',
            'any.only': '대상은 "남성", "여성", "아동" 중 하나여야 합니다.'
        }),
        item: Joi.string()
        .valid('상의', '하의', '원피스', '셋업', '아우터')
        .required().messages({
            'any.required': '아이템을 선택해야 합니다.'
        }),
    location: Joi.string()
        .valid('강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
               '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
               '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구')
        .required().messages({
            'any.required': '거래위치를 선택해야 합니다.'
        }),
    title: Joi.string()
        .max(50).message('제목은 최대 50글자까지 가능합니다.')
        .required().messages({
            'any.required': '제목을 입력해야 합니다.'
        }),
    content: Joi.string()
        .required().messages({
            'any.required': '내용을 입력해야 합니다.'
        }),
    price: Joi.number()
        .integer().allow(null).messages({
            'number.integer': '가격은 정수여야 합니다.'
        }),
    images: Joi.array()
        .items(Joi.string().uri().message('이미지는 유효한 URL이어야 합니다.'))
        .max(5).message('최대 5개의 이미지만 업로드할 수 있습니다.'),
 
});

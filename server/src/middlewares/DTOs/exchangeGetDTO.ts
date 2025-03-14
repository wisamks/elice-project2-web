import { PostSort, Status } from "@_/customTypes/postType";
import PostGetDTO from "./postGetDTO";
import { IsIn, IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

class ExchangeGetDTO extends PostGetDTO {
    @IsOptional()
    @IsIn(['판매','나눔'], { message: `sort는 '판매', '나눔' 중 하나입니다.`})
    sort? : PostSort|undefined

    @IsOptional()
    @IsIn(['남성','여성','아동'], { message: `target은 '남성','여성','아동' 중 하나입니다.`})
    target? : string|undefined

    @IsOptional()
    @IsIn(['상의','하의','원피스','셋업','아우터'], { message: `item은 '상의','하의','원피스','셋업','아우터' 중 하나입니다.`})
    item? : string|undefined

    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: `price는 정수입니다.`})
    price? : number|undefined

    @IsOptional()
    @IsIn(['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
               '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
               '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
            ], 
            { message: `location은 '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
               '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
               '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구' 중 하나입니다.`})
    location? : string|undefined

    @IsOptional()
    @IsIn(['예약','진행','완료'], { message: `status는 '예약','진행','완료' 중 하나입니다.` })
    status? : Status|undefined

    postId: number|undefined = undefined
}

export default ExchangeGetDTO;
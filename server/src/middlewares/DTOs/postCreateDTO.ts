import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from "class-validator";
import AuthUserDTO from "./authUserDTO";

class PostCreateDTO extends AuthUserDTO {
    @Type(() => Number)
    @IsNotEmpty({ message: 'categoryId는 필수값입니다.' })
    @IsInt({ message: 'categoryId는 정수입니다.' })
    @IsPositive({ message: 'categoryId는 양수입니다.' })
    categoryId: number;

    @IsOptional()
    @IsString({ message: 'title은 문자열입니다.' })
    @MaxLength(50, { message: 'title은 최대 50글자입니다.' })
    title: string;
    
    @IsNotEmpty({ message: 'content는 필수값입니다.' })
    @IsString({ message: 'content는 문자열입니다.' })
    @MinLength(1, { message: 'content는 최소 1글자입니다.'})
    content: string;
    
    @Transform(({value}) => value.map((image:string) => image === '' ? undefined : image))
    @IsOptional()
    @IsArray({ message: 'images는 배열입니다.' })
    images: Array<string>;
}

export default PostCreateDTO;
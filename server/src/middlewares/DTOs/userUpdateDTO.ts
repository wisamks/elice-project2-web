import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import AuthUserDTO from "./authUserDTO";
import { Transform } from "class-transformer";

class UserUpdateDTO extends AuthUserDTO {
    @IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' })
    @IsString({ message: '닉네임은 문자열이어야 합니다.' })
    @MinLength(3, { message: '닉네임은 최소 3글자 이상이어야 합니다.' })
    @MaxLength(10, { message: '닉네임은 최대 10글자까지 가능합니다.' })
    nickname: string;

    @Transform(({value}) => value === '' ? undefined : value)
    @IsOptional()
    @IsString({ message: 'image는 문자열이어야 합니다.' })
    image: string
}

export default UserUpdateDTO;
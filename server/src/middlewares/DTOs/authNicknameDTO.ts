import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

class AuthNicknameDTO {
    @IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' })
    @IsString({ message: '닉네임은 문자열이어야 합니다.' })
    @MinLength(3, { message: '닉네임은 최소 3글자 이상이어야 합니다.' })
    @MaxLength(10, { message: '닉네임은 최대 10글자까지 가능합니다.' })
    nickname: string;
}

export default AuthNicknameDTO;
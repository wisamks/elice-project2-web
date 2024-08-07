import { SnsCode } from '@_/customTypes/userType';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

class AuthLoginDTO {
    @IsNotEmpty({ message: '인증 코드는 필수값입니다.'})
    @IsString({ message: '인증 코드는 문자열입니다.'})
    code: string;

    @IsIn(['google', 'naver'], { message: `sns코드는 'google'또는 'naver'입니다.`})
    sns_code: SnsCode;
}

export default AuthLoginDTO;
import { Transform } from "class-transformer";
import AuthUserDTO from "./authUserDTO";
import { IsNotEmpty, IsInt, IsBoolean, IsString, MinLength, MaxLength, IsPositive } from "class-validator";

class CommentPutDTO extends AuthUserDTO {
    @Transform(({value}) => typeof(value) === 'string' ? parseInt(value, 10) : value)
    @IsNotEmpty({ message: 'commentId는 필수값입니다.' })
    @IsInt({ message: 'commentId값은 정수입니다.' })
    @IsPositive({ message: 'commentId는 양수입니다.' })
    commentId: number
    
    @IsNotEmpty({ message: 'content는 필수값입니다.'})
    @IsString({ message: 'content는 string입니다.'})
    @MinLength(1, { message: 'content는 1글자 이상입니다.'})
    @MaxLength(300, { message: 'content는 300글자 이하입니다.'})
    content: string
    
    @Transform(({value}) => !value ? false : value)
    @IsBoolean({ message: 'secret은 boolean입니다.'})
    secret: boolean
}

export default CommentPutDTO;
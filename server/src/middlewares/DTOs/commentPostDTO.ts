import { Transform } from "class-transformer";
import AuthUserDTO from "./authUserDTO";
import { IsNotEmpty, IsInt, Min, IsBoolean, IsString, MinLength, MaxLength, IsPositive } from "class-validator";

class CommentPostDTO extends AuthUserDTO {
    @Transform(({value}) => typeof(value) === 'string' ? parseInt(value, 10) : value)
    @IsNotEmpty({ message: 'postId는 필수값입니다.' })
    @IsInt({ message: 'postId값은 정수입니다.' })
    @IsPositive({ message: 'postId는 양수입니다.' })
    postId: number
    
    @IsNotEmpty({ message: 'content는 필수값입니다.'})
    @IsString({ message: 'content는 string입니다.'})
    @MinLength(1, { message: 'content는 1글자 이상입니다.'})
    @MaxLength(300, { message: 'content는 300글자 이하입니다.'})
    content: string
    
    @Transform(({value}) => !value ? false : value)
    @IsBoolean({ message: 'secret은 boolean입니다.'})
    secret: boolean
}

export default CommentPostDTO;
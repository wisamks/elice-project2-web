import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, Min, IsPositive } from 'class-validator';
import AuthUserDTO from './authUserDTO';

class CommentDeleteDTO extends AuthUserDTO {
    @Transform(({value}) => typeof(value) === 'string' ? parseInt(value, 10) : value)
    @IsNotEmpty({ message: 'commentId는 필수값입니다.' })
    @IsInt({ message: 'commentId값은 정수입니다.' })
    @IsPositive({ message: 'commentId는 양수입니다.' })
    commentId: number
}

export default CommentDeleteDTO;
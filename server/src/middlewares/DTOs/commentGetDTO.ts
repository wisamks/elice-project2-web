import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

class CommentGetDTO {
    @Transform(({value}) => typeof(value) === 'string' ? parseInt(value, 10) : value)
    @IsNotEmpty({ message: 'postId는 필수값입니다.' })
    @IsInt({ message: 'postId값은 정수입니다.' })
    @IsPositive({ message: 'postId는 양수입니다.' })
    postId: number 

    @Transform(({value}) => {
        let output;
        if (!value) {
            output = 1;
        } else if (typeof(value) === 'string') {
            output = parseInt(value, 10);
        } else {
            output = value;
        }
        return output;
    })
    @IsPositive({ message: 'page값은 1 이상입니다.'})
    @IsInt({ message: 'page값은 정수입니다.' })
    page: number

    @Transform(({value}) => {
        let output;
        if (typeof(value) === 'string') {
            output = parseInt(value, 10);
        } else if (!value) {
            output = 10;
        } else {
            output = value;
        }
        return output;
    })
    @IsPositive({ message: 'perPage값은 1 이상입니다.'})
    @IsInt({ message: 'perPage값은 정수입니다.' })
    perPage: number
}

export default CommentGetDTO;
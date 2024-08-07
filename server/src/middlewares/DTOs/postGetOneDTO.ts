import { Type } from "class-transformer";
import AuthUserDTO from "./authUserDTO";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

class PostGetOneDTO extends AuthUserDTO {
    @Type(() => Number)
    @IsNotEmpty({ message: 'postId는 필수값입니다.' })
    @IsInt({ message: 'postId값은 정수입니다.' })
    @IsPositive({ message: 'postId는 양수입니다.' })
    postId: number;
}

export default PostGetOneDTO;
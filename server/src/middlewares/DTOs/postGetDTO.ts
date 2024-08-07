import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import AuthUserDTO from "./authUserDTO";

class PostGetDTO extends AuthUserDTO {
    @Type(() => Number)
    @IsNotEmpty({ message: 'categoryId는 필수값입니다.' })
    @IsInt({ message: 'categoryId는 정수입니다.' })
    @IsPositive({ message: 'categoryId는 양수입니다.' })
    categoryId: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'page는 필수값입니다.' })
    @IsInt({ message: 'page는 정수입니다.' })
    @IsPositive({ message: 'page는 양수입니다.' })
    page: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'perPage는 필수값입니다.' })
    @IsInt({ message: 'perPage는 정수입니다.' })
    @IsPositive({ message: 'perPage는 양수입니다.' })
    perPage: number;
}

export default PostGetDTO;
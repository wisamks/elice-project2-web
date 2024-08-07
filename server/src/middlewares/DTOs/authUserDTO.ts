import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

class AuthUserDTO {
    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: 'userId는 정수입니다.' })
    @IsPositive({ message: 'userId는 양수입니다.' })
    userId: number;
}

export default AuthUserDTO;
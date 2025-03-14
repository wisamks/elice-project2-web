import { Transform, Type } from "class-transformer";
import AuthUserDTO from "./authUserDTO";
import { IsInt, IsOptional, IsPositive } from "class-validator";

class HomeGetDTO extends AuthUserDTO {
    @Transform(({value}) => !value ? 4 : value)
    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: 'exchangeLimit는 정수입니다.'})
    @IsPositive({ message: 'exchangeLimit는 양수입니다.'})
    exchangeLimit: number 

    @Transform(({value}) => !value ? 4 : value)
    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: 'binLimit는 정수입니다.'})
    @IsPositive({ message: 'binLimit는 양수입니다.'})
    binLimit: number
    
    @Transform(({value}) => !value ? 12 : value)
    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: 'reformLimit는 정수입니다.'})
    @IsPositive({ message: 'reformLimit는 양수입니다.'})
    reformLimit: number
}

export default HomeGetDTO;
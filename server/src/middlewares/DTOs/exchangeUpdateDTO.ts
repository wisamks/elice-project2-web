import { Type } from "class-transformer";
import ExchangeCreateDTO from "./exchangeCreateDTO";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

class ExchangeUpdateDTO extends ExchangeCreateDTO {
    @Type(() => Number)
    @IsNotEmpty({ message: `postId는 필수값입니다.`})
    @IsInt({ message: `postId는 정수입니다.`})
    @IsPositive({ message: `postId는 양수입니다.`})
    postId: number
}

export default ExchangeUpdateDTO;
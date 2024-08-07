import { Status } from "@_/customTypes/postType";
import PostGetOneDTO from "./postGetOneDTO";
import { IsIn, IsNotEmpty } from "class-validator";

class ExchangeStatusDTO extends PostGetOneDTO {
    @IsNotEmpty({ message: `status는 필수값입니다.`})
    @IsIn(['예약','진행','완료'], { message: `status값은 '예약','진행','완료' 중 하나입니다.` })
    status: Status
}

export default ExchangeStatusDTO;
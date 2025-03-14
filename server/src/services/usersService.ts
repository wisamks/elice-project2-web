import UserUpdateDTO from "@_/middlewares/DTOs/userUpdateDTO";
import UserModel from "@_/models/userModel";
import { NotFoundError } from "@_/utils/customError";

class UsersService {
    static async getProfile(userId: number) {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            throw new NotFoundError('너 도대체 누구야...? 끼야아아ㅏㅏㅏㅏ악');
        }
        return {
            id: foundUser.id,
            nickname: foundUser.nickname,
            email: foundUser.email,
            name: foundUser.name,
            image: foundUser.image,
        }
    }
    static async updateProfile(data: UserUpdateDTO) {
        await UserModel.updateUser(data);
        return;
    }
}

export default UsersService;
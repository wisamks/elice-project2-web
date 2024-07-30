import { Request, Response, NextFunction } from 'express';
import { setAccessToken } from '@_utils';
import authService from '@_services/authService';
import UserModel from '@_models/userModel';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code, sns_code } = req.body;
        const user: any = await authService.loginService(code, sns_code);
        
        // 미작성: user 정보를 활용해서 db에서 유저를 찾기. 아마도 sns_code와 email 조합이 가능할 듯.
        // const foundUser = await UserModel.findByOauth(user.email, sns_code);

        // 미작성: 유저를 못 찾았다면 회원가입 시키기
        // if (!foundUser) {
        //     return res.status(200).json({ user })
        // }

        // 미작성: 유저 id를 가져와서 토큰을 만들 때 집어 넣기
        // 이후 패스포트에서 뜯어서 id를 req.user에 넣게 만들고 그 때부터 로그인한 유저는 해당 아이디로 조회하여 확인
        const accessToken = setAccessToken(res, user);
        return res.status(200).json({ accessToken });
    } catch (err) {
        return next(err);
    }
}

export {
    loginController,
};
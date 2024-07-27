import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {
        name: '',
        nickname: '',
        email: '',
        phone: '',
        profile: '',
        isAuthenticated: false,
        platform: '',
    },
});

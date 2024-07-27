import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {
        name: '',
        nickname: '',
        email: '',
        phone: '',
        isAuthenticated: false,
        platform: '',
    },
});
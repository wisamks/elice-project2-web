import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        name: '',
        id: '',
        nickname: '',
        image: '',
    },
});

export const loginState = atom({
    key: 'loginState',
    default: false,
});
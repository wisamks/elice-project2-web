import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        name: '',
        id: '',
        nickname: '',
        profileImage: '',
    },
});
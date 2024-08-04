import { atom } from 'recoil';

export const postState = atom({
    key: 'postState',
    default:{
        status: '판매진행',
        item: '상의',
        location: '강남구',
        title: '',
        price: '',
        mainImage: '',
    }
});
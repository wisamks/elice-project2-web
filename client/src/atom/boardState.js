import { atom } from 'recoil';

export const postStatusState = atom({
    key: 'postStatusState',
    default: '판매진행',
});

export const itemTypeState = atom({
    key: 'itemTypeState',
    default: '',
});

export const locationTypeState = atom({
    key: 'locationTypeState',
    default: '',
});

export const titleState = atom({
    key: 'titleState',
    default: '',
});

export const priceState = atom({
    key: 'priceState',
    default: '',
});

export const mainImagesState = atom({
    key: 'mainImagesState',
    default: '',
});
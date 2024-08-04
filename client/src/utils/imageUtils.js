// 이미지 업로드
export const setImgSrc = (images, index, imgSrc, file) => {
    return images.map((img, idx) => {
        if (idx === index) {
            return {
                imgSrc,
                file,
                isDefault: false
            };
        }
        return img;
    });
};

// 이미지 삭제 
export const resetImgSrc = (images, index) => {
    return images.map((img, idx) => {
        if (idx === index) {
            return {
                imgSrc: '../images/ico-camera.png',
                file: null,
                isDefault: true
            };
        }
        return img;
    });
};

import { apiService } from "../services/apiService";
import { imageUploadController } from "../controllers/imageUploadController";

// 이미지 업로드
export const setImgSrc = async (images, index, imgSrc, file) => {
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('images', file);

        const response = await  apiService(imageUploadController, formData);
        console.log('response', response);

        return response.urls;
    };

    const imageUrls = await uploadImage(file);

    if (imageUrls && imageUrls.length > 0) {
        return images.map((img, idx) => {
            if (idx === index) {
                return {
                    imgSrc: imageUrls[0],
                    file,
                    isDefault: false
                };
            }
            return img;
        });
    } else {
        return images;
    }
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

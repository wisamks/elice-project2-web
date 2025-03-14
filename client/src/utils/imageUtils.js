import { apiService } from "../services/apiService";
import { imageUploadController } from "../controllers/imageUploadController";

// 이미지 업로드
export const setImgSrc = async (images, index, imgSrc, file) => {
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
                imgSrc: '/images/ico-camera.png',
                file: null,
                isDefault: true
            };
        }
        return img;
    });
};

export const uploadImages = async (images) => {
    const uploadPromises = images.map(async (image) => {
        if (image.file) {
            const formData = new FormData();
            formData.append('images', image.file);

            const response = await apiService(imageUploadController, formData);
            console.log('response', response);

            return response.urls[0];
        }
        return null;
    });

    return Promise.all(uploadPromises);
};
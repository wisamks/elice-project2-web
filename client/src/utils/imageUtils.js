

// 이미지 업로드
export const setImgSrc = async (images, index, imgSrc, file) => {
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try{
            const response = await axios.post('http://localhost:8080/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            return response.data.urls;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
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

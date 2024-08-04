import imageCompression from "browser-image-compression";
import './InputImageFile.css'

const InputImageFile = ({ imgSrc, setImgSrc, isDefault, setIsDefault }) => {
    const handleChangeImg = async (e) => {
        const file = e.target.files[0];
        const validFileTypes = ['image/jpeg', 'image/png'];    

        if (file && validFileTypes.includes(file.type)) {
            try {    
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                }
                const compressionFiles = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onload = () => {
                    setImgSrc(reader.result, compressionFiles);
                }
                reader.readAsDataURL(compressionFiles);
            } catch (error) {
                console.error('Error compressing the image', error);
                alert('이미지 압축 중 오류가 발생했습니다.');
            }
        } else {
            alert('올바른 형식의 파일을 선택해주세요. (jpg, png)');
        }
    };

    const handleDeleteImg = (e) => {
        setIsDefault();
    };

    return (
        <div className="input-image-file">
            <p className={`img-view ${isDefault ? 'default imgFrame' : 'imgFrame'}`}>
                <img
                    src={imgSrc}
                    alt=""
                />
            </p>
            <p className="img-file">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImg}
                />
            </p>
            <p
                className={`img-file-close ${isDefault ? 'hide' : 'show'}`}
                onClick={handleDeleteImg}
            >
                <img src="../images/ico-close-bk.png" alt="등록된 이미지 삭제하기" />
            </p>
        </div>
    );
};

export default InputImageFile;

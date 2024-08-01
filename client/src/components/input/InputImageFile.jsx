import { useState } from "react";
import './InputImageFile.css'

const InputImageFile = ({ imgSrc, setImgSrc, isDefault, setIsDefault }) => {
    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        if(file){
            const render = new FileReader();
            render.onload = (event) => {
                setImgSrc(event.target.result);
            };
            render.readAsDataURL(file);
        }
    };

    const handleDeleteImg = (e) => {
        setIsDefault();
    };

    return (
        <div className="input-image-file">
            <p className={`img-view ${isDefault ? 'default' : ''}`}>
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
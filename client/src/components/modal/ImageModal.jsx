import { useEffect, useState } from 'react';
import './ImageModal.css';

const ImageModal = ({ photos, selectedPhoto, closeModal }) => {
    const [mainPhoto, setMainPhoto] = useState(selectedPhoto?.url || '');

    useEffect(() => {
        if(selectedPhoto){
            setMainPhoto(selectedPhoto.url);
        }
    }, [selectedPhoto]);

    const handleClickThumb = (photo) => () => {
        setMainPhoto(photo.url);
    };

    
    // const handleClickClose = (e) => () => {
    //     e.stopPropagation();
    //     closeModal();
    // };

    // const handleClickModalWrap = (e) => () => {
    //     e.stopPropagation();
    // };

    return(
        <div className="ImageModal">
            <div className="modal-wrap">
                <div className="modal-thumbs-img">
                    <ul>
                        {photos.map((photo, idx) => (
                            <li key={idx} className='imgFrame'>
                                <img src={photo.url} alt='' onClick={handleClickThumb(photo)} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-main-img imgFrame">
                    <img src={mainPhoto} alt='' />
                </div>
            </div>
            <div className="modal-black" onClick={closeModal}>
                <p className="modal-close"><img src="/images/clear-icon.png" alt="모달창 닫기" /></p>
            </div>            
        </div>
    );
};

export default ImageModal;
import { useRef } from 'react';
import './ViewPhoto.css';

const ViewPhoto = ({ photos, onPhotoClick }) => {
    const defaultPhoto = {
        url: '/images/ico-hanger.png'
    };

    const errorRefs = useRef([]);

    const filledPhotos = [...photos];

    while (filledPhotos.length < 3) {
        filledPhotos.push(defaultPhoto);
    };

    const handleImgError = (index, e) => {
        e.target.src = defaultPhoto.url;
        errorRefs.current[index] = true;
        e.target.closest('li').classList.add('default-photo');
    };

    return (
        <div className="view-post-photos">
            <ul>
                {filledPhotos.map((photo, idx) => (
                    <li
                        key={idx}
                        className={photo.url === defaultPhoto.url || errorRefs.current[idx] ? 'default-photo imgFrame' : 'imgFrame'}
                        onClick={photo.url !== defaultPhoto.url ? () => onPhotoClick(photo) : undefined}
                    >
                        <img
                            src={photo.url}
                            alt=''
                            onError={(e) => handleImgError(idx, e)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewPhoto;
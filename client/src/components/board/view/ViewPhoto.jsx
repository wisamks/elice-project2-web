import './ViewPhoto.css';

const ViewPhoto = ({photos}) => {
    const defaultPhoto = '../images/ico-hanger.png';
    const filledPhotos = [...photos];

    while (filledPhotos.length < 3){
        filledPhotos.push(defaultPhoto);
    }

    return(
        <div className="view-post-photos">
            <ul>
                {filledPhotos.map((photo, idx) => (
                    <li key={idx} className={photo === defaultPhoto ? 'default-photo' : ''}>
                        <img src={photo} alt='' />
                    </li>
                ))};
            </ul>
        </div>
    );
};

export default ViewPhoto;
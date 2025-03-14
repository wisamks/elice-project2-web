import { Link } from "react-router-dom";

import './ItemCardVertical205.css';

const ItemCardVertical205 = ({
    linkURL, 
    itemPhotoSrc, 
    itemName,
}) => {
    return (
        <div className="ItemCardVertical205">
            <Link to={linkURL}>
                <p className="item-photo imgFrame"><img src={itemPhotoSrc} alt={itemName} /></p>
                <p className="item-name">{itemName}</p>
            </Link>
        </div>
    );
};

export default ItemCardVertical205;
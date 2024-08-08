import { Link } from "react-router-dom";

import './ItemCardHorizontal.css';

const ItemCardHorizontal = ({
    linkURL, 
    itemPhotoSrc, 
    itemStatus, 
    itemStatusTxt, 
    itemName,
    userProfileSrc,
    userName,
    saleLocation,
    itemUpdate
}) => {
    return (
        <div className="ItemCardHorizontal">
            <Link to={linkURL}>
                <p className="item-photo imgFrame"><img src={itemPhotoSrc.url} alt={itemName} /></p>
                <div className="item-sale-info">
                    <div className="item-info">
                        <p className={`item-status ${itemStatus}`}>{itemStatusTxt}</p>
                        <p className="item-name">{itemName}</p>
                    </div>
                    <div>
                        <div className="user-info">
                            <p className="user-profile imgFrame"><img src={userProfileSrc} alt={userName} /></p>
                            <p className="user-name">{userName}</p>
                        </div>
                        <div className="item-location-date">
                            <p className="sale-location dot">{saleLocation}</p>
                            <p className="item-update">{itemUpdate}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemCardHorizontal;

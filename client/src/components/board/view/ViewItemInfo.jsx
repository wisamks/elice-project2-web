import { formatNumberToCommaString, formatDateToString } from '../../../utils';

import './ViewItemInfo.css';

const ViewItemInfo = ({ 
    sort, 
    status, 
    item, 
    title, 
    price, 
    userImage, 
    nickname, 
    location, 
    createdAt 
}) => {
    const getStatusClass = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return 'item-status item-status-free-ing';
            if (status === '예약') return 'item-status item-status-free-rsv';
            if (status === '마감') return 'item-status item-status-free-end';
        } else if (sort === '판매') {
            if (status === '진행') return 'item-status item-status-sale-ing';
            if (status === '예약') return 'item-status item-status-sale-rsv';
            if (status === '마감') return 'item-status item-status-sale-end';
        }
        return 'item-status';
    };

    const getStatusText = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return '나눔진행';
            if (status === '예약') return '나눔예약';
            if (status === '마감') return '나눔마감';
        } else if (sort === '판매') {
            if (status === '진행') return '판매진행';
            if (status === '예약') return '판매예약';
            if (status === '마감') return '판매마감';
        }
        return '';
    };

    const setStatusClass = getStatusClass(sort, status);
    const setStatusText = getStatusText(sort, status);

    return (
        <div className="view-post-item-info">
            <div className="row1">
                <div className="item-info">
                    <div className="item-status-cate">
                        <p className={setStatusClass}>{setStatusText}</p>
                        <p className="item-cate">{item}</p>
                    </div>
                    <p className="item-name">{title}</p>
                </div>
                <div className="item-price"><span className="number">{formatNumberToCommaString(price)}</span>원</div>
            </div>
            <div className="row2">
                <div className="user-info">
                    <p className="user-profile"><img src={`"../images/profile/${userImage}"`} alt={nickname} /></p>
                    <p className="user-name">{nickname}</p>
                </div>
                <div className="item-location-date">
                    <p className="sale-location">{location}</p>
                    <p className="item-update">{formatDateToString(createdAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewItemInfo;
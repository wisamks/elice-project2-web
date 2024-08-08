import { Link } from "react-router-dom";
import LikeBtn from "../buttons/LikeBtn";
import { formatDateToString } from "../../utils";

import './ItemCardVertical257.css';

const ItemCardVertical257 = ({item}) => {
    
    const getStatusClass = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return 'item-status item-status-free-ing';
            if (status === '예약') return 'item-status item-status-free-rsv';
            if (status === '완료') return 'item-status item-status-free-end';
        } else if (sort === '판매') {
            if (status === '진행') return 'item-status item-status-sale-ing';
            if (status === '예약') return 'item-status item-status-sale-rsv';
            if (status === '완료') return 'item-status item-status-sale-end';
        }
        return 'item-status';
    };

    const getStatusText = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return '나눔 진행';
            if (status === '예약') return '나눔 예약';
            if (status === '완료') return '나눔 완료';
        } else if (sort === '판매') {
            if (status === '진행') return '판매 진행';
            if (status === '예약') return '판매 예약';
            if (status === '완료') return '판매 완료';
        }
        return '';
    };

    const setStatusClass = getStatusClass(item.sort, item.status);
    const setStatusText = getStatusText(item.sort, item.status);
    const defaultThumbnail = "/images/ico-hanger.png";
    const thumbnailUrl = item.thumbnail.url || defaultThumbnail;
    const imgFrameClass = `imgFrame item-photo ${!item.thumbnail.url ? 'default' : ''}`;

    return (
        <div className="ItemCardVertical257">
            <Link to={`/board/view/${item.postId}`}>
                <p className={imgFrameClass}>
                    <img src={thumbnailUrl} alt="" />
                </p>
                <div className="item-status-cate">
                <p className={setStatusClass}>{setStatusText}</p>
                <p className="item-cate">{item.item}</p>
                </div>
                <p className="item-name">{item.title}</p>
                <p className="item-price"><span>{Number(item.price).toLocaleString()}</span>원</p>
                <div className="user-info">
                    <p className="user-profile imgFrame"><img src={item.userImage} alt="" /></p>
                    <p className="user-name">{item.nickname}</p>
                </div>
                <div className="item-location-date-comment">
                    <p className="item-location dot">{item.location}</p>
                    <p className="item-update dot">{formatDateToString(item.createdAt)}</p>
                    <p className="item-comment-count">
                        <span><img src="images/ico-comment.png" alt="댓글 수" /></span>
                        <span className="item-comment-count-num">{item.commentsCount}</span>
                    </p>
                </div>
                <div className="item-like">
                    <img src="images/ico-like.png" alt="좋아요 등록하기" />
                </div>
                <LikeBtn postId={item.postId} isMyFavorite={item.isMyFavorite} />
            </Link>
        </div>
    );
};

export default ItemCardVertical257;
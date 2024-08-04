import { Link } from "react-router-dom";

import './ItemCardVertical257.css';

const ItemCardVertical257 = () => {
    return (
        <div className="ItemCardVertical257">
            <Link to={'#'}>
                <p className="imgFrame item-photo"><img src="images/item/women/outer/women_outer_8.jpg" /></p>
                <div className="item-status-cate">
                    <p className="item-status item-status-sale-ing">판매 진행</p>
                    <p className="item-cate">아우터</p>
                </div>
                <p className="item-name">여성 라운드 자켓</p>
                <p className="item-price"><span>5,000</span>원</p>
                <div className="user-info">
                    <p className="user-profile imgFrame"><img src="images/profile/profile21.png" alt="" /></p>
                    <p className="user-name">사용자이름</p>
                </div>
                <div className="item-location-date-comment">
                    <p className="item-location dot">성동구</p>
                    <p className="item-update dot">2024.07.24</p>
                    <p className="item-comment-count">
                        <span><img src="images/ico-comment.png" alt="댓글 수" /></span>
                        <span className="item-comment-count-num">24</span>
                    </p>
                </div>
                <div className="item-like">
                    <img src="images/ico-like.png" alt="좋아요 등록하기" />
                </div>
            </Link>
        </div>
    );
};

export default ItemCardVertical257;
import './ViewItemInfo.css';

const ViewItemInfo = () => {
    return (
        <div className="view-post-item-info">
            <div className="row1">
                <div className="item-info">
                    <div className="item-status-cate">
                        <p className="item-status item-status-sale-ing">판매 진행</p>
                        <p className="item-cate">상의</p>
                    </div>                    
                    <p className="item-name">자라 오버핏 자켓</p>
                </div>
                <div className="item-price"><span className="number">5,000</span>원</div>
            </div>
            <div className="row2">
                <div className="user-info">
                    <p className="user-profile"><img src="../images/profile/profile06.png" alt="{userName}" /></p>
                    <p className="user-name">도롱도롱54</p>
                </div>
                <div className="item-location-date">
                    <p className="sale-location">영등포구</p>
                    <p className="item-update">2024.08.01</p>
                </div>
            </div>
        </div>
    );
};

export default ViewItemInfo;
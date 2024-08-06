import './CertificationListCard.css';

const CertificationListCard = () => {
    return (
        <div className="CertificationListCard">
            <div className="user-info">
                <p className="user-profile imgFrame"><img src="/images/profile/profile21.png" alt="" /></p>
                <p className="user-name">퍼스트펭귄</p>
            </div>
            <div className="photo">
                <img src="/images/profile/certification.jpg" alt="" />
            </div>
            <div className="reaction">
                <p className="like">
                    <span className="icon"><img src="/images/ico-like-888.png" /></span>
                    <span className="text">25</span>
                </p>
                <p className="comment">
                    <span className="icon"><img src="/images/ico-comment-888.png" /></span>
                    <span className="text">8</span>
                </p>
                <p className="view">
                    <span className="icon"><img src="/images/ico-view-888.png" /></span>
                    <span className="text">45</span>
                </p>
            </div>
            <div className="content">대화동 의류 수거함 인증 완료 🫶</div>
        </div>
    );
};

export default CertificationListCard;
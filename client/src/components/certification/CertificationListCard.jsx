import './CertificationListCard.css';

const CertificationListCard = ({ post }) => {
    // thumbnail.url을 사용하여 이미지를 표시하고, 없으면 기본 이미지를 사용
    const imageUrl = post.thumbnail?.url || "/images/profile/certification.jpg"; // thumbnail.url이 없으면 기본 이미지 사용
    return (
        <div className="CertificationListCard">
            <div className="user-info">
                <p className="user-profile imgFrame">
                    <img src={post.userImage || "/images/profile/profile21.png"} alt="프로필 이미지" />
                </p>
                <p className="user-name">{post.nickname || "사용자 이름"}</p>
            </div>
            <div className="photo">
                <img src={imageUrl} alt="인증 이미지" />
            </div>
            <div className="reaction">
                <p className="like">
                    <span className="icon"><img src="/images/ico-like-888.png" alt="좋아요 아이콘" /></span>
                    <span className="text">{post.counts?.favoriteCount || 0}</span>
                </p>
                <p className="comment">
                    <span className="icon"><img src="/images/ico-comment-888.png" alt="댓글 아이콘" /></span>
                    <span className="text">{post.counts?.commentsCount || 0}</span>
                </p>
                <p className="view">
                    <span className="icon"><img src="/images/ico-view-888.png" alt="조회수 아이콘" /></span>
                    <span className="text">{post.counts?.viewsCount || 0}</span>
                </p>
            </div>
            <div className="content">{post.content || "내용 없음"}</div>
        </div>
    );
};

export default CertificationListCard;
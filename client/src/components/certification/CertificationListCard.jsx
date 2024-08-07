// import './CertificationListCard.css';

// const CertificationListCard = () => {
//     return (
//         <div className="CertificationListCard">
//             <div className="user-info">
//                 <p className="user-profile imgFrame"><img src="/images/profile/profile21.png" alt="" /></p>
//                 <p className="user-name">퍼스트펭귄</p>
//             </div>
//             <div className="photo">
//                 <img src="/images/profile/certification.jpg" alt="" />
//             </div>
//             <div className="reaction">
//                 <p className="like">
//                     <span className="icon"><img src="/images/ico-like-888.png" /></span>
//                     <span className="text">25</span>
//                 </p>
//                 <p className="comment">
//                     <span className="icon"><img src="/images/ico-comment-888.png" /></span>
//                     <span className="text">8</span>
//                 </p>
//                 <p className="view">
//                     <span className="icon"><img src="/images/ico-view-888.png" /></span>
//                     <span className="text">45</span>
//                 </p>
//             </div>
//             <div className="content">대화동 의류 수거함 인증 완료 🫶</div>
//         </div>
//     );
// };

// export default CertificationListCard;

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
                    <span className="text">{post.favoriteCount || 0}</span>
                </p>
                <p className="comment">
                    <span className="icon"><img src="/images/ico-comment-888.png" alt="댓글 아이콘" /></span>
                    <span className="text">{post.commentsCount || 0}</span>
                </p>
                <p className="view">
                    <span className="icon"><img src="/images/ico-view-888.png" alt="조회수 아이콘" /></span>
                    <span className="text">{post.viewCount || 0}</span>
                </p>
            </div>
            <div className="content">{post.content || "내용 없음"}</div>
        </div>
    );
};

export default CertificationListCard;

import './ViewCommentCard.css';

const ViewCommentCard = () => {
    return(
        <div className="view-comment-card">
            <p className="comment-txt">
                실측사이즈를 알 수 있을까요?
            </p>
            <div className="comment-info">
                <div className="user-info dot">
                    <p className="user-profile imgFrame"><img src="../images/profile/profile26.png" alt="{userName}" /></p>
                    <p className="user-name">오리날다</p>
                </div>
                <div className="comment-date">12분전</div>
            </div>
        </div>
    );
};

export default ViewCommentCard;
import ViewCommentCard from './ViewCommentCard';

import './ViewComment.css';

const ViewComment = () => {
    return(
        <div className="view-post-comment">
            <div className="row1">
                <h3 className="title">댓글</h3>
                <p className="total">총 <span className="total-num">24</span>개</p>
            </div>
            <div className="row2">
                <div className="comment-form">
                    <p className="input-txt">
                        <input 
                            type="text"
                            className="input-text-d9d9d9"
                            placeholder="댓글을 입력해주세요."
                        />
                    </p>
                    <p className="btn-submit">
                        <span className="btn-primary-border">등록하기</span>
                    </p>
                </div>
                <div className="comment-secret">
                    <p className="input-checkbox">
                        <span>
                            <input type="checkbox" />
                        </span>
                        <label>비밀댓글로 등록하기</label>
                    </p>
                </div>
            </div>
            <div className="row3">
                <ul>
                    <li><ViewCommentCard /></li>
                </ul>                
            </div>
        </div>
    );
};

export default ViewComment;
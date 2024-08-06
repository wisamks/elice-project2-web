import './CertificationModal.css';

const CertificationModal = ({ handleCloseModal }) => {
    const handleClickCloseModal = () => {
        handleCloseModal();
    }

    return (
        <div className="CertificationModal">
            <div className="modal-wrap">
                <div className="modal-main-img imgFrame">
                    <img src="/images/profile/certification.jpg" alt="" />
                </div>
                <div className="modal-right">
                    <div className="modal-right-top">
                        <div className="modal-user-info">
                            <p className="user-profile imgFrame"><img src="/images/profile/profile21.png" alt="" /></p>
                            <p className="user-name">퍼스트펭귄</p>
                        </div>
                        {/* 로그인사용자 === 게시글사용자 일때 보일 영역 시작 */}
                        <div className="user-edit-btn">
                            <p className="user-edit-btn-del">
                                <span className="icon"><img src='/images/ico-delete.png' alt='삭제하기' /></span>
                                <span className="text">삭제</span>
                            </p>
                            <p className="user-edit-btn-fix">
                                <span className="icon"><img src='/images/ico-fix.png' alt='수정하기' /></span>
                                <span className="text">수정</span>
                            </p>
                        </div>                        
                        {/* 로그인사용자 === 게시글사용자 일때 보일 영역 끝 */}
                    </div>
                    <div className="user-content-wrap">
                        <p className="user-content-text">
                            대화동 의류 수거함 인증 완료 🫶
                        </p>
                        <p className='user-content-date'>
                            2시간 전
                        </p>
                    </div>
                    <div className="comment-list">
                        <ul>
                            {/* 댓글 반복 시작*/}
                            <li>
                                <div className="comment-list-user-profile imgFrame"><img src="/images/profile/profile15.png" alt="" /></div>
                                <div className="comment-list-right">
                                    <p className="comment-user-text">
                                        <span className="comment-user">해피킹</span>
                                        <span className="comment-text">멋진 활동 응원합니다!</span>
                                    </p>
                                    <p className='comment-date'>1시간 전</p>
                                </div>
                            </li>
                            {/* 댓글 반복 끝*/}
                        </ul>
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
                    <div className="comment-input-form">
                        <span className="comment-input">
                            <input
                                type="text"
                                placeholder="댓글달기..."
                                className="input-text-opacity-0"
                            />
                        </span>
                        <span className="comment-btn">
                            <button className="btn-opacity-0">게시</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="modal-black" onClick={handleClickCloseModal}>
                <p className="modal-close"><img src="/images/clear-icon.png" alt="모달창 닫기" /></p>
            </div>
        </div>
    );
};

export default CertificationModal;
// import ViewCommentCard from './ViewCommentCard';

// import './ViewComment.css';

// const ViewComment = () => {
//     return(
//         <div className="view-post-comment">
//             <div className="row1">
//                 <h3 className="title">댓글</h3>
//                 <p className="total">총 <span className="total-num">24</span>개</p>
//             </div>
//             <div className="row2">
//                 <div className="comment-form">
//                     <p className="input-txt">
//                         <input 
//                             type="text"
//                             className="input-text-d9d9d9"
//                             placeholder="댓글을 입력해주세요."
//                         />
//                     </p>
//                     <p className="btn-submit">
//                         <span className="btn-primary-border">등록하기</span>
//                     </p>
//                 </div>
//                 <div className="comment-secret">
//                     <p className="input-checkbox">
//                         <span>
//                             <input type="checkbox" />
//                         </span>
//                         <label>비밀댓글로 등록하기</label>
//                     </p>
//                 </div>
//             </div>
//             <div className="row3">
//                 <ul>
//                     <li><ViewCommentCard /></li>
//                 </ul>                
//             </div>
//         </div>
//     );
// };

// export default ViewComment;

// ViewComment.jsx

// ViewComment.jsx

import React, { useState, useEffect } from 'react';
import ViewCommentCard from './ViewCommentCard';
import './ViewComment.css';
import { fetchComments, createComment } from './comment';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom/userState';

const ViewComment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const postId = queryParams.get('postId'); // URL 쿼리 파라미터에서 postId 추출
  const page = queryParams.get('page') || 1; // 기본값을 1로 설정
  const perPage = queryParams.get('perPage') || 10; // 기본값을 10으로 설정

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const user = useRecoilValue(userState);

  useEffect(() => {
    // postId가 존재하는지 확인
    if (!postId) {
      console.error('postId is undefined');
      setLoading(false);
      return;
    }

    const loadComments = async () => {
      try {
        const data = await fetchComments(postId, page, perPage);
        setComments(data.comments);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, page, perPage]);

  // 새로운 댓글 입력값을 처리하는 함수
  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 비밀 댓글 여부를 처리하는 함수
  const handleSecretChange = (e) => {
    setIsSecret(e.target.checked);
    console.log('secret comment:', e.target.checked);
  };

  // 새로운 댓글을 서버에 추가하는 함수
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const result = await createComment(postId, newComment, isSecret);

      setComments((prevComments) => [
        { 
          ...result,
          nickname: user.nickname,
          image: user.image,
          createdAt: new Date().toISOString(),
        },
        ...prevComments,
      ]);
      setNewComment('');
      setIsSecret(false); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="view-post-comment">
      <div className="row1">
        <h3 className="title">댓글</h3>
        <p className="total">총 <span className="total-num">{comments.length}</span>개</p>
      </div>
      <div className="row2">
        <div className="comment-form">
          <p className="input-txt">
            <input
              type="text"
              className="input-text-d9d9d9"
              placeholder="댓글을 입력해주세요."
              value={newComment}
              onChange={handleNewCommentChange}
            />
          </p>
          <p className="btn-submit">
            <span className="btn-primary-border" onClick={handleAddComment}>등록하기</span>
          </p>
        </div>
        <div className="comment-secret">
          <p className="input-checkbox">
            <span>
              <input type="checkbox" checked={isSecret} onChange={handleSecretChange} />
            </span>
            <label>비밀댓글로 등록하기</label>
          </p>
        </div>
      </div>
      <div className="row3">
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>
              <ViewCommentCard comment={comment} setComments={setComments} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewComment;

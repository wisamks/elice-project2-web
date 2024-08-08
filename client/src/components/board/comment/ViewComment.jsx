import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom/userState';
import ViewCommentCard from './ViewCommentCard';
import { fetchComments, createComment } from './comment';
import './ViewComment.css';

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
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  const user = useRecoilValue(userState);

  const loadComments = async () => {
    if (!postId) {
      console.error('postId is undefined');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchComments(postId, page, perPage);
      setComments(data.comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSecretChange = () => {
    setIsSecret(!isSecret);
  };

  const handleCheckboxClick = () => {
    setIsCheckboxActive(!isCheckboxActive);
    handleSecretChange();
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const result = await createComment(postId, newComment, isSecret);
      setNewComment('');
      setIsSecret(false); 
      setIsCheckboxActive(false);
      await loadComments(); // 댓글 추가 후 최신 댓글 목록 불러오기
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
          <p
            className={`input-checkbox ${isCheckboxActive ? 'input-checkbox-active' : ''}`}
            onClick={handleCheckboxClick}
          >
            <span>
              <input type="checkbox" checked={isSecret} readOnly />
            </span>
            <label>비밀댓글로 등록하기</label>
          </p>
        </div>
      </div>
      <div className="row3">
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>
              <ViewCommentCard comment={comment} setComments={setComments} user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewComment;
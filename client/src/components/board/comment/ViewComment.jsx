import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState, loginState } from '../../../atom/userState';
import ViewCommentCard from './ViewCommentCard';
import { fetchComments, createComment } from './comment';
import './ViewComment.css';

const ViewComment = ({postId}) => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const loadComments = async () => {
    if (!postId) {
      console.error('postId is undefined');
      return;
    }

    try {
      const data = await fetchComments(postId, page, perPage);
      setComments(data.comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId, page, perPage]);

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
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/sign-in');
      return;
    }

    if (newComment.trim() === '') return;

    try {
      await createComment(postId, newComment, isSecret);
      setNewComment('');
      setIsSecret(false); 
      setIsCheckboxActive(false);
      await loadComments();
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

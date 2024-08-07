import React, { useState } from 'react';
import { updateComment, deleteComment } from './comment';
import { formatDateToString } from '../../../utils';
import './ViewCommentCard.css';

const ViewCommentCard = ({ comment, setComments, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (editedContent.trim() === '') return;

    try {
      const success = await updateComment(comment.commentId, editedContent);

      if (success) {
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.commentId === comment.commentId ? { ...c, content: editedContent } : c));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.commentId);
      setComments((prevComments) =>
        prevComments.filter((c) => c.commentId !== comment.commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="view-comment-card">
      {isEditing ? (
        <textarea
          className="comment-txt"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="comment-txt">
          {comment.secret && comment.userId !== user.id ? '********' : comment.content}
        </p>
      )}
      <div className="comment-info">
        <div className="user-info dot">
          <p className="user-profile imgFrame">
            <img src={comment.image} alt={comment.nickname} />
          </p>
          <p className="user-name">{comment.nickname}</p>
        </div>
        <div className="comment-date">{formatDateToString(comment.createdAt)}</div>
      </div>
      {comment.userId === user.id && (
        <div className="comment-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveEdit}>저장</button>
              <button onClick={handleCancelEdit}>취소</button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewCommentCard;

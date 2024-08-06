// import './ViewCommentCard.css';

// const ViewCommentCard = () => {
//     return(
//         <div className="view-comment-card">
//             <p className="comment-txt">
//                 실측사이즈를 알 수 있을까요?
//             </p>
//             <div className="comment-info">
//                 <div className="user-info dot">
//                     <p className="user-profile imgFrame"><img src="../images/profile/profile26.png" alt="{userName}" /></p>
//                     <p className="user-name">오리날다</p>
//                 </div>
//                 <div className="comment-date">12분전</div>
//             </div>
//         </div>
//     );
// };

// export default ViewCommentCard;

// ViewCommentCard.jsx

import React, { useState } from 'react';
import './ViewCommentCard.css';
import { updateComment, deleteComment } from './comment';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom/userState';

const ViewCommentCard = ({ comment, setComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // 전역 상태에서 사용자 정보 가져오기
  const user = useRecoilValue(userState);

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
        <p className="comment-txt">{comment.content}</p>
      )}
      <div className="comment-info">
        <div className="user-info dot">
          <p className="user-profile imgFrame">
            <img src={comment.image} alt={comment.nickname} />
          </p>
          <p className="user-name">{comment.nickname}</p>
        </div>
        <div className="comment-date">{new Date(comment.createdAt).toLocaleString()}</div>
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

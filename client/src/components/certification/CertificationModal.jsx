import './CertificationModal.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/userState';

// 게시글 수정
const updatePost = async (postId, content) => {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
      credentials: 'include',
    });

    if (response.ok) {
      return true;

    } else {
      const errorText = await response.text();
      console.error('게시글 수정 실패:', errorText);
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// 게시글 삭제
const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      console.error('게시글 삭제 실패:', errorText);
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

const CertificationModal = ({ post, handleCloseModal, handlePostDeleted, handlePostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.post?.content || '');

  const handleClickCloseModal = () => {
    handleCloseModal();
  };

  const user = useRecoilValue(userState);

//   console.log('Modal Post Data: ', post);
//   console.log('Current User: ', user);

  // 수정 버튼 클릭 시 수정 상태로
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.post?.content || '');
  };

  const handleSaveEdit = async () => {
    try {
      const postId = post.post?.postId;
      const success = await updatePost(postId, editedContent);

      if (success) {
        setIsEditing(false);
        post.post.content = editedContent;
        handlePostUpdated(post.post);
      }
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 삭제
  const handleDeleteClick = async () => {
    const confirmation = window.confirm('이 게시글을 삭제하시겠습니까?');

    if (!confirmation) {
      return;
    }

    try {
      const postId = post.post?.postId;
      const success = await deletePost(postId);

      if (success) {
        alert('게시글이 삭제되었습니다.');
        handleCloseModal();
        handlePostDeleted(postId);
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="CertificationModal">
      <div className="modal-wrap">
        <div className="modal-main-img imgFrame">
          <img
            src={post.thumbnail?.thumbnailUrl || '/images/profile/certification.jpg'}
            alt="인증 이미지"
          />
        </div>
        <div className="modal-right">
          <div className="modal-right-top">
            <div className="modal-user-info">
              <p className="user-profile imgFrame">
                <img
                  src={post.post?.userImage || '/images/profile/profile21.png'}
                  alt="프로필 이미지"
                />
              </p>
              <p className="user-name">{post.post?.nickname || '사용자 이름'}</p>
            </div>

            {post.post?.userId === user.id && (
              <div className="user-edit-btn">
                {!isEditing ? (
                  <>
                    <p className="user-edit-btn-del" onClick={handleDeleteClick}>
                      <span className="icon">
                        <img src="/images/ico-delete.png" alt="삭제하기" />
                      </span>
                      <span className="text">삭제</span>
                    </p>
                    <p className="user-edit-btn-fix" onClick={handleEditClick}>
                      <span className="icon">
                        <img src="/images/ico-fix.png" alt="수정하기" />
                      </span>
                      <span className="text">수정</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="user-edit-btn-save" onClick={handleSaveEdit}>
                      <span className="text">저장</span>
                    </p>
                    <p className="user-edit-btn-cancel" onClick={handleCancelEdit}>
                      <span className="text">취소</span>
                    </p>
                  </>
                )}
              </div>
            )}

          </div>
          <div className="user-content-wrap">
            {!isEditing ? (
              <p className="user-content-text">{post.post?.content || '내용 없음'}</p>
            ) : (
              <textarea
                className="edit-content-text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            )}
            <p className="user-content-date">{formatDate(post.post?.createdAt)}</p>
          </div>
          <div className="comment-list">
            <ul>
              {/* 댓글 반복 시작*/}
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <li key={comment.id}>
                    <div className="comment-list-user-profile imgFrame">
                      <img
                        src={comment.userImage || '/images/profile/profile15.png'}
                        alt="댓글 사용자 프로필"
                      />
                    </div>
                    <div className="comment-list-right">
                      <p className="comment-user-text">
                        <span className="comment-user">{comment.nickname || '익명'}</span>
                        <span className="comment-text">{comment.content}</span>
                      </p>
                      <p className="comment-date">{formatDate(comment.createdAt)}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li>댓글이 없습니다.</li>
              )}
              {/* 댓글 반복 끝*/}
            </ul>
          </div>
          <div className="reaction">
            <p className="like">
              <span className="icon">
                <img src="/images/ico-like-888.png" alt="좋아요 아이콘" />
              </span>
              <span className="text">{post.counts?.favoriteCount || 0}</span>
            </p>
            <p className="comment">
              <span className="icon">
                <img src="/images/ico-comment-888.png" alt="댓글 아이콘" />
              </span>
              <span className="text">{post.counts?.commentsCount || 0}</span>
            </p>
            <p className="view">
              <span className="icon">
                <img src="/images/ico-view-888.png" alt="조회수 아이콘" />
              </span>
              <span className="text">{post.viewCount || 0}</span>
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
        <p className="modal-close">
          <img src="/images/clear-icon.png" alt="모달창 닫기" />
        </p>
      </div>
    </div>
  );
};

// 날짜를 포맷팅하는 함수
const formatDate = (createdAt) => {
  if (!createdAt) return '날짜 정보 없음';

  const date = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays}일 전`;
  }
};

export default CertificationModal;

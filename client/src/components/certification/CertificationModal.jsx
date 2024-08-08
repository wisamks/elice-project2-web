import './CertificationModal.css';
import { baseURI } from '../../controllers/baseURI';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/userState';
import ViewComment from '../board/comment/ViewComment';

// 게시글 수정 함수
const updatePost = async (postId, content) => {
  try {
    const response = await fetch(`${baseURI}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }), // 요청에 수정된 content 포함
      credentials: 'include', // 사용자 인증 필요 시 사용
    });

    if (response.ok) {
      // 요청이 성공하면 true 반환
      return true;
    } else {
      // 요청 실패 시 오류 던지기
      const errorText = await response.text();
      console.error('게시글 수정 실패:', errorText);
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// 게시글 삭제 함수
const deletePost = async (postId) => {
  try {
    const response = await fetch(`${baseURI}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 사용자 인증 필요 시 사용
    });

    if (response.ok) {
      // 요청이 성공하면 true 반환
      return true;
    } else {
      // 요청 실패 시 오류 던지기
      const errorText = await response.text();
      console.error('게시글 삭제 실패:', errorText);
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// 좋아요 상태를 토글하는 함수
const toggleFavorite = async (postId) => {
  try {
    // 좋아요 요청 보내기
    const response = await fetch(`${baseURI}/api/favorite`, {
      method: 'POST', // 좋아요 요청 (좋아요 추가와 취소 모두 POST 요청)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }), // postId를 요청에 포함
      credentials: 'include', // 사용자 인증 필요 시 사용
    });

    if (response.ok) {
      // 요청이 성공하면 true 반환
      return true;
    } else {
      // 요청 실패 시 오류 던지기
      const errorText = await response.text();
      console.error('좋아요 상태 변경 실패:', errorText);
      throw new Error('Failed to toggle favorite');
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

const CertificationModal = ({
  post,
  handleCloseModal,
  handlePostDeleted,
  handlePostUpdated,
}) => {
  // 수정 상태를 관리하기 위한 state
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.post?.content || '');

  // 좋아요 상태와 좋아요 수를 관리하기 위한 state
  const [isFavorite, setIsFavorite] = useState(post.isMyFavorite);
  const [favoriteCount, setFavoriteCount] = useState(post.counts?.favoriteCount || 0);

  const handleClickCloseModal = () => {
    handleCloseModal();
  };

  const user = useRecoilValue(userState);

  // 수정 버튼 클릭 시 수정 상태로 전환
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정 취소 버튼 클릭 시
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.post?.content || '');
  };

  // 수정 내용을 서버에 전송하는 함수
  const handleSaveEdit = async () => {
    try {
      // postId 추출
      const postId = post.post?.postId;

      // 게시글 수정 요청 함수 호출
      const success = await updatePost(postId, editedContent);

      if (success) {
        // 수정 성공 시
        setIsEditing(false);
        // 화면에 수정된 내용을 반영
        post.post.content = editedContent;
        handlePostUpdated(post.post); // 수정된 게시글을 업데이트
      }
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 삭제 버튼 클릭 시
  const handleDeleteClick = async () => {
    const confirmation = window.confirm('이 게시글을 삭제하시겠습니까?');

    if (!confirmation) {
      return; // 사용자가 취소를 누르면 함수 종료
    }

    try {
      const postId = post.post?.postId; // postId 추출

      // 게시글 삭제 요청 함수 호출
      const success = await deletePost(postId);

      if (success) {
        // 삭제 성공 시
        alert('게시글이 삭제되었습니다.');
        handleCloseModal(); // 모달 닫기
        handlePostDeleted(postId); // 게시글 삭제 시 호출
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 좋아요 버튼 클릭 시
  const handleFavoriteClick = async () => {
    try {
      const postId = post.post?.postId; // postId 추출

      // 좋아요 상태 토글 요청 함수 호출
      const success = await toggleFavorite(postId);

      if (success) {
        // 좋아요 상태 변경 성공 시
        setIsFavorite(!isFavorite);
        setFavoriteCount(isFavorite ? favoriteCount - 1 : favoriteCount + 1);
      }
    } catch (error) {
      console.error('좋아요 상태 변경 중 오류 발생:', error);
      alert('좋아요 상태 변경에 실패했습니다.');
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
            {/* 로그인 사용자와 게시글 작성자가 동일할 때 보일 영역 시작 */}
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
            {/* 로그인 사용자와 게시글 작성자가 동일할 때 보일 영역 끝 */}
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
          <ViewComment postId={post.post.postId} />
          <div className="reaction">
            <p className="like" onClick={handleFavoriteClick}>
              <span className="icon">
                <img
                  src={isFavorite ? '/images/ico-like-888-active.png' : '/images/ico-like-888.png'}
                  alt="좋아요 아이콘"
                />
              </span>
              <span className="text">{favoriteCount}</span>
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
              <span className="text">{post.counts?.viewsCount || 0}</span>
            </p>
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
  } else if (diffInSeconds < 172800) { // 2 days in seconds
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays}일 전`;
  } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
  }
};

export default CertificationModal;

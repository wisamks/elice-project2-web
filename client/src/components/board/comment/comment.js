// 조회
export const fetchComments = async (postId, page = 1, perPage = 10) => {
  try {
    const response = await fetch(`http://localhost:8080/api/comments/?postId=${postId}&page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
  
  // 생성
export const createComment = async (postId, content, secret) => {
  try {
    const response = await fetch('http://localhost:8080/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, content, secret }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    
    const data = await response.json();
    console.log('createComment', createComment);
    return data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};
  
// 수정
export const updateComment = async (commentId, content, secret) => {
  try {
    const response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, secret }),
      credentials: 'include',
    });

    if (response.ok) {
        return true;
    } else {
        throw new Error('Failed to update comment');
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
  
// 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
  

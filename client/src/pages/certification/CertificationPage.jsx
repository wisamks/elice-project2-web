import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CertificationListCard from '../../components/certification/CertificationListCard';
import CertificationModal from '../../components/certification/CertificationModal';
import BoardListPagination from '../../components/board/list/BoardListPagination';
import './CertificationPage.css';

const CertificationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedPostId, setSelectedPostId] = useState(null); // 선택된 게시글 ID
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글 상세 정보
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 수
  const postsPerPage = 5; // 한 페이지에 표시할 게시글 수
  const categoryId = 2; // 조회할 카테고리 ID
  const page = parseInt(searchParams.get('page')) || 1; // 현재 페이지

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' });
    }
  }, [searchParams, setSearchParams]);

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts?perPage=${postsPerPage}&page=${page}&categoryId=${categoryId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게시글을 가져오는 중 오류 발생:', errorText);
        throw new Error('게시글을 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      //   console.log('Posts data:', data);

      if (Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
        setTotalPosts(data.totalPostsCount);
      } else {
        console.error('게시글 데이터가 유효하지 않거나 비어 있습니다.');
        setPosts([]);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPostDetail = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게시글 상세 정보를 가져오는 중 오류 발생:', errorText);
        throw new Error('게시글 상세 정보를 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      console.log('Post detail data:', data);

      setSelectedPost(data);
      setIsModalOpen(true);
      document.body.classList.add('modal-open');
    } catch (error) {
      console.error('게시글 상세 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    fetchPostDetail(postId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
    setSelectedPost(null);
    document.body.classList.remove('modal-open');
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  // 게시글 삭제 후 목록 갱신 함수
  const handlePostDeleted = (deletedPostId) => {
    // 삭제된 게시글을 제외한 새로운 게시글 목록 생성
    const updatedPosts = posts.filter((post) => post.postId !== deletedPostId);

    setPosts(updatedPosts);
    setTotalPosts(totalPosts - 1);
  };

  // 게시글 수정 후 목록 갱신 함수
  const handlePostUpdated = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.postId === updatedPost.postId ? { ...post, ...updatedPost } : post
    );

    setPosts(updatedPosts);
  };

  return (
    <div className="CertificationPage">
      <div className="certification-list-top">
        <h1 className="page-title">의류수거함 인증</h1>
        <div className="btn-go-create">
          <Link to="/certification/create">
            <span>
              <img src="images/ico-edit.png" alt="등록하기" />
            </span>
            <span>등록하기</span>
          </Link>
        </div>
      </div>
      <div className="certification-list-top2">
        <div className="certification-list-total">
          총
          <span className="total-num">{totalPosts}</span>
          개
        </div>
      </div>
      <div className="certification-list-list">
        <ul>
          {posts.map((post) => (
            <li key={post.postId} onClick={() => handleOpenModal(post.postId)}>
              <CertificationListCard post={post} />
            </li>
          ))}
        </ul>
      </div>
      <BoardListPagination
        total={totalPosts}
        page={page}
        perPage={postsPerPage}
        handlePageChange={handlePageChange}
      />
      {isModalOpen && selectedPost && (
        <CertificationModal
          post={selectedPost}
          handleCloseModal={handleCloseModal}
          handlePostDeleted={handlePostDeleted}
          handlePostUpdated={handlePostUpdated}
        />
      )}
    </div>
  );
};

export default CertificationPage;

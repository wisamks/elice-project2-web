import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CertificationListCard from "../../components/certification/CertificationListCard";
import CertificationModal from "../../components/certification/CertificationModal";
import './CertificationPage.css';

const CertificationPage = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedPostId, setSelectedPostId] = useState(null); // 선택된 게시글 ID
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글 상세 정보
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 40; // 한 페이지에 표시할 게시글 수
  const categoryId = 2; // 조회할 카테고리 ID

  // 게시글 목록을 가져오는 함수
  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts?perPage=${postsPerPage}&page=${page}&categoryId=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게시글을 가져오는 중 오류 발생:', errorText);
        throw new Error('게시글을 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      console.log(data); // 서버 응답 데이터 확인

      if (Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts); // 게시글 목록 설정
        setTotalPosts(data.totalPostsCount); // 총 게시글 수 설정
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
    fetchPosts(currentPage); // 현재 페이지에 해당하는 게시글 가져오기
  }, [currentPage]);

  // 선택된 게시글의 상세 정보를 가져오는 함수
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
      console.log(data); // 상세 정보 확인

      setSelectedPost(data); // 선택된 게시글 상세 정보 설정
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error('게시글 상세 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    fetchPostDetail(postId); // 게시글 상세 정보 가져오기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
    setSelectedPost(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 계산

  return (
    <div className="CertificationPage">
      <div className="certification-list-top">
        <h1 className="page-title">의류수거함 인증</h1>
        <div className="btn-go-create">
          <Link to="/certification/create">
            <span><img src="images/ico-edit.png" alt="등록하기" /></span>
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
            <li key={post.id} onClick={() => handleOpenModal(post.id)}>
              <CertificationListCard post={post} />
            </li>
          ))}
        </ul>
      </div>
      {
        isModalOpen && selectedPost &&
        <CertificationModal
          post={selectedPost} // 선택된 게시글 정보 전달
          handleCloseModal={handleCloseModal}
        />
      }
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index} // 페이지네이션 버튼에 고유한 key 설정
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificationPage;

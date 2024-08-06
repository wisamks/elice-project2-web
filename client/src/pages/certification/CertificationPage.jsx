import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CertificationListCard from "../../components/certification/CertificationListCard";
import CertificationModal from "../../components/certification/CertificationModal";
import axios from 'axios';

import './CertificationPage.css';

const CertificationPage = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedPostId, setSelectedPostId] = useState(null); // 선택된 게시글 ID
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 40; // 한 페이지에 표시할 게시글 수

  // 게시글 목록을 가져오는 함수
  const fetchPosts = async (page) => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts/${postId}', {
        params: { page, limit: postsPerPage }, // 페이지와 제한을 API에 전달
      });
      setPosts(response.data.posts);
      setTotalPosts(response.data.totalCount); // 총 게시글 수 설정
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

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
        isModalOpen && selectedPostId &&
        <CertificationModal
          postId={selectedPostId}
          handleCloseModal={handleCloseModal}
        />
      }
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
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

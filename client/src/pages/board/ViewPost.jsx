import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/userState';

import ViewPhoto from '../../components/board/view/ViewPhoto';
import ImageModal from '../../components/modal/ImageModal';
import ViewItemInfo from '../../components/board/view/ViewItemInfo';
import ViewItemDescription from '../../components/board/view/ViewItemDescription';
import ViewComment from '../../components/board/comment/ViewComment';
import ViewSimilarItem from '../../components/board/view/ViewSimilarItem';
import LikeBtn from '../../components/buttons/LikeBtn';

import { getExchangePost, deleteExchangePost, getExchangeList, updatePostStatus } from '../../controllers/exchangePostController';
import { apiService } from '../../services/apiService';

import './BoardStyle.css'

const ViewPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const user = useRecoilValue(userState);

    const statusOptions = [
        { id: 'ing', label: '진행' },
        { id: 'rev', label: '예약' },
        { id: 'end', label: '완료' },
    ];

    const [postData, setPostData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [recentPosts, setRecentPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const res = await apiService((apiClient) => getExchangePost(apiClient, postId));
                setPostData(res);
                if (res && res.post) {
                    setSelectedStatus(res.post.status);
                };
            };
        };

        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            const res = await apiService((apiClient) => getExchangeList(apiClient, 1, 8));
            setRecentPosts(res.posts);
        };

        fetchRecentPosts();
    }, []);

    const handleStatusClick = async (status) => {
        const postIdToNum = Number(postId)
        setSelectedStatus(status);
        setPostData((prevData) => ({
            ...prevData,
            post: {
                ...prevData.post,
                status: status,
            },
        }));

        await apiService((apiClient) => updatePostStatus(apiClient, postIdToNum, status));
    };

    const handleDeletePost = async () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            await apiService((apiClient) => deleteExchangePost(apiClient, postId));
            navigate('/board');
        }
    };

    const handleEditPost = () => {
        navigate(`/board/edit/${postId}`);
    };

    if (postData === null) {
        return <div>게시글 정보를 로딩중입니다.</div>
    };

    const handleOpenModal = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePhotoClick = (photo) => {
        handleOpenModal(photo);
    };

    return (
        <div className="view-post">
            <div className="view-post-row1">
                <div className="go-back-page">
                    <Link to="/board">
                        <span className="ico"><img src="/images/ico-back.png" /></span>
                        <span className="txt">돌아가기</span>
                    </Link>
                </div>
                {postData.post.userId === user.id &&
                    <div className="user-space">
                        <p className="post-status-title">판매상태 변경하기</p>
                        <div className="post-status">
                            {statusOptions.map((option) => (
                                <p
                                    key={option.id}
                                    className={`post-status-input ${selectedStatus === option.label ? 'post-status-input-active' : ''}`}
                                    onClick={() => handleStatusClick(option.label)}
                                >
                                    <span>
                                        <input
                                            type="radio"
                                            id={`post-status-${option.id}`}
                                            checked={selectedStatus === option.id}
                                            readOnly
                                        />
                                    </span>
                                    <label htmlFor={`post-status-${option.id}`}>{option.label}</label>
                                </p>
                            ))}
                        </div>
                        <div className="user-edit-btn">
                            <p className="user-edit-btn-del" onClick={handleDeletePost}>
                                <span className="icon"><img src='/images/ico-delete.png' alt='삭제하기' /></span>
                                <span className="text">삭제</span>
                            </p>
                            <p className="user-edit-btn-fix" onClick={handleEditPost}>
                                <span className="icon"><img src='/images/ico-fix.png' alt='수정하기' /></span>
                                <span className="text">수정</span>
                            </p>
                        </div>
                    </div>
                }
            </div>
            <div className="view-post-row2">
                <ViewPhoto
                    photos={postData.images}
                    onPhotoClick={handlePhotoClick}
                />
                {isModalOpen &&
                    <ImageModal
                        photos={postData.images}
                        selectedPhoto={selectedPhoto}
                        closeModal={handleCloseModal}
                    />
                }
                <LikeBtn 
                    postId={postData.post.postId}
                    isMyFavorite={postData.isMyFavorite}
                />
            </div>
            <div className="view-post-row3">
                <ViewItemInfo
                    sort={postData.post.sort}
                    status={postData.post.status}
                    item={postData.post.item}
                    title={postData.post.title}
                    price={postData.post.price}
                    userImage={postData.post.userImage}
                    nickname={postData.post.nickname}
                    location={postData.post.location}
                    createdAt={postData.post.createdAt}
                />
            </div>
            <div className="view-post-row4">
                <div className="view-post-row4-column1">
                    <div className="view-post-row4-column1-1">
                        <ViewItemDescription content={postData.post.content} />
                    </div>
                    <div className="view-post-row4-column1-2">
                        <ViewComment postId={postData.post.postId} />
                    </div>
                </div>
                <div className="view-post-row4-column2">
                    <ViewSimilarItem
                        filteredPosts={postData.filteredPosts}
                        recentPosts={recentPosts}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewPost;

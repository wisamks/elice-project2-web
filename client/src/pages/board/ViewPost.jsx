import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ViewPhoto from '../../components/board/view/ViewPhoto';
import ImageModal from '../../components/modal/ImageModal';
import ViewItemInfo from '../../components/board/view/ViewItemInfo';
import ViewItemDescription from '../../components/board/view/ViewItemDescription';
import ViewComment from '../../components/board/view/ViewComment';
import ViewSimilarItem from '../../components/board/view/ViewSimilarItem';

import { getExchangePost } from '../../controllers/exchangePostController';
import { apiService } from '../../services/apiService';

import './BoardStyle.css'

const ViewPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [postData, setPostData] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const res = await apiService((apiClient) => getExchangePost(apiClient, postId));
                console.log('ViewPost', res);
                setPostData(res);
            }
        };
        fetchPost();
    }, [postId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (postData === null) {
        return <div>게시글 정보를 로딩중입니다.</div>
    }

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
                <div className="go-back-page" onClick={handleGoBack}>
                    <span className="ico"><img src="/images/ico-back.png" /></span>
                    <span className="txt">돌아가기</span>
                </div>
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
                        <ViewComment />
                    </div>
                </div>
                <div className="view-post-row4-column2">
                    <ViewSimilarItem />
                </div>
            </div>
        </div>
    );
};

export default ViewPost;

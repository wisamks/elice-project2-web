import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ViewPhoto from '../../components/board/view/ViewPhoto';
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
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const res = await apiService((apiClient) => getExchangePost(apiClient, postId));
                if (res && res.data) {
                    setPost(res.data);
                }
            }
        };
        fetchPost();
    }, [postId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!post) {
        return <div>게시글 정보를 로딩중입니다.</div>
    }

    return (
        <div className="view-post">
            <div className="view-post-row1">
                <div className="go-back-page" onClick={handleGoBack}>
                    <span className="ico"><img src="../images/ico-back.png" /></span>
                    <span className="txt">돌아가기</span>
                </div>
            </div>
            <div className="view-post-row2">
                {/* <ViewPhoto photos={post.photos} /> */}
            </div>
            <div className="view-post-row3">
                <ViewItemInfo
                    sort={post.sort}
                    status={post.status}
                    item={post.item}
                    title={post.title}
                    price={post.price}
                    userImage={post.userImage}
                    nickname={post.nickname}
                    location={post.location}
                    createdAt={post.createdAt}
                />
            </div>
            <div className="view-post-row4">
                <div className="view-post-row4-column1">
                    <div className="view-post-row4-column1-1">
                        <ViewItemDescription content={post.content} />
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
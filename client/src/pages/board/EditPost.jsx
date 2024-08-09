import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PostForm from '../../components/board/PostForm';
import RecentPosts from '../../components/post/RecentPosts';

import { apiService } from '../../services/apiService';
import { getExchangePost, updateExchangePost } from '../../controllers/exchangePostController';

import './BoardStyle.css'

const EditPost = () => {
    const { postId } = useParams();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const res = await apiService((apiClient) => getExchangePost(apiClient, postId));
                setPostData(res);
            }
        };
        fetchPost();
    }, [postId]);

    const onSubmit = async (updatedPost) => {
        const res = await apiService((apiClient) => updateExchangePost(apiClient, postId, updatedPost));
        window.location.href = `/board/view/${postId}`;
    };

    if (postData === null) {
        return <div>게시글 정보를 로딩중입니다.</div>
    };

    return (
        <div className="edit-post">
            <h1 className="page-title">게시글 수정하기</h1>
            <div className="edit-post-wrap">
                <PostForm initialPost={postData} onSubmit={onSubmit} formType="edit" />
                <RecentPosts />
            </div>
        </div>
    );
};

export default EditPost;
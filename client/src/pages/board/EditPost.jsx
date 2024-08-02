import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import EditForm from '../../components/board/edit/EditForm';
import RecentPosts from '../../components/board/create/RecentPosts';

import './BoardStyle.css'

const EditPost = () => {
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

    const onSubmit = async (updatedPost) => {
        const res = await apiService((apiClient) => updateExchangePost(apiClient, postId, updatedPost));
        if (res && res.data) {
            navigate(`/view/${postId}`);
        }
    };

    if (!post) {
        return <div>게시글 정보를 로딩중입니다.</div>
    }

    return (
        <div className="edit-post">
            <h1 className="page-title">게시글 수정하기</h1>
            <div className="edit-post-wrap">
                <EditForm post={post} onSubmit={onSubmit} />
                <RecentPosts />
            </div>
        </div>
    );
};

export default EditPost;
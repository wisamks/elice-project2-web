import { useNavigate } from 'react-router-dom';

import PostForm from '../../components/board/PostForm';
import RecentPosts from '../../components/board/create/RecentPosts';

import { apiService } from '../../services/apiService';
import { postExchangePost } from '../../controllers/exchangePostController';

import './BoardStyle.css'

const CreatePost = () => {
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const res = await apiService((apiClient) => postExchangePost(apiClient, formData));

        if(res.status === 201){
            const { postId } = res.data;
            window.location.href=`/board/view/${postId}`;
        }
    };

    return (
        <div className="create-post">
            <h1 className="page-title">중고거래 등록하기</h1>
            <div className="create-post-wrap">
                <PostForm initialPost={null} onSubmit={onSubmit} formType="create" />
                <RecentPosts />
            </div>
        </div>
    );
};

export default CreatePost;
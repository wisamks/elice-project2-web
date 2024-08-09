import PostForm from '../../components/board/PostForm';
import RecentPosts from '../../components/post/RecentPosts';

import { apiService } from '../../services/apiService';
import { postExchangePost } from '../../controllers/exchangePostController';

import './BoardStyle.css'

const CreatePost = () => {
    const onSubmit = async (data) => {
        const res = await apiService(postExchangePost, data);
        if (res) {
            const { postId } = res;
            window.location.href = `/board/view/${postId}`;
        } else {
            console.error('Failed to create post');
            // 추가적인 에러 처리 로직 작성 여기에서 작성
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
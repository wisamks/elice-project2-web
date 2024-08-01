import BoardForm from '../../components/board/BoardForm';
import RecentPosts from '../../components/board/RecentPosts';

import './CreatePost.css'

const CreatePost = () => {
    return (
        <div className="create-post">
            <h1 className="page-title">중고거래 등록하기</h1>
            <div className="create-post-wrap">
                <BoardForm />
                <RecentPosts />
            </div>
        </div>
    );
};

export default CreatePost;
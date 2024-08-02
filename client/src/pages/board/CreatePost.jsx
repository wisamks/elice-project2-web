import CreateForm from '../../components/board/create/CreateForm';
import RecentPosts from '../../components/board/create/RecentPosts';

import './BoardStyle.css'

const CreatePost = () => {
    return (
        <div className="create-post">
            <h1 className="page-title">중고거래 등록하기</h1>
            <div className="create-post-wrap">
                <CreateForm />
                <RecentPosts />
            </div>
        </div>
    );
};

export default CreatePost;
import { Route, Routes } from 'react-router-dom';

import ListPost from './ListPost';
import CreatePost from './CreatePost';
import ViewPost from './ViewPost';
import EditPost from './EditPost';
import ViewComment from '../../components/board/comment/ViewComment';

const BoardPage = () => {
    return(
        <Routes>
          <Route path="/" element={<ListPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view/:postId" element={<ViewPost />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/comment" element={<ViewComment />} />
        </Routes>
    )
};

export default BoardPage;
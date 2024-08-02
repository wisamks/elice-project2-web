import { Route, Routes } from 'react-router-dom';

import CreatePost from './CreatePost';
import ViewPost from './ViewPost';
import EditPost from './EditPost';

const BoardPage = () => {
    return(
        <Routes>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view/:postId" element={<ViewPost />} />
          <Route path="/edit/:postId" element={<EditPost />} />
        </Routes>
    )
};

export default BoardPage;
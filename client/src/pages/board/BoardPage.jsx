import { Route, Routes } from 'react-router-dom';

import CreatePost from './CreatePost';
import ViewPost from './ViewPost';

const BoardPage = () => {
    return(
        <Routes>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view/:postId" element={<ViewPost />} />
        </Routes>
    )
};

export default BoardPage;
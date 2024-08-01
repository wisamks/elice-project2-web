import { Route, Routes } from 'react-router-dom';

import CreatePost from './CreatePost';

const BoardPage = () => {
    return(
        <Routes>
          <Route path="/create" element={<CreatePost />} />
        </Routes>
    )
};

export default BoardPage;
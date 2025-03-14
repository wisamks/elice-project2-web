import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import UserProfileLoader from "./components/account/UserProfileLoader";

import Home from './pages/home/Home';
import SignIn from './pages/account/SignIn';
import SignUp from './pages/account/SignUp';
import GoogleCallback from './components/account/callback/GoogleCallback';
import NaverCallback from './components/account/callback/NaverCallback';
import BoardPage from './pages/board/BoardPage';
import MapPage from './pages/map/MapPage';
import CertificationPage from './pages/certification/CertificationPage';
import CertificationForm from './pages/certification/CertificationForm';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <UserProfileLoader>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/oauth2callback/google" element={<GoogleCallback />} />
            <Route path="/oauth2callback/naver" element={<NaverCallback />} />
            <Route path="/board/*" element={<BoardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/certification/create" element={<CertificationForm />} />
          </Routes>
          <Footer />
        </UserProfileLoader>
      </Router>
    </RecoilRoot>
  );
}

export default App;

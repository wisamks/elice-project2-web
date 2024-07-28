import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import UnauthenticatedHeader from "./components/commen/UnauthenticatedHeader";
import AuthenticateHeader from "./components/commen/AuthenticatedHeader";
import Footer from "./components/commen/Footer";

import Home from './pages/home/Home';
import SignIn from './pages/account/SignIn';
import SignUp from './pages/account/SignUp';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <UnauthenticatedHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;

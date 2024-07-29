import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Footer from "./components/commen/Footer";

import Home from './pages/home/Home';
import SignIn from './pages/account/SignIn';
import SignUp from './pages/account/SignUp';
import GoogleCallback from './components/account/callback/GoogleCallback';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/oauth2callback/google" element={<GoogleCallback />} />
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;

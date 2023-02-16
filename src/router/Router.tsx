import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUpPage";
// import ChannelSearchPage from "../pages/ChannelSearchPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import Login from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import TeamChat from "../pages/TeamChat";
import GlobalStyles from "../GlobalStyles";
import { CookiesProvider } from "react-cookie";
const Router = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          {/* <Route path="/channelsearchpage" element={<MainPage />} /> */}
          {/* <Route path="/" element={<ChannelSearchPage />} /> */}
          <Route path="/findaccountpage" element={<FindAccountPage />} />
          <Route path="/findpasswordpage" element={<FindPasswordPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/teamchat" element={<TeamChat />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default Router;

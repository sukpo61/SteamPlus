import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUpPage";
import ChannelSearchPage from "../pages/ChannelSearchPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import Login from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import TeamChat from "../pages/TeamChat";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="Channelsearchpage" element={<ChannelSearchPage />} />
        <Route path="Findaccountpage" element={<FindAccountPage />} />
        <Route path="Findpasswordpage" element={<FindPasswordPage />} />
        <Route path="Mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="Teamchat" element={<TeamChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

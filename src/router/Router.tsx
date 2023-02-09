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
import GlobalStyles from "../GlobalStyles";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { profilebutton } from "../recoil/atom";
import { gamesearchbutton } from "../recoil/atom";
import { friendbutton } from "../recoil/atom";
import { friendsearchbutton } from "../recoil/atom";
import { voicetalkbutton } from "../recoil/atom";

const Router = () => {
  // 메뉴 상태 recoil
  const profileBoolean = useRecoilValue(profilebutton);
  const gamesearchBoolean = useRecoilValue(gamesearchbutton);
  const friendBoolean = useRecoilValue(friendbutton);
  const friendsearchBoolean = useRecoilValue(friendsearchbutton);
  const voicetalkBoolean = useRecoilValue(voicetalkbutton);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout />
      {/* 메뉴 열리고 닫힐때 페이지 크기 */}
      <RouteFloat
        //메뉴 상태 props
        profileBoolean={profileBoolean}
        gamesearchBoolean={gamesearchBoolean}
        friendBoolean={friendBoolean}
        friendsearchBoolean={friendsearchBoolean}
        voicetalkBoolean={voicetalkBoolean}
      >
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
      </RouteFloat>
    </BrowserRouter>
  );
};

export default Router;
// 메뉴 열리고 닫힐때 페이지 크기
const RouteFloat = styled.div<{
  profileBoolean: Boolean;
  gamesearchBoolean: Boolean;
  friendBoolean: Boolean;
  friendsearchBoolean: Boolean;
  voicetalkBoolean: Boolean;
}>`
  margin-left: ${(props) =>
    props.profileBoolean ||
    props.gamesearchBoolean ||
    props.friendBoolean ||
    props.friendsearchBoolean ||
    props.voicetalkBoolean
      ? "500px"
      : "100px"};
  transition: 0.5s ease-in-out;
  background-color: #192030;
`;

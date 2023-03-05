import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUpPage";
import ChannelSearchPage from "../pages/ChannelSearchPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import MyPage from "../pages/MyPage";
import TeamChat from "../pages/TeamChat";
import GlobalStyles from "../GlobalStyles";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { LayoutButton } from "../recoil/atom";
import Testtext from "../pages/Testtext";
import TestChat from "../pages/TestChat";
import SteamGameSearch from "../pages/Testscroll";
import { Community } from "../pages/Community";
import { CommunityAddPost } from "../components/communitypage/CommunityAddPost";
import { CommunityDetail } from "../components/communitypage/CommunityDetail";
import { CommunityEditPost } from "../components/communitypage/CommunityEditPost";
import Footer from "../components/common/Footer";
import LandingPage from "../pages/LandingPage";

const Router = () => {
  // 메뉴 상태 recoil
  const layoutMenu = useRecoilValue(LayoutButton);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout />
      {/* 메뉴 열리고 닫힐때 페이지 크기 */}
      <RouteFloat
        //메뉴 상태 props
        layoutMenu={layoutMenu}
        // onContextMenu={(e: any) => e.preventDefault()}
      >
        <Routes>
          <Route element={<Footer />}>
            <Route path="/" element={<MainPage />} />
            <Route path="Channelsearchpage" element={<ChannelSearchPage />} />
            <Route path="Community" element={<Community />} />
            <Route path="/Community/:id" element={<CommunityDetail />} />
            <Route path="CommunityAddPost" element={<CommunityAddPost />} />
            <Route
              path="CommunityEditPost/:id"
              element={<CommunityEditPost />}
            />
          </Route>

          <Route path="Findaccountpage" element={<FindAccountPage />} />
          <Route path="Findpasswordpage" element={<FindPasswordPage />} />
          <Route path="Mypage" element={<MyPage />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="Signup" element={<SignUp />} />
          <Route path="/Teamchat/:id" element={<TeamChat />} />
          <Route path="testtext" element={<Testtext />} />
          <Route path="testchat" element={<TestChat />} />
          <Route path="testscroll" element={<SteamGameSearch />} />
          <Route path="landing" element={<LandingPage />} />
        </Routes>
      </RouteFloat>
    </BrowserRouter>
  );
};

export default Router;
// 메뉴 열리고 닫힐때 페이지 크기
const RouteFloat = styled.div<{ layoutMenu: String }>`
  margin-left: ${(props) => (props.layoutMenu === "close" ? "80px" : "480px")};
  transition: 0.5s ease-in-out;
  overflow-x: hidden;
`;

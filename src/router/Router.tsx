import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUpPage";
import ChannelSearchPage from "../pages/ChannelSearchPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindPasswordPage from "../pages/FindPasswordPage";
// import Login from "../components/loginpage/Login";
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
          <Route path="/" element={<MainPage />} />
          <Route path="Channelsearchpage" element={<ChannelSearchPage />} />
          <Route path="Findaccountpage" element={<FindAccountPage />} />
          <Route path="Findpasswordpage" element={<FindPasswordPage />} />
          <Route path="Mypage" element={<MyPage />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="Signup" element={<SignUp />} />
          <Route path="/Teamchat/:id" element={<TeamChat />} />
          <Route path="testtext" element={<Testtext />} />
          <Route path="testchat" element={<TestChat />} />
          <Route path="testscroll" element={<SteamGameSearch />} />
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

import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LayoutButton,
  getFriend,
  friendAllState,
  newFriendAdd,
  BothFriend,
  AboutPagesState,
} from "../recoil/atom";
import Profile from "./layoutcomponents/Profile";
import GameSearch from "./layoutcomponents/GameSearch";
import Friend from "./layoutcomponents/Friend";
import FriendSearch from "./layoutcomponents/FriendSearch";
import VoiceTalk from "./layoutcomponents/VoiceTalk";
import FriendAdd from "./layoutcomponents/FriendAdd";
import { useQuery } from "react-query";
import axios from "axios";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdVoiceChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import socket from "../socket";
import AboutPages from "./layoutcomponents/AboutPages";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationName = location.pathname;

  const myId = sessionStorage.getItem("steamid");

  //레이아웃 종류
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //설명페이지 온오프
  const [aboutPagesOnOff, setAboutPagesOnOff] =
    useRecoilState<String>(AboutPagesState);
  // //친구 알림 내역
  const [bothFriendAll, setBothFriendAll] = useRecoilState(BothFriend);

  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] =
    useRecoilState<FriendSearchProps[]>(friendAllState);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);
  //메뉴 탭눌렀을때 (친구제외)
  const LayoutButtonOnClick = (i: string) => {
    if (layoutMenu === i) {
      setLayoutMenu("close");
    } else {
      setLayoutMenu(i);
    }
  };
  //친구 탭눌렀을때
  const FriendButtonOnClick = (i: string) => {
    if (
      layoutMenu === "friend" ||
      layoutMenu === "friendsearch" ||
      layoutMenu === "friendadd"
    ) {
      setLayoutMenu("close");
    } else {
      setLayoutMenu(i);
    }
  };
  // AboutPages클릭
  const AboutPagesOnClick = () => {
    setAboutPagesOnOff("aboutPages");
  };

  const getFriendSearch = async () => {
    const response = await axios.get("http://localhost:3001/auth");
    setFriendAllRecoil(response?.data);
    return response;
  };
  const { data: friendSearch } = useQuery("friendsearch", getFriendSearch);

  const getAllFriend = async () => {
    //비동기함수는 최대한 동기적으로 활용가능하게
    const response = await axios.get("http://localhost:3001/friend");
    setGetFriendAuth(response?.data);

    return response;
  };
  const { isLoading, isError, data, error } = useQuery("friend", getAllFriend);

  if (isLoading) {
    return <p>로딩중</p>;
  }
  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }

  //양쪽 다 친구 내역
  const friend = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friendAdd.length; t++) {
      if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        return i.myId === myId;
      } else if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        return i.myId === myId;
      }
    }
  });

  //친구 요청 온 내역만 (내 친구내역엔 없고 상대 친구내역엔 있는 상태)
  const friendAddCome = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friend.length; t++) {
      if (friend[t].friendId === i.myId && friend[t].myId === i.friendId) {
        return;
      }
    }
    return i.friendId === myId;
  });

  // useEffect(() => {
  //   setBothFriendAll(friend);
  // }, []);
  // console.log(friendAddCome.length);
  const ProfileImgUrl = sessionStorage.getItem("profileimg");
  return (
    <div onContextMenu={(e: any) => e.preventDefault()}>
      <SideBarDiv>
        {/* 프로필 */}
        <Profilebutton onClick={() => LayoutButtonOnClick("profile")}>
          {/* 로그인이 되어있지않다면과 로그인이 되어있다면의 정보*/}
          {ProfileImgUrl === null ? (
            <div>profile</div>
          ) : (
            <ProfileImg src={`${ProfileImgUrl}`} />
          )}
        </Profilebutton>
        {/* 홈 */}
        <Homebutton
          locationName={locationName}
          onClick={() => {
            FriendButtonOnClick("close");
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <AiFillHome className="homeIcon" />
          <p>홈</p>
        </Homebutton>
        {/* 게임검색 */}
        <GameSearchbutton
          locationName={locationName}
          onClick={() => {
            FriendButtonOnClick("close");
            navigate("/Channelsearchpage");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <AiOutlineSearch className="searchIcon" />
          <p>게임검색</p>
        </GameSearchbutton>
        {/* 메뉴 구분선 */}
        <SideLine />
        {/* 친구 */}
        {myId === null ? (
          <Friendbutton
            onClick={() => {
              alert("로그인 후 사용 가능 합니다.");
              FriendButtonOnClick("profile");
            }}
            layoutMenu={layoutMenu}
          >
            <FaUserFriends className="friendIcon" />
            <p>친구</p>
          </Friendbutton>
        ) : (
          <Friendbutton
            onClick={() => {
              //맨위로 스크롤이동
              // window.scrollTo({ top: 0, behavior: "smooth" });
              FriendButtonOnClick("friend");
            }}
            layoutMenu={layoutMenu}
          >
            <FaUserFriends className="friendIcon" />
            <p>친구</p>
            {friendAddCome.length === 0 ? "" : <FriendNotice />}
          </Friendbutton>
        )}
        {/* 음성채팅 */}
        {myId === null ? (
          <VoiceTalkbutton
            onClick={() => {
              alert("로그인 후 사용 가능 합니다.");
              LayoutButtonOnClick("profile");
            }}
            layoutMenu={layoutMenu}
          >
            <MdVoiceChat className="chatIcon" />
            <p>음성채팅</p>
          </VoiceTalkbutton>
        ) : (
          <VoiceTalkbutton
            onClick={() => LayoutButtonOnClick("voicetalk")}
            layoutMenu={layoutMenu}
          >
            <MdVoiceChat className="chatIcon" />
            <p>음성채팅</p>
          </VoiceTalkbutton>
        )}
        {/* 소개페이지 */}
        <AboutPagesDiv onClick={AboutPagesOnClick}>?</AboutPagesDiv>
        <AboutPages />
      </SideBarDiv>
      {/* 메뉴 컴포넌트 */}
      <MenuOpenDiv layoutMenu={layoutMenu}>
        <Profile />
        <GameSearch />
        <Friend />
        <FriendSearch />
        <VoiceTalk />
        <FriendAdd />
      </MenuOpenDiv>
    </div>
  );
}

export default Layout;
const Profileimg = styled.div``;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const SideBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 100%;
  position: fixed;
  left: 0;
  background: #080c16;
  z-index: 999999;
`;

const MenuOpenDiv = styled.div<{ layoutMenu: String }>`
  width: 400px;
  height: 100%;
  background: #263245;
  position: fixed;
  left: ${(props) => (props.layoutMenu === "close" ? "-480px" : "80px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  z-index: 99999;
  box-shadow: 2px 4px 15px 0 #000;

  /* border-top-right-radius: 30px; */
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Profilebutton = styled.div`
  margin: 20px auto 0;
  border-radius: 25px;
  font-size: 12px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  height: 50px;
  background: #ccc;
  cursor: pointer;
`;

const Homebutton = styled.div<{ locationName: String }>`
  margin: 80px auto 0;
  font-size: 13px;
  text-align: center;
  /* height: 50px; */
  /* background: #ccc; */
  color: ${(props) => (props.locationName === "/" ? "#00B8C8" : "#777d87")};
  cursor: pointer;
  .homeIcon {
    font-size: 30px;
    margin-bottom: 5px;
  }
`;

const GameSearchbutton = styled.div<{ locationName: String }>`
  margin: 24px auto 0;
  font-size: 13px;
  text-align: center;
  color: ${(props) =>
    props.locationName === "/Channelsearchpage" ? "#00B8C8" : "#777d87"};
  cursor: pointer;
  .searchIcon {
    font-size: 30px;
    margin-bottom: 5px;
  }
`;
const SideLine = styled.div`
  margin: 34px auto;
  height: 1px;
  width: 45px;
  background-color: #777d87;
`;

const Friendbutton = styled.div<{ layoutMenu: String }>`
  position: relative;
  margin: 0 auto;
  font-size: 13px;
  text-align: center;
  color: ${(props) =>
    props.layoutMenu === "friend" ||
    props.layoutMenu === "friendsearch" ||
    props.layoutMenu === "friendadd"
      ? "#00B8C8"
      : "#777d87"};
  cursor: pointer;
  .friendIcon {
    font-size: 30px;
    margin-bottom: 5px;
  }
`;

const FriendNotice = styled.div`
  position: absolute;
  bottom: 20px;
  left: 25px;
  width: 10px;
  height: 10px;
  line-height: 14px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
  font-weight: 500;
`;

const VoiceTalkbutton = styled.div<{ layoutMenu: String }>`
  margin: 24px auto;
  font-size: 13px;
  text-align: center;
  color: ${(props) =>
    props.layoutMenu === "voicetalk" ? "#00B8C8" : "#777d87"};
  cursor: pointer;
  .chatIcon {
    font-size: 30px;
    margin-bottom: 5px;
  }
`;
const AboutPagesDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 27px;
  border: 1px solid #777d87;
  color: #777d87;
  margin-top: auto;
  margin-bottom: 30px;
  cursor: pointer;
`;
// json에 친구서버에 id, nickname, 프로필이미지
// 내 id 상대방 id
// ( 친구 추가기능 )
// {myId:123, friend: 777} 이게 한방향으로만 있으면 친구 요청 / 상대방입장에선 친구 수락 대기 / 거절 혹은 취소 누르면 삭제
// {myId:777, friend: 123}
// 위에 두개가 다있으면 친구내역으로.
// 양방향으로 있으면
// 추가기능 (친구)

//친구 검색은 앤터눌렀을때 그 input에 있는대로 필터가 돌아감

//방생성할때 클릭하면 height를 0으로 해놨다가 염

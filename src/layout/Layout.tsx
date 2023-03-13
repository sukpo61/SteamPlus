import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LayoutButton,
  getFriend,
  friendAllState,
  newFriendAdd,
  BothFriend,
  videoDisplayRecoil,
  AllStreamsRecoil,
  videoRoomExitRecoil,
  AboutPagesState,
  friendChat,
  friendChatNotice,
  currentRoomRecoil,
  currentGameIdRecoil,
  userAllSocketId,
  loginModalOpenRecoil,
  localStreamRecoil,
  videoStateRecoil,
  micStateRecoil,
  isAllMutedRecoil,
} from "../recoil/atom";
import Profile from "./layoutcomponents/Profile";
import GameSearch from "./layoutcomponents/GameSearch";
import Friend from "./layoutcomponents/Friend";
import FriendSearch from "./layoutcomponents/FriendSearch";
import VoiceTalk from "./layoutcomponents/VoiceTalk";
import EmptyVoiceTalk from "./layoutcomponents/EmptyVoiceTalk";
import FriendAdd from "./layoutcomponents/FriendAdd";
import UserVideo from "./layoutcomponents/UserVideo";
import { useQuery } from "react-query";
import axios from "axios";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

import { AiFillHome } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdVoiceChat } from "react-icons/md";
import { MdVideocamOff, MdVideocam } from "react-icons/md";
import { MdExitToApp, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import LoginModal from "./LoginModal";

import socket from "../socket";
import AboutPages from "./layoutcomponents/AboutPages";

function Layout() {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

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
  //개인 채팅 알림
  const [chatTextNotice, setChatTextNotice] =
    useRecoilState<any>(friendChatNotice);

  const [videoDisplay, setvideoDisplay] = useRecoilState(videoDisplayRecoil);

  const [AllStreams, setAllStreams] = useRecoilState(AllStreamsRecoil);

  const [videoRoomExit, setVideoRoomExit] = useRecoilState(videoRoomExitRecoil);

  const [loginModalOpen, setLoginModalOpen] =
    useRecoilState<boolean>(loginModalOpenRecoil); // 로그인 모달

  const [currentRoom, setCurrentRoom] = useRecoilState(currentRoomRecoil);

  const [channelId, setchannelId] = useRecoilState(currentGameIdRecoil);
  //소켓id
  const [userId, setUserId] = useRecoilState<any>(userAllSocketId);

  const [localStream, setLocalStream] = useRecoilState(localStreamRecoil);

  const [videostate, setVideoState] = useRecoilState(videoStateRecoil);

  const [micstate, setMicState] = useRecoilState(micStateRecoil);

  const [isallmuted, setIsAllMuted] = useRecoilState(isAllMutedRecoil);

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
    const response = await axios.get(`${DATABASE_ID}/auth`);
    setFriendAllRecoil(response?.data);
    return response;
  };
  const { data: friendSearch } = useQuery(["friendsearch"], getFriendSearch);

  const getAllFriend = async () => {
    //비동기함수는 최대한 동기적으로 활용가능하게
    const response = await axios.get(`${DATABASE_ID}/friend`);
    setGetFriendAuth(response?.data);

    return response;
  };
  const { isLoading, isError, data, error } = useQuery(
    ["friend"],
    getAllFriend
  );
  const ProfileImgUrls = sessionStorage.getItem("profileimg");
  if (isLoading) {
    return (
      <SideBarDiv>
        {/* 프로필 */}
        <Profilebutton>
          {ProfileImgUrls === null ? (
            <div>Login</div>
          ) : (
            <ProfileImg src={`${ProfileImgUrls}`} />
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
        {/* 커뮤니티 */}
        <Communitybutton
          locationName={locationName}
          onClick={() => {
            FriendButtonOnClick("close");
            navigate("Community");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <MdDynamicFeed className="communityIcon" />
          <p>커뮤니티</p>
        </Communitybutton>
        {/* 메뉴 구분선 */}
        <SideLine />
        {/* 친구 */}
        {myId === null ? (
          <Friendbutton
            onClick={() => {
              // FriendButtonOnClick("profile");
              handleLoginModalOpen(); // 로그인 모달
            }}
            layoutMenu={layoutMenu}
          >
            <FaUserFriends className="friendIcon" />
            <p>친구</p>
          </Friendbutton>
        ) : (
          <Friendbutton
            onClick={() => {
              FriendButtonOnClick("friend");
            }}
            layoutMenu={layoutMenu}
          >
            <FaUserFriends className="friendIcon" />
            <p>친구</p>
          </Friendbutton>
        )}
        {/* 음성채팅 */}
        {myId === null ? (
          <VoiceTalkbutton
            onClick={() => {
              handleLoginModalOpen(); // 로그인 모달
            }}
            layoutMenu={layoutMenu}
          >
            <MdVoiceChat className="chatIcon" />
            <p>화상채팅</p>
          </VoiceTalkbutton>
        ) : (
          <VoiceTalkbuttonWrap>
            {currentRoom && <VoiceTalkON></VoiceTalkON>}
            <VoiceTalkbutton
              onClick={() => LayoutButtonOnClick("voicetalk")}
              layoutMenu={layoutMenu}
            >
              <MdVoiceChat className="chatIcon" />
              <p>화상채팅</p>
            </VoiceTalkbutton>
          </VoiceTalkbuttonWrap>
        )}
      </SideBarDiv>
    );
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

  const ProfileImgUrl = sessionStorage.getItem("profileimg");

  const StreamList = AllStreams.map((data: any) => {
    const info = friendAllRecoil.find((e) => e.id === data.userid);

    const remotehandleVideoRef = (video: any) => {
      if (video) {
        video.srcObject = data.stream;
      }
    };

    return <UserVideo data={data} info={info} myId={myId}></UserVideo>;
  });

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  // useEffect(() => {}, [micstate]);

  if (isLoading) {
    return <p>로딩중</p>;
  }
  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }
  return (
    <>
      <LoginModalPosition>
        {/* 로그인 모달 */}
        {loginModalOpen && (
          <LoginModal
            setLoginModalOpen={setLoginModalOpen}
            layoutMenu={layoutMenu}
          />
        )}
      </LoginModalPosition>

      <div onContextMenu={(e: any) => e.preventDefault()}>
        <SideBarDiv>
          {/* 프로필 */}
          <Profilebutton
            onClick={() => {
              ProfileImgUrl === null
                ? handleLoginModalOpen()
                : LayoutButtonOnClick("profile");
            }}
          >
            {/* 로그인이 되어있지않다면과 로그인이 되어있다면의 정보*/}
            {ProfileImgUrl === null ? (
              <div>Login</div>
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
          {/* 커뮤니티 */}
          <Communitybutton
            locationName={locationName}
            onClick={() => {
              FriendButtonOnClick("close");
              navigate("Community");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <MdDynamicFeed className="communityIcon" />
            <p>커뮤니티</p>
          </Communitybutton>
          {/* 메뉴 구분선 */}
          <SideLine />
          {/* 친구 */}
          {/* {myId === null ? (
            <Friendbutton
              onClick={() => {
                // FriendButtonOnClick("profile");
                handleLoginModalOpen(); // 로그인 모달
              }}
              layoutMenu={layoutMenu}
            >
              <FaUserFriends className="friendIcon" />
              <p>친구</p>
            </Friendbutton>
          ) : ( */}
          <Friendbutton
            onClick={() => {
              //맨위로 스크롤이동
              // window.scrollTo({ top: 0, behavior: "smooth" });
              if (myId === null) {
                handleLoginModalOpen();
              } else {
                FriendButtonOnClick("friend");
              }
            }}
            layoutMenu={layoutMenu}
          >
            <FaUserFriends className="friendIcon" />
            <p>친구</p>
            {friendAddCome.length === 0 && chatTextNotice.length === 0 ? (
              ""
            ) : (
              <FriendNotice />
            )}
          </Friendbutton>
          {/* )} */}
          {/* 음성채팅 */}
          <VoiceTalkbuttonWrap>
            {currentRoom && <VoiceTalkON></VoiceTalkON>}
            <VoiceTalkbutton
              onClick={() => {
                if (myId === null) {
                  handleLoginModalOpen();
                } else {
                  LayoutButtonOnClick("voicetalk");
                }
              }}
              layoutMenu={layoutMenu}
            >
              <MdVoiceChat className="chatIcon" />
              <p>화상채팅</p>
            </VoiceTalkbutton>
          </VoiceTalkbuttonWrap>
          {/* 나중에 부활 예정 */}
          <AboutPagesDiv onClick={AboutPagesOnClick}>?</AboutPagesDiv>
        </SideBarDiv>

        {/* 메뉴 컴포넌트 */}
        <MenuOpenDiv layoutMenu={layoutMenu}>
          <Profile />
          <GameSearch />
          <Friend />
          <FriendSearch />
          <VoiceTalk myId={myId} handleLoginModalOpen={handleLoginModalOpen} />
          <FriendAdd />
          <AboutPages />
        </MenuOpenDiv>

        <VideosWrap
          currentRoom={currentRoom}
          toggle={videoDisplay}
          widthprop={layoutMenu}
          layout={layoutMenu}
        >
          <VideoPosition>
            <VideosList>{StreamList}</VideosList>
            <VideoControl>
              <ControlButtons>
                <ControlButtonWrap
                  videostate={videostate}
                  backcolor="#D4D4D4"
                  onClick={() => {
                    setVideoState((e: any) => !e);
                    if (localStream) {
                      localStream.getVideoTracks().forEach((track: any) => {
                        track.enabled = !videostate;
                      });
                    }
                  }}
                >
                  {videostate ? (
                    <MdVideocam size={24} />
                  ) : (
                    <MdVideocamOff size={24} />
                  )}
                </ControlButtonWrap>

                <ControlButtonWrap
                  iconcolor="white"
                  backcolor="#F05656"
                  onClick={() => {
                    setVideoRoomExit((e: any) => !e);
                  }}
                >
                  <MdExitToApp size={24}></MdExitToApp>
                </ControlButtonWrap>
                <ControlButtonWrap
                  iconcolor="#192030"
                  backcolor="#D4D4D4"
                  onClick={() => {
                    setvideoDisplay(false);
                  }}
                >
                  <MdOutlineKeyboardArrowUp
                    size={24}
                  ></MdOutlineKeyboardArrowUp>
                </ControlButtonWrap>
              </ControlButtons>
            </VideoControl>
          </VideoPosition>
        </VideosWrap>
      </div>
    </>
  );
}

export default Layout;

const LoginModalPosition = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* position: absolute; */
  width: 100%;
  height: 100%;
`;

const Profileimg = styled.div``;

const VideosWrap = styled.div<any>`
  //나중에 생각하자.
  top: ${(props) => {
    if (props.currentRoom) {
      if (props.toggle) {
        if (props.layout === "voicetalk") {
          return "70px";
        } else {
          return "-70%";
        }
      } else {
        return "-70%";
      }
    }
    if (props.layout !== "voicetalk") {
      return "-70%";
    }

    return "-70%";
  }};
  transition: all 0.5s;
  right: 0;
  width: ${(props) =>
    props.widthprop === "close" ? "calc(100% - 80px)" : "calc(100% - 480px)"};
  height: 480px;
  position: fixed;
  display: flex;
  flex-direction: column;
  color: white;
  background: #131a28;
  z-index: 9;
  justify-content: center;
  align-items: center;
`;

const Streamvideo = styled.video<any>`
  border-radius: 10px;
  width: 90%;
  height: 100%;
`;
const EmptyStreamvideo = styled.div`
  background-color: #9fafc9;
  width: 640px;
  height: 480px;
  @media screen and (max-width: 1900px) {
    width: 90%;
    min-width: 100px;
  }
`;
const Emptyvideo = styled.div`
  background-color: #9fafc9;
  border-radius: 10px;
  width: 576px;
  height: 432px;
  /* border-radius: 10px;
  width: 100%;
  max-width: 640px;
  height: 100%;
  max-height: 480px; */
`;

const EmptyVideoWrap = styled.div<any>`
  width: 100%;
  height: 100%;
  background-color: #9fafc9;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const VideoWrap = styled.div<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    height: 100%;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 24px;
`;
const ControlButtonWrap = styled.div<any>`
  cursor: pointer;
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backcolor};
  color: ${(props) => {
    if (props.iconcolor) {
      return props.iconcolor;
    }
    if (props.videostate) {
      return "#192030";
    } else {
      return "#F05656";
    }
  }};
`;
const Usernickname = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: rgba(8, 12, 22, 0.6);
  border-radius: 8px;
  padding: 4px 8px;
  bottom: 8px;
  left: 8%;
`;
const Micoff = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(8, 12, 22, 0.6);
  border-radius: 15px;
  width: 30px;
  height: 30px;
  bottom: 8px;
  right: 8%;
`;
const VideoPosition = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`;
const VideoControl = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  bottom: 0;
  background: linear-gradient(180deg, rgba(25, 32, 48, 0) 0%, #000000 200%);
  gap: 12px;
  opacity: 0;
  transition: all 0.3s;
  img {
    cursor: pointer;
  }
  &:hover {
    opacity: 100;
  }
`;

const VideosList = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
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
  overflow: ${(props) =>
    props.layoutMenu === "voicetalk" ? "hidden" : "scroll"};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Profilebutton = styled.div`
  margin: 20px auto 0;
  border-radius: 25px;
  font-size: 12px;
  width: 50px;
  height: 50px;
  min-height: 50px;
  overflow: hidden;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: 500;
  background: linear-gradient(
    65.45deg,
    #002176 13.13%,
    #002fa8 30.2%,
    #0076b9 52.4%,
    #00b4c7 74.45%,
    #12f8d8 86.79%
  );
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
const Communitybutton = styled.div<{ locationName: String }>`
  margin: 24px auto 0;
  font-size: 13px;
  text-align: center;
  color: ${(props) =>
    props.locationName === "/Community" ? "#00B8C8" : "#777d87"};
  cursor: pointer;
  .communityIcon {
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
  bottom: 19px;
  left: 25px;
  width: 10px;
  height: 10px;
  line-height: 14px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  border-radius: 50%;
  background-color: #f05656;
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
const VoiceTalkbuttonWrap = styled.div`
  position: relative;
`;
const VoiceTalkON = styled.div`
  width: 10px;
  height: 10px;
  right: 4px;
  bottom: 48px;
  border-radius: 4px;
  background: #f05656;
  position: absolute;
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

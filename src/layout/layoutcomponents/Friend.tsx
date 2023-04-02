import React, { useEffect, useRef } from "react";
import {
  LayoutButton,
  getFriend,
  friendAllState,
  newFriendAdd,
  friendChat,
  friendChatNotice,
  userAllSocketId,
} from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import FriendTab from "./FriendTab";
import FriendContextMenu from "./FriendContextMenu";
import { FriendSearchProps } from "./FriendSearch";
import socket from "../../socket";
import { resolve } from "path";
import { useLocation, useNavigate } from "react-router-dom";
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export interface FriendProps {
  id: any;
  myId: string;
  friendId: string;
  myNickName: string;
  friendNickName: string;
  myProfileimg: string;
  friendProfileimg: string;
}

function Friend() {
  const PROXY_ID: any = process.env.REACT_APP_PROXY_ID;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  // //화면 기준 x,y좌표
  // const element = document.getElementById("my-element");
  // const rect = element?.getBoundingClientRect();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  //친구 내역 전체 불러오기
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);
  //우클릭한 친구 id 가져오기
  const [clickedId, setClickedId] = useState<string>("");
  //친구 우클릭
  const [menuPosition, setMenuPosition] = useState<{
    xPos: string;
    yPos: string;
  }>({
    xPos: "-1000px",
    yPos: "-1000px",
  });

  const [friendChannel, setFriendChannel] = useState<any>(new Map());

  const myId: any = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };
  //개인 채팅 알림
  const [chatText, setChatText] = useRecoilState<any>(friendChat);
  //개인 채팅 알림
  const [chatTextNotice, setChatTextNotice] =
    useRecoilState<any>(friendChatNotice);
  //소켓id
  const [userId, setUserId] = useRecoilState<any>(userAllSocketId);

  //양쪽 다 친구 내역
  const allFriendList = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friendAdd.length; t++) {
      if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId &&
        frendSearchInput === ""
      ) {
        return i.myId === myId;
      } else if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        const lowercaseNickname = i.friendNickName.toLowerCase();
        const lowercaseSearchInput = frendSearchInput.toLowerCase();
        return (
          i.myId === myId && lowercaseNickname.includes(lowercaseSearchInput)
        );
      }
    }
  });

  //자동업데이트 되는 친구 계정 바로 가져오기
  const friend = friendAllRecoil.filter((i: FriendSearchProps) => {
    for (let t = 0; t < allFriendList.length; t++) {
      if (allFriendList[t].friendId === i.id) {
        return true;
      }
    }
    return false;
  });

  // //친구 우클릭
  const handleContextMenu = (event: any, i: string) => {
    event.preventDefault();
    setClickedId(i);
    setMenuPosition({
      xPos: `${event.clientX}px`,
      yPos: `${event.clientY}px`,
    });
  };

  const Gamedata = async (frienduserid: any, gameid: any) => {
    const response = await axios.get(
      `${PROXY_ID}/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: gameid, // 해당 게임의 id값'
        },
      }
    );
    setFriendChannel((e: any) =>
      e.set(frienduserid, `${response?.data[gameid].data.name} 참가중`)
    );
  };

  const handleCloseContextMenu = () => {
    setMenuPosition({ xPos: "-1000px", yPos: "-1000px" });
  };

  const getFriendChannel: any = async (userid: any) => {
    socket.emit("friendchannel", userid);
    socket.once("friendchannel", (roomname, frienduserid) => {
      if (frienduserid === userid && roomname) {
        Gamedata(frienduserid, roomname.split("/")[0]);
      }
    });
  };

  useEffect(() => {
    const handleWindowClick = () => {
      handleCloseContextMenu();
    };

    if (menuPosition.xPos !== "-1000px" && menuPosition.yPos !== "-1000px") {
      //클릭하면 추가
      window.addEventListener("click", handleWindowClick);
    } else {
      //클릭하면 이벤트 삭제
      window.removeEventListener("click", handleWindowClick);
    }
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [menuPosition]);

  //친구 온라인 상태확인
  const isFriendOnline = (lastLogin: string): boolean => {
    const TEN_MINUTES = 60 * 1000; //1분
    const date = new Date();
    const lastLoginDate = new Date(lastLogin);
    const diffInMs = date.getTime() - lastLoginDate.getTime();
    const diffInSec = Math.round(diffInMs / 1000);
    return diffInSec < TEN_MINUTES / 1000;
  };

  useEffect(() => {
    socket.emit("nickName", myId, socket.id);
  }, [socket.id]);

  socket.on("userId", (id) => {
    // console.log(id);
    setUserId(id);
  });

  useEffect(() => {
    setCurrentLocation(location.pathname.split(":")[1]);
  }, [location]);

  //지워도 될지도
  useEffect(() => {
    socket.on("friendNew_message", (newChat) => {
      console.log("accept");
      setChatText((i: any) => [...i, newChat]);

      if (window.location.href.split(":")[2] == newChat.roomId) {
        return;
      } else {
        return setChatTextNotice((i: any) => [...i, newChat]);
      }
    });
  }, []);

  const friendChatOnClick = (id: any, login: any, lastLogin: any) => {
    if (menuPosition.xPos === "-1000px") {
      if (login && isFriendOnline(lastLogin)) {
        //선택한 아이디 불러오기
        const clickId = userId.find((i: any) => {
          return i.split("/")[0] === id;
        });
        //선택한 아이디와 내아이디 더하기 (방이름)
        const roomName = parseInt(clickId?.split("/")[0]) + parseInt(myId);
        console.log(roomName);
        console.log("joined");
        socket.emit("friendChat", clickId, roomName);
        navigate(`/testchat/:${roomName}`, { state: clickId.split("/")[0] });

        const chatNoticeClear = chatTextNotice.filter((i: any) => {
          if (i.id === id) {
            return false;
          } else {
            return i;
          }
        });
        setChatTextNotice(chatNoticeClear);
        setLayoutMenu("close");
      } else {
        alert("상대가 접속중이 아닙니다.");
      }
    } else {
      return;
    }
  };
  return (
    <FriendDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />
        <MenuTitleIform>
          <MenuTitleInput
            onChange={frendSearchOnChange}
            placeholder={"친구 검색"}
          ></MenuTitleInput>
        </MenuTitleIform>
        <MenuTitleh2>친구 {friend.length}명</MenuTitleh2>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friend?.map((i: FriendSearchProps) => {
        getFriendChannel(i.id);
        return (
          <FriendBoxDiv
            key={i.id}
            onClick={() => friendChatOnClick(i.id, i.login, i.lastLogin)}
            onContextMenu={(event) => handleContextMenu(event, i.id)}
          >
            <FriendContextMenu
              xPos={menuPosition.xPos}
              yPos={menuPosition.yPos}
              onClose={handleCloseContextMenu}
              id={clickedId}
            />

            <FriendBoxNameDiv>
              <FriendBoxNameImgDiv>
                <FriendBoxNameImg src={i.profileimg} />

                {/* 온라인표시 */}
                {i.login && isFriendOnline(i.lastLogin) ? (
                  <FriendBoxNameOnline />
                ) : (
                  <FriendBoxNameOffline />
                )}
              </FriendBoxNameImgDiv>

              <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

              <FriendBoxNamePlayingP>
                {friendChannel.get(i.id)}
              </FriendBoxNamePlayingP>
              {chatTextNotice.filter((item: any) => {
                return item.id === i.id;
              }).length === 0 ? (
                ""
              ) : (
                <FriendBoxNotice>
                  {chatTextNotice.filter((item: any) => {
                    return item.id === i.id;
                  }).length > 100
                    ? "99+"
                    : chatTextNotice.filter((item: any) => {
                        return item.id === i.id;
                      }).length}
                </FriendBoxNotice>
              )}
            </FriendBoxNameDiv>
          </FriendBoxDiv>
        );
      })}
    </FriendDiv>
  );
}

export default Friend;
const FriendDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "friend" ? "block" : "none")};
  margin-top: 160px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 160px;
  background-color: #263245;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 30px;
  z-index: 99999999999;
`;
const MenuTitleIform = styled.form`
  position: relative;
  margin: 0 auto;
`;

const MenuTitleh2 = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  margin-left: 24px;
  margin-top: 12px;
`;
const MenuTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  margin: 20px auto 0px auto;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
  color: #fff;
  text-indent: 10px;
`;

const FriendBoxDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  //수정
  height: 60px;
  background-color: #263245;
  cursor: pointer;
`;
const FriendBoxNameDiv = styled.div`
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #192030;
  }
`;
const FriendBoxNameImgDiv = styled.div`
  position: relative;
`;
const FriendBoxNameImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const FriendBoxNameOnline = styled.div`
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-color: #23de79;
  border-radius: 50%;
  border: 1px solid #777d87;
`;
const FriendBoxNameOffline = styled.div`
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-color: #404b5e;
  border-radius: 50%;
  border: 1px solid #777d87;
`;
const FriendBoxNameH2 = styled.h2`
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
`;
const FriendBoxNamePlayingP = styled.p`
  font-size: 10px;
  color: #a7a9ac;
`;
const FriendBoxNotice = styled.div`
  width: 18px;
  height: 13px;
  line-height: 13px;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  background-color: #f05656;
  border-radius: 8px;
  margin-left: auto;
`;

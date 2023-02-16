import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LayoutButton,
  getFriend,
  friendAllState,
  newFriendAdd,
  BothFriend,
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

function Layout() {
  const myId = 1;
  //레이아웃 종류
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  // //친구 알림 내역
  // const [FriendNoticeLength, setFriendNoticeLength] =
  //   useRecoilState<any>(FriendNoticeAll);
  // // console.log(FriendNoticeLength);

  const [bothFriendAll, setBothFriendAll] = useRecoilState(BothFriend);
  console.log(bothFriendAll);

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

  // if (isLoading) {
  //   return <p>로딩중</p>;
  // }
  // if (isError) {
  //   console.log("오류내용", error);
  //   return <p>오류</p>;
  // }

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

  return (
    <div onContextMenu={(e: any) => e.preventDefault()}>
      <SideBarDiv>
        {/* 프로필 */}
        <Profilebutton onClick={() => LayoutButtonOnClick("profile")}>
          Profile
        </Profilebutton>
        {/* 홈 */}
        <Homebutton>Home</Homebutton>
        {/* 게임검색 */}
        <GameSearchbutton onClick={() => LayoutButtonOnClick("gamesearch")}>
          gamesearch
        </GameSearchbutton>
        {/* 친구 */}
        <Friendbutton onClick={() => FriendButtonOnClick("friend")}>
          friend
          {friendAddCome.length === 0 ? (
            ""
          ) : (
            <FriendNotice>{friendAddCome.length}</FriendNotice>
          )}
        </Friendbutton>
        {/* 음성채팅 */}
        <VoiceTalkbutton onClick={() => LayoutButtonOnClick("voicetalk")}>
          voicetalk
        </VoiceTalkbutton>
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
const SideBarDiv = styled.div`
  width: 80px;
  height: 100%;
  position: fixed;
  background: #080c16;
  z-index: 9999;
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
  border-top-right-radius: 30px;
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

const Homebutton = styled.div`
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

const GameSearchbutton = styled.div`
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

const Friendbutton = styled.div`
  margin: 20px auto 0;
  border-radius: 25px;
  font-size: 12px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  height: 50px;
  background: #ccc;
  cursor: pointer;
  position: relative;
`;

const FriendNotice = styled.div`
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  line-height: 15px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
  font-weight: 500;
`;

const VoiceTalkbutton = styled.div`
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

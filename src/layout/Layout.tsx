import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { profilebutton } from "../recoil/atom";
import { gamesearchbutton } from "../recoil/atom";
import { friendbutton } from "../recoil/atom";
import { friendsearchbutton } from "../recoil/atom";
import { voicetalkbutton } from "../recoil/atom";
import Profile from "./layoutcomponents/Profile";
import GameSearch from "./layoutcomponents/GameSearch";
import Friend from "./layoutcomponents/Friend";
import FriendSearch from "./layoutcomponents/FriendSearch";
import VoiceTalk from "./layoutcomponents/VoiceTalk";

function Layout() {
  //프로필
  const [profileBoolean, setProfilerBoolean] = useRecoilState(profilebutton);
  //게임검색
  const [gameSearchBoolean, setGameSearchBoolean] =
    useRecoilState(gamesearchbutton);
  //친구
  const [friendBoolean, setFriendBoolean] = useRecoilState(friendbutton);
  //친구추가
  const [friendSearchBoolean, setFriendSearchBoolean] =
    useRecoilState(friendsearchbutton);
  //음성채팅
  const [voiceTalkBoolean, setVoiceTalkBoolean] =
    useRecoilState(voicetalkbutton);

  //프로필 클릭
  const profileOnClick = () => {
    if (
      gameSearchBoolean === true ||
      friendBoolean === true ||
      friendSearchBoolean === true ||
      voiceTalkBoolean === true
    ) {
      setGameSearchBoolean(false);
      setFriendBoolean(false);
      setFriendSearchBoolean(false);
      setVoiceTalkBoolean(false);

      setProfilerBoolean(true);
    } else {
      setProfilerBoolean(!profileBoolean);
    }
  };

  //게임검색 클릭
  const gameSearchOnClick = () => {
    if (
      profileBoolean === true ||
      friendBoolean === true ||
      friendSearchBoolean === true ||
      voiceTalkBoolean === true
    ) {
      setProfilerBoolean(false);
      setFriendBoolean(false);
      setFriendSearchBoolean(false);
      setVoiceTalkBoolean(false);

      setGameSearchBoolean(true);
    } else {
      setGameSearchBoolean(!gameSearchBoolean);
    }
  };

  //친구 클릭
  const friendOnClick = () => {
    if (
      profileBoolean === true ||
      gameSearchBoolean === true ||
      friendSearchBoolean === true ||
      voiceTalkBoolean === true
    ) {
      setProfilerBoolean(false);
      setGameSearchBoolean(false);
      setFriendSearchBoolean(false);
      setVoiceTalkBoolean(false);

      setFriendBoolean(true);
    } else {
      setFriendBoolean(!friendBoolean);
    }
  };

  //친구검색 클릭
  const friendSearchOnClick = () => {
    if (
      profileBoolean === true ||
      gameSearchBoolean === true ||
      friendBoolean === true ||
      voiceTalkBoolean === true
    ) {
      setProfilerBoolean(false);
      setGameSearchBoolean(false);
      setFriendBoolean(false);
      setVoiceTalkBoolean(false);

      setFriendSearchBoolean(true);
    } else {
      setFriendSearchBoolean(!friendSearchBoolean);
    }
  };

  //보이스톡 클릭
  const VoiceTalkOnClick = () => {
    if (
      profileBoolean === true ||
      gameSearchBoolean === true ||
      friendBoolean === true ||
      friendSearchBoolean === true
    ) {
      setProfilerBoolean(false);
      setGameSearchBoolean(false);
      setFriendBoolean(false);
      setFriendSearchBoolean(false);

      setVoiceTalkBoolean(true);
    } else {
      setVoiceTalkBoolean(!voiceTalkBoolean);
    }
  };

  return (
    <>
      <SideBarDiv>
        <Profilebutton onClick={profileOnClick}>Profile</Profilebutton>
        <Homebutton>Home</Homebutton>
        <GameSearchbutton onClick={gameSearchOnClick}>
          gamesearch
        </GameSearchbutton>
        <Friendbutton onClick={friendOnClick}>friend</Friendbutton>
        <FriendSearchbutton onClick={friendSearchOnClick}>
          friendsearch
        </FriendSearchbutton>
        <VoiceTalkbutton onClick={VoiceTalkOnClick}>voicetalk</VoiceTalkbutton>
      </SideBarDiv>
      {/* 메뉴 컴포넌트 */}
      <Profile />
      <GameSearch />
      <Friend />
      <FriendSearch />
      <VoiceTalk />
    </>
  );
}

export default Layout;
const SideBarDiv = styled.div`
  width: 100px;
  height: 100%;
  position: fixed;
  background: #080c16;
  z-index: 9999;
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
`;

const FriendSearchbutton = styled.div`
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

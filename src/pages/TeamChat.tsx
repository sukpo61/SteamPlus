import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import Testtext from "./Testtext";
import { useRecoilState } from "recoil";
import { DataChannelMapRecoil } from "../recoil/atom";
import { chatTextRecoil } from "../recoil/atom";
import { useLocation } from "react-router";
import axios from "axios";

const TeamChat = () => {
  const [DataChannelMap, setDataChannelMap] =
    useRecoilState(DataChannelMapRecoil);
  //내 아이디
  const myId = sessionStorage.getItem("steamid");
  //내 닉네임
  const myNickName = sessionStorage.getItem("nickName");
  //내 프로필이미지
  const ProfileImgUrl = sessionStorage.getItem("profileimg");

  const [channelName, setchannelName] = useState<any>("Dead space");

  const [background, setBackground] = useState<any>("");

  // const { state: gameid } = useLocation();

  const gameid = 1693980;

  const Gamedata = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: gameid, // 해당 게임의 id값'
        },
      }
    );
    const gameinfo = {
      gamesdescription: response?.data[gameid].data.short_description,
      gamevideo: response?.data[gameid].data.movies[0].webm.max,
      gametitle: response?.data[gameid].data.name,
      gameCategories: response?.data[gameid].data.genres[0].description,
      gameCategories2:
        response?.data[gameid].data.genres.length < 2
          ? ""
          : response?.data[gameid].data.genres[1].description,
      gameCategories3:
        response?.data[gameid].data.genres.length < 3
          ? ""
          : response?.data[gameid].data.genres[2].description,
      gameMainImg: response?.data[gameid].data.screenshots[1].path_full,
      gameSubimg: response?.data[gameid].data.header_image,
    };

    console.log(response);

    setchannelName(response?.data[gameid].data.name);

    setBackground(response?.data[gameid].data.background);
  };

  //채팅으로 보낼 배열
  const [chatText, setChatText] = useRecoilState<any>(chatTextRecoil);
  //입력 input
  const [textInput, setTextInput] = useState<any>("");
  //입력 input
  const chatInputOnChange = (e: any) => {
    setTextInput(e.target.value);
  };
  //입력 form
  const chatInputOnSubmit = (e: any) => {
    e.preventDefault();
    //빈칸 예외 처리
    if (textInput === "") {
      return;
    }
    //채팅으로 보낼 시간
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const koreanHours = hours % 12 || 12;
    const timeString = `${ampm} ${koreanHours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
    //채팅으로 보낼 객체
    const newChat = {
      id: myId,
      nickName: myNickName,
      profileImg: ProfileImgUrl,
      text: textInput,
      time: timeString,
    };

    const stringnewChat = JSON.stringify(newChat);

    setChatText((i: any) => [...i, newChat]);
    console.log(DataChannelMap);
    DataChannelMap.forEach((channel: any, id: any) => {
      if (channel.readyState === "open") {
        channel.send(stringnewChat);
      }
    });

    setTextInput("");
  };
  //입력시 맨 아래로 스크롤a
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("chatText", chatText);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatText]);

  useEffect(() => {
    console.log("effected");
    socket.emit("requestrooms", channelName);
    Gamedata();
    return () => {
      socket.off("requestrooms");
    };
  }, []);
  return (
    <ChatPageDiv>
      <Background src={background}></Background>
      <ChatPageHeaderDiv>#채팅방_1234</ChatPageHeaderDiv>
      <ChatContentsDiv ref={chatContainerRef}>
        <ChatContentsMarginDiv>
          {chatText.map((chat: any) => {
            return <Testtext chat={chat} />;
          })}
        </ChatContentsMarginDiv>
      </ChatContentsDiv>
      <ChatInputForm onSubmit={chatInputOnSubmit}>
        <ChatInput
          placeholder="#채팅방_1에 보낼 메세지를 입력하세요."
          onChange={chatInputOnChange}
          value={textInput}
        />
      </ChatInputForm>
    </ChatPageDiv>
  );
};
//d
export default TeamChat;

const ChatPageDiv = styled.div`
  height: 100vh;
  position: relative;
`;
const Background = styled.img`
  width: 100%;
  height: 100vh;
  position: absolute;
  object-fit: cover;
  object-position: center;
`;
const ChatPageHeaderDiv = styled.div`
  width: 100%;
  height: 70px;
  line-height: 65px;
  background-color: #404b5e;
  position: absolute;
  top: 0;
  z-index: 9;
  color: #fff;
  padding-left: 20px;
  font-size: 18px;
`;
const ChatContentsDiv = styled.div`
  position: absolute;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: -70px;
  padding-top: 160px;
  left: 50%;
  transform: translateX(-50%);
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ChatContentsMarginDiv = styled.div`
  margin-top: auto;
`;
const ChatInputForm = styled.form`
  position: absolute;
  width: 70%;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  padding-bottom: 30px;
  overflow: hidden;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: #263245;
  border: 0;
  text-indent: 10px;
  color: #fff;
  border-radius: 8px;
`;

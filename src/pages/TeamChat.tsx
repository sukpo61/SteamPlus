import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import Testtext from "./Testtext";
import { useRecoilState } from "recoil";
import {
  DataChannelMapRecoil,
  chatTextRecoil,
  channelNameRecoil,
  currentRoomRecoil,
  currentGameIdRecoil,
  LayoutButton,
} from "../recoil/atom";
import { useLocation } from "react-router";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const TeamChat = () => {
  const [DataChannelMap, setDataChannelMap] =
    useRecoilState(DataChannelMapRecoil);
  //내 아이디
  const myId = sessionStorage.getItem("steamid");
  //내 닉네임
  const myNickName = sessionStorage.getItem("nickName");
  //내 프로필이미지
  const ProfileImgUrl = sessionStorage.getItem("profileimg");

  const [channelName, setchannelName] = useRecoilState<any>(channelNameRecoil);

  const [currentRoom, setCurrentRoom] = useRecoilState(currentRoomRecoil);

  const [channelId, setchannelId] = useRecoilState(currentGameIdRecoil);

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  const [background, setBackground] = useState<any>("");

  const { state: gameinfo } = useLocation();

  const gameid = gameinfo?.gameid;

  const Gamedata = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: gameid, // 해당 게임의 id값'
        },
      }
    );

    setchannelId(gameid);

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
      type: "message",
    };

    const stringnewChat = JSON.stringify(newChat);

    setChatText((i: any) => [...i, newChat]);

    DataChannelMap.forEach((channel: any, id: any) => {
      if (channel.readyState === "open") {
        channel.send(stringnewChat);
      }
    });

    setTextInput("");
  };
  //입력시 맨 아래로 스크롤aas
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatText]);

  useEffect(() => {
    if (channelId) {
      socket.emit("requestrooms", channelId);
    }
    return () => {
      socket.off("requestrooms");
    };
  }, [channelId]);

  useEffect(() => {
    Gamedata();
    Aos.init();
    setLayoutMenu("voicetalk");
  }, []);

  return (
    <ChatPageDiv>
      <Background src={background}></Background>
      <ChatPageHeaderDiv>{currentRoom}</ChatPageHeaderDiv>
      <ChatContentsDiv ref={chatContainerRef}>
        <ChatContentsMarginDiv>
          {chatText.map((chat: any) => {
            if (chat.type === "alarm") {
              return <Testtext chat={chat} />;
            } else if (chat.id === myId) {
              return (
                <div data-aos="fade-left">
                  <Testtext chat={chat} />
                </div>
              );
            } else {
              return (
                <div data-aos="fade-right">
                  <Testtext chat={chat} />
                </div>
              );
            }
          })}
        </ChatContentsMarginDiv>
      </ChatContentsDiv>
      <ChatInputForm onSubmit={chatInputOnSubmit} toggle={currentRoom}>
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
  overflow: hidden;
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
const ChatInputForm = styled.form<any>`
  position: absolute;
  width: 70%;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s;
  bottom: ${(props) => (props.toggle ? "0" : "-80px")};
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

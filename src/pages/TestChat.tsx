import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Testtext from "./Testtext";

function TestChat() {
  //내 아이디
  const myId = sessionStorage.getItem("steamid");
  //내 닉네임
  const myNickName = sessionStorage.getItem("nickName");
  //내 프로필이미지
  const ProfileImgUrl = sessionStorage.getItem("profileimg");

  //채팅으로 보낼 배열
  const [chatText, setChatText] = useState<any>([]);
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
    setTextInput("");
  };
  //입력시 맨 아래로 스크롤
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatText]);
  return (
    <ChatPageDiv>
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
}

export default TestChat;
const ChatPageDiv = styled.div`
  height: 100vh;
  position: relative;
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

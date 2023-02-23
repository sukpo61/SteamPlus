import React from "react";
import styled from "styled-components";

function Testtext({ chat }: any) {
  //아이디가 내아이디와 같으면 왼쪽 아니면 오른쪽
  //세션 아이디
  const myId = sessionStorage.getItem("steamid");

  return (
    <ChatDiv id={chat.id} myId={myId}>
      <ChatImg src={chat.profileImg}></ChatImg>
      <ChatBoxDiv>
        <ChatBoxNameH2 id={chat.id} myId={myId}>
          {chat.nickName}
        </ChatBoxNameH2>
        <ChatBoxTextDiv id={chat.id} myId={myId}>
          <ChatBoxTextP id={chat.id} myId={myId}>
            {chat.text}
          </ChatBoxTextP>
          <ChatBoxTextDateP>{chat.time}</ChatBoxTextDateP>
        </ChatBoxTextDiv>
      </ChatBoxDiv>
    </ChatDiv>
  );
}

export default Testtext;

const ChatDiv = styled.div<{ id: any; myId: any }>`
  margin-bottom: 30px;
  display: flex;
  flex-direction: ${(props) => (props.id !== props.myId ? "" : "row-reverse")};
`;
const ChatImg = styled.img`
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
`;
const ChatBoxDiv = styled.div`
  margin: 0 15px;
`;
const ChatBoxNameH2 = styled.h2<{ id: any; myId: any }>`
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
  text-align: ${(props) => (props.id !== props.myId ? "left" : "right")};
`;
const ChatBoxTextDiv = styled.div<{ id: any; myId: any }>`
  display: flex;
  flex-direction: ${(props) =>
    props.id !== props.myId ? "row" : "row-reverse"};
`;
const ChatBoxTextP = styled.p<{ id: any; myId: any }>`
  background-color: #ccc;
  max-width: 500px;
  padding: 10px 15px;
  border-radius: 10px;
  border-top-left-radius: ${(props) =>
    props.id !== props.myId ? "0" : "10px"};
  border-top-right-radius: ${(props) =>
    props.id !== props.myId ? "10px" : "0"};
`;
const ChatBoxTextDateP = styled.p`
  margin-top: auto;
  margin-left: 12px;
  margin-right: 12px;
  color: #ccc;
  font-size: 12px;
  font-weight: 100;
`;

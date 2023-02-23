import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import socket from "../socket";

const TeamChat = () => {
  const channelName = "Dead space";
  useEffect(() => {
    console.log("effected");
    socket.emit("requestrooms", channelName);
    return () => {
      socket.off("requestrooms");
    };
  }, []);
  return <TeamChatWrap>testdddddddddddddddddddd</TeamChatWrap>;
};
//d
export default TeamChat;

const TeamChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: white;
`;

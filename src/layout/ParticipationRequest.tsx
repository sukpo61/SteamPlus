import React from "react";
import styled from "styled-components";

function ParticipationRequest() {
  return (
    <RequestPopup>
      <RequestStatement>
        닉네임#1234 님이
        <br />
        음성채팅 참여 요청을 보냈습니다.
        <br />
        수락하시겠습니까?
      </RequestStatement>
      <BottonWrap>
        <AcceptAndRefuse>수락</AcceptAndRefuse>
        <AcceptAndRefuse>거절</AcceptAndRefuse>
      </BottonWrap>
    </RequestPopup>
  );
}

const RequestPopup = styled.div`
  position: fixed;
  top: 96px;
  right: 34px;

  width: 350px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  background: rgba(38, 50, 69, 0.9);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  border-radius: 10px;
`;

const RequestStatement = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const BottonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const AcceptAndRefuse = styled.button`
  width: 80px;
  height: 32px;
  background: #404b5e;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #d4d4d4;

  &:hover {
    background: #00b8c8;
    color: #ffffff;
  }
`;

export default ParticipationRequest;

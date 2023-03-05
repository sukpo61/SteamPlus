import React from "react";
import styled from "styled-components";

const EmptyVoiceTalk = () => {
  return (
    <VoiceTalkWrap>
      <EmptyAlarmWrap>
        <img src="/img/emptylogo.png"></img>
        <span>참여중인 게임채널이 없어요</span>
      </EmptyAlarmWrap>
    </VoiceTalkWrap>
  );
};

export default EmptyVoiceTalk;

const VoiceTalkWrap = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: white;
`;
const EmptyAlarmWrap = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: white;
  span {
    margin-top: 24px;
    font-size: 12px;
  }
`;

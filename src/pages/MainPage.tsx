import React from "react";
import axios from "axios";
import styled from "styled-components";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useNavigate } from "react-router-dom";

function MainPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative" }}>
        <CurrentGameImg></CurrentGameImg>
        <CurrentGameTitle>OVERWATCH</CurrentGameTitle>
        <CurrentChannelJoinBtn>게임채널 입장하기</CurrentChannelJoinBtn>
      </div>
      <PopularChannel>
        <PopularChannel1st>
          <ChannelImg1st></ChannelImg1st>
          <ChannelTitle1st>Overwatch / 오버워치</ChannelTitle1st>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ChannelCategory1st>FPS/TPS, 액션</ChannelCategory1st>
            <ChannelActivate>
              <ChannelOnOff />
              <ChannelPlayerCount1st>20명</ChannelPlayerCount1st>
            </ChannelActivate>
          </div>
        </PopularChannel1st>
        <PopularChannel2ndTo5th>
          <PopularChannelList></PopularChannelList>
          <PopularChannelList></PopularChannelList>
          <PopularChannelList></PopularChannelList>
          <PopularChannelList></PopularChannelList>
        </PopularChannel2ndTo5th>
      </PopularChannel>
      <GameChannelList>
        <GameChannelBlock />
        <GameChannelBlock />
        <GameChannelBlock />
        <GameChannelBlock />
      </GameChannelList>
    </div>
  );
}

const CurrentGameImg = styled.div`
  // img 태그로 교체해야함

  width: 1820px;
  height: 694px;
  background-color: grey;
`;

const CurrentGameTitle = styled.div`
  position: absolute;
  width: 654px;
  left: 82px;
  top: 468px;

  font-family: "Montserrat";
  font-weight: 700;
  font-size: 96px;
  line-height: 117px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

const CurrentChannelJoinBtn = styled.button`
  padding: 20px 24px;
  gap: 10px;

  position: absolute;
  width: 240px;
  height: 73px;
  left: 82px;
  top: 601px;

  background: #00b8c8;
  border-radius: 20px;

  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

const PopularChannel = styled.div``;

const PopularChannel1st = styled.div`
  width: 600px;
  height: 592px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  background: #263245;
  border-radius: 20px;
`;

const ChannelImg1st = styled.div`
  // img 태그로 교체 필요
  width: 552px;
  height: 440px;
  /* background: url(319284_86167_2452.jpg); */
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: lightgrey;
`;

const ChannelTitle1st = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;

  width: 552px;
  height: 44px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #ffffff;
`;
const ChannelCategory1st = styled.div`
  height: 27px;

  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;

  color: #a7a9ac;
`;

const ChannelActivate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 69px; */
  height: 33px;
  gap: 8px;
`;

const ChannelOnOff = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #23de79;
`;

const ChannelPlayerCount1st = styled.div`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

const PopularChannel2ndTo5th = styled.div``;

const PopularChannelList = styled.div``;

const GameChannelList = styled.div`
  width: 1400px; // MianPage SearchPage에서 사이즈 조절 필요
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 210px;
  /* overflow: hidden; */
`;
export default MainPage;

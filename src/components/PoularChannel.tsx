import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

export const PoularChannel = ({ game, data2 }: any) => {
  const Description = game?.gamesdescription;

  const gameImg1 = data2?.game1?.header_image;
  const gameName1 = data2?.game1?.name;
  const gameImg2 = data2?.game2?.header_image;
  const gameName2 = data2?.game2?.name;
  const gameImg3 = data2?.game3?.header_image;
  const gameName3 = data2?.game3?.name;

  return (
    <PoularChannelLayout>
      <>
        {/* 인기채널 */}
        <PopularChannel>
          <PopularChannel1st>
            {/*활성화된 게임채널 */}
            <PopularChannelTitle>인기채널</PopularChannelTitle>
            <PopularChannelImg1st src={game?.gameSubimg} />
            <ChannelBox>
              <PoPularChannelTitle>{game?.gametitle}</PoPularChannelTitle>
              <PoPularChannelCategory>
                {game?.gameCategories} {game?.gameCategories2}{" "}
                {game?.gameCategories3}
                <PoPularChannelActivate>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ChannelPlayerCount1st>20명</ChannelPlayerCount1st>
                </PoPularChannelActivate>
              </PoPularChannelCategory>
              <Box>{Description}</Box>
            </ChannelBox>
          </PopularChannel1st>
          <PoularChannelLayout2>
            {/* 여기서부터  1 */}
            <PopularChannel1st2>
              <PoPularChannelImg src={gameImg3} />
              <PoPularChannelBox>
                <ChannelTitle1st2>{gameName3}</ChannelTitle1st2>
                <PoPularChannelCategory2>
                  RPG Simulation
                  <PoPularChannelActivate>
                    <ChannelOnOff />
                    <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                  </PoPularChannelActivate>
                </PoPularChannelCategory2>
              </PoPularChannelBox>
            </PopularChannel1st2>
            <PopularChannel1st2>
              <PoPularChannelImg src={gameImg1} />
              <PoPularChannelBox>
                <ChannelTitle1st2>{gameName1}</ChannelTitle1st2>
                <PoPularChannelCategory2>
                  Action Adventure
                  <PoPularChannelActivate>
                    <ChannelOnOff />
                    <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                  </PoPularChannelActivate>
                </PoPularChannelCategory2>
              </PoPularChannelBox>
            </PopularChannel1st2>
            <PopularChannel1st2>
              <PoPularChannelImg src={gameImg2} />
              <PoPularChannelBox>
                <ChannelTitle1st2>{gameName2}</ChannelTitle1st2>
                <PoPularChannelCategory2>
                  Action RPG Strategy
                  <PoPularChannelActivate>
                    <ChannelOnOff />
                    <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                  </PoPularChannelActivate>
                </PoPularChannelCategory2>
              </PoPularChannelBox>
            </PopularChannel1st2>

            {/* 여기서부터 */}
            <PopularChannel1st2>
              {/* <PoPularChannelImg src={gameimg} /> */}
              <div
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  fontSize: "12px",
                }}
              >
                인기채널이 없습니다.
              </div>
              <PoPularChannelBox>
                {/* <ChannelTitle1st2>{gameTitle}</ChannelTitle1st2> */}
                {/* <ChannelCategory1st2>{gameCategories}</ChannelCategory1st2> */}
                {/* <PoPularChannelActivate>
                  <ChannelOnOff />
                  <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                </PoPularChannelActivate> */}
              </PoPularChannelBox>
            </PopularChannel1st2>
          </PoularChannelLayout2>
        </PopularChannel>
      </>
    </PoularChannelLayout>
  );
};
const Box = styled.div`
  padding-top: 20px;
  border-top: 1px solid #ccc;
  margin: 20px 20px 20px 20px;
  color: #ccc;
  width: 90%;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 최대 3줄까지 나눔 */
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
const PopularChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  position: absolute;
  width: 100%;
  top: -35px;
  text-shadow: 0px 0px 15px white;
`;
const PoularChannelLayout2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  margin-left: 20px;
  gap: 20px;
`;
const PoularChannelLayout = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -300px;
  z-index: 999;
`;

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CurrentGameArea = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 9;
`;
const CurrentGameBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 60px;
  right: 100px;
`;
const CurrentGameImg = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
`;
const CurrentGameBlackImg = styled.div`
  position: absolute;
  width: 100%;
  height: 700px;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(25, 32, 48, 0) 0%,
    rgba(25, 32, 48, 1) 100%
  );
  /* opacity: 0.5; */
`;

const CurrentGameTitle = styled.span`
  text-align: right;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 72px;
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  color: #ffffff;
`;

const CurrentChannelJoinBtn = styled.span`
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  margin-left: auto;
  text-align: center;
  background: #00b8c8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

const PopularChannel = styled.div`
  width: 100%;
  height: 380px;
  margin-top: 102px;
  display: flex;
  position: relative;
  justify-content: center;
`;

const PopularChannel1st = styled.div`
  width: 396px;
  height: 380px;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 15px 0px #000;
  &:hover {
    box-shadow: 0px 0px 15px 0px #fff;
  }
  transition: 0.5s ease;
`;
const PopularChannel1st2 = styled.div`
  width: 232px;
  height: 180px;
  text-align: center;
  background: #263245;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 15px 0px #000;
  &:hover {
    box-shadow: 0px 0px 15px 0px #fff;
  }
  transition: 0.5s ease;
`;
const ChannelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PoPularChannelBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const PopularChannelImg1st = styled.img`
  // img 태그로 교체 필요
  margin: 16px auto 0;
  width: 360px;

  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const PoPularChannelImg = styled.img`
  // img 태그로 교체 필요
  width: 100%;
  height: 115px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const PoPularChannelTitle = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  margin: 16px 0px 0 20px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
const ChannelTitle1st2 = styled.div`
  display: flex;

  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
`;
const PoPularChannelCategory = styled.div`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a7a9ac;
`;
const PoPularChannelCategory2 = styled.div`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a7a9ac;
  width: 100%;
`;

const PoPularChannelActivate = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 20px;
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
  font-weight: 300;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-right: 20px;
`;
const ChannelPlayerCount1st2 = styled.div`
  font-family: "Noto Sans";
  font-weight: 300;
  font-size: 14px;
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

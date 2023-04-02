import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GameChannelBlock from "../common/GameChannelBlock";
import { useQuery } from "react-query";
import axios from "axios";
import { Top10Card } from "./Top10Card";
import { recommandGameRecoil } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import Skeleton from "../common/Skeleton";
import Skeletons from "../common/Skeleton";

export const Top10 = () => {
  //스켈레톤배열
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const PROXY_ID: any = process.env.REACT_APP_PROXY_ID;
  const [recommandGame, setrecommandGame] = useRecoilState(recommandGameRecoil);

  const TopGame = async (gameid: any) => {
    const response = await axios.get(
      `${PROXY_ID}/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: gameid, // 해당 게임의 id값'
        },
      }
    );
    return response?.data[gameid].data;
  };
  //탑게임 열개
  const TopGameid = async () => {
    const response = await axios.get(
      `${PROXY_ID}/https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/`
    );
    const gameIds = response?.data.response.pages[0].item_ids
      //gameIds를 랜덤으롤 돌려줌
      .map((e: any) => e.appid)
      //아이디 랜덤돌림
      .sort(() => Math.random() - 0.5)
      //아이디 열개자름
      .slice(0, 15);

    const gameDataPromises = gameIds.map((gameId: any) => TopGame(gameId));

    const gameData = await Promise.all(gameDataPromises);
    const filteredGameData = gameData.filter((data) => {
      //성인게임 필터 아마도?
      if (data.content_descriptors.notes === null) {
        return data.type === "game";
      }
    });
    const gameinfo = filteredGameData.map((data) => {
      return data;
    });
    //타입이 게임이고 성인게임 제외한것중에서 10개를 걸러줌
    setrecommandGame(gameinfo.slice(0, 10));
  };

  useEffect(() => {
    if (recommandGame.length === 0) {
      TopGameid();
    }
  }, []);

  return (
    <>
      <ActivateChannelLayout>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ChannelTitle>추천게임</ChannelTitle>

          <ActivateChannel1st>
            {recommandGame.length !== 0 ? (
              recommandGame?.map((game: any, index: number) => {
                // console.log("game", game);
                return (
                  <GameChannelBlockView key={index}>
                    {/* <Skeleton /> */}
                    <GameChannelBlock game={game} />
                  </GameChannelBlockView>
                );
              })
            ) : (
              <GameChannelBlockView>
                {array.map(() => {
                  return (
                    <>
                      <Skeletons />
                    </>
                  );
                })}
              </GameChannelBlockView>
            )}
          </ActivateChannel1st>
        </div>
      </ActivateChannelLayout>
    </>
  );
};

const GameChannelBlockView = styled.div``;
const ActivateChannel1st = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  margin-top: 30px;
`;
const ActivateChannelLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 150px;
  position: relative;
  z-index: 999;
`;
const ChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  top: -5px;
  position: absolute;
  width: 100%;
  text-shadow: 0px 0px 5px white;
`;
const GameListBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 900px; // 홈에서 width 길이 조절 필요
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
`;

const GameChannelImgArea = styled.div`
  // 썸네일
  /* background-color: lightgrey; */
  width: 212px;
  height: 100px;
  overflow: hidden;
  position: relative;
`;

const GameChannelImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: auto;
  height: 100px;
  object-fit: cover;
`;
const GameChannelDetailPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 688px; // 홈에서 사이즈 조절 필요
  height: 100px;

  background-color: #263245;
  padding: 24px 24px 24px 20px;
`;

const TitleLinear = styled.div`
  background: linear-gradient(
    90deg,
    rgba(38, 50, 69, 0) 47.28%,
    rgba(38, 50, 69, 0.703125) 77.75%,
    #263245 100%
  );
`;

const GameChannelTitle = styled.div`
  font-style: normal;
  color: white;
  letter-spacing: -0.03em;
  line-height: 29px;
  font-size: 24px;

  margin-bottom: 12px;
  width: 450px;
  height: 29px;
  overflow: hidden; // 제목이 길면 잘리게 해놓음!! 마우스 호버시 가로로 스크롤 되게 해야함
`;

const GameChannelInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
const GameChannelCategory = styled.div`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-size: 14px;
  color: #a7a9ac;
  letter-spacing: -0.03em;
`;

const NumberOfPlayer = styled.div`
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const AdmitButton = styled.button`
  width: 100px;
  height: 42px;
  background: #00b8c8;
  border-radius: 8px;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

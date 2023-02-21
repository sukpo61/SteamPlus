import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import GameChannelBlock from "../components/GameChannelBlock";
import { useNavigate } from "react-router-dom";
import { ActivateChannel } from "../components/ActivateChannel";
import { PoularChannel } from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
function MainPage() {
  const [gameimg, setGameImg] = useState<any>();
  const [gameTitle, setGameTitle] = useState<any>();
  const [gameCategories, setGameCategories] = useState<any>();

  //게임이미지 불러오기
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
        {
          params: {
            // appids: GameId,
            appids: 250900, // 해당 게임의 id값
            language: "korean",
          },
        }
      )
      .then((response) => {
        console.log("gamedetail", response);
        //이미지 네임
        setGameImg(response.data[250900].data.header_image);

        // // 게임타이틀
        setGameTitle(response.data[250900].data.name);
        // // 게임카테고리
        setGameCategories(response.data[250900].data.genres[0].description);
        //밑에 log는 게임설명
        console.log(response.data);
        //api로 게임정보불러오기
        // setGameTitle(response.data[`${GameId}`].data.name);
        // setGameImg(response.data[`${GameId}`].data.header_image);
        // setGameCategories(
        //   response.data[`${GameId}`].data.genres[0].description
        // );
      })
      .catch((error) => {
        // setError("Could not retrieve header image");
      });
  }, []);

  return (
    <MainLayout>
      {/* 메인게임 이미지 */}
      <CurrentGame
        gameimg={gameimg}
        gameTitle={gameTitle}
        gameCategories={gameCategories}
      />

      {/* 인기채널 */}
      <PoularChannel
        gameimg={gameimg}
        gameTitle={gameTitle}
        gameCategories={gameCategories}
      />
      {/* 현재활성화된 채널 */}
      <ActivateChannel
        gameimg={gameimg}
        gameTitle={gameTitle}
        gameCategories={gameCategories}
      />
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CurrentGameArea = styled.div`
  width: 1820px;
  height: 694px;
  overflow: hidden;
  position: relative;
`;
const CurrentGameImg = styled.img`
  // img 태그로 교체
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CurrentGameTitle = styled.div`
  position: absolute;
  width: 490px;
  left: 80px;
  top: 36px;

  font-family: "Montserrat";
  font-weight: 700;
  font-size: 72px;
  line-height: 88px;
  letter-spacing: -0.02em;
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  color: #ffffff;
`;

const CurrentChannelJoinBtn = styled.button`
  padding: 20px 24px;

  position: absolute;
  width: 176px;
  height: 52px;
  left: 1584px;
  top: 54px;

  background: #00b8c8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
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

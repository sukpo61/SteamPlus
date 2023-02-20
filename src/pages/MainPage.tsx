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

export default MainPage;

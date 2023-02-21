import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import { PoularChannel } from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
function MainPage() {
  //메인이미지
  const [gameMainSubImg, setGameMainImg] = useState<any>();
  //인기채널이미지
  const [gameimg, setGameImg] = useState<any>();
  //게임타이틀
  const [gameTitle, setGameTitle] = useState<any>();
  //게임카테고리
  const [gameCategories, setGameCategories] = useState<any>();

  //게임이미지 불러오기
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
        {
          params: {
            // appids: GameId,
            appids: 990080, // 해당 게임의 id값
            language: "korean",
          },
        }
      )
      .then((response) => {
        console.log("gamedetail", response);
        //메인 이미지
        setGameMainImg(response.data[990080].data.screenshots[1].path_full);
        //인기채널 이미지
        setGameImg(response.data[990080].data.header_image);
        // // 게임타이틀
        setGameTitle(response.data[990080].data.name);
        // // 게임카테고리
        setGameCategories(response.data[990080].data.genres[0].description);
        //밑에 log는 게임설명
        console.log(response);
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
        gameMainSubImg={gameMainSubImg}
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

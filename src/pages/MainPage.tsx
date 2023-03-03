import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import { PoularChannel } from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
import { useQuery } from "react-query";
import socket from "../socket";
import LoginModal from "../components/mainpage/LoginModal";

function MainPage() {
  const GameId: any = sessionStorage.getItem("gameid");
  const GameIds: any =
    GameId === "undefined" || GameId === null
      ? 945360
      : sessionStorage.getItem("gameid");
  //게임이미지 불러오기
  const Gamedata = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: GameIds, // 해당 게임의 id값'
        },
      }
    );

    const aaa: any = {
      gameid: GameIds,
      gamesdescription: response?.data[GameIds].data.short_description,
      gamevideo: response?.data[GameIds].data.movies[0].webm.max,
      gametitle: response?.data[GameIds].data.name,
      gameCategories: response?.data[GameIds].data.genres[0].description,
      gameCategories2:
        response?.data[GameIds].data.genres.length < 2
          ? ""
          : response?.data[GameIds].data.genres[1].description,
      gameCategories3:
        response?.data[GameIds].data.genres.length < 3
          ? ""
          : response?.data[GameIds].data.genres[2].description,
      gameMainImg: response?.data[GameIds].data.screenshots[1].path_full,
      gameSubimg: response?.data[GameIds].data.header_image,
    };
    return aaa;
  };
  const { data }: any = useQuery("Gamedata", Gamedata);

  ///인기게임 데이터 api
  const getFeaturedGames = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/featured"
    );

    const FeaturedGames: any = {
      game1: response?.data?.featured_win[0],
      game2: response?.data?.featured_win[1],
      game3: response?.data?.featured_win[2],
    };
    return FeaturedGames;
  };

  const { data: dataa }: any = useQuery("getFeaturedGames", getFeaturedGames);

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(true);

  return (
    <MainLayout>
      {/* 로그인 모달 */}
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
      {/* 메인게임 이미지 */}
      <CurrentGame game={data} />
      {/* 인기채널 */}
      <PoularChannel game={data} data2={dataa} />
      {/* 현재활성화된 채널 */}
      <ActivateChannel game={data} data2={dataa} />
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

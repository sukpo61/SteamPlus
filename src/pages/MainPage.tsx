import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import PoularChannel from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import socket from "../socket";
import {
  activechannelsRecoil,
  activechannelsinfoRecoil,
  recommandGameRecoil,
} from "../recoil/atom";
import { useRecoilState } from "recoil";
import { Top10 } from "../components/mainpage/Top10";
import { useNavigate } from "react-router-dom";
const MainPage: any = () => {
  const navigate = useNavigate();

  const PROXY_ID: any = process.env.REACT_APP_PROXY_ID;
  const [activechannels, setActiveChannels] =
    useRecoilState(activechannelsRecoil);
  const [activeChannelsInfo, setActiveChannelsInfo] = useRecoilState(
    activechannelsinfoRecoil
  );

  const GameId: any = sessionStorage.getItem("gameid");
  const GameIds: any =
    GameId === "undefined" || GameId === null
      ? 945360
      : sessionStorage.getItem("gameid");

  //게임이미지 불러오기
  const Gamedata = async () => {
    const response = await axios.get(
      `${PROXY_ID}/http://store.steampowered.com/api/appdetails/`,
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
  //메인 인기게임 10개 동영상
  const [recommandGame, setrecommandGame] = useRecoilState(recommandGameRecoil);

  const [randomGames, setRandomGame] = useState();

  //인기채널 정보
  const getChannelInfo = async (channelid: any, count: any) => {
    const response = await axios.get(
      `${PROXY_ID}/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          appids: channelid, // 해당 게임의 id값'
        },
      }
    );

    setActiveChannelsInfo((e: any) => [
      ...e,
      {
        info: response?.data[channelid].data,
        usercount: count,
      },
    ]);
  };
  //랜덤게임
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * recommandGame.length);
    //랜덤 돌리는함수를 변수에담음
    const randomGame = recommandGame[randomIndex];
    setRandomGame(randomGame);
  }, [recommandGame]);

  useEffect(() => {
    if (activechannels) {
      activechannels.map((channel: any) => {
        getChannelInfo(channel.channelid, channel.usercount);
      });
    }
  }, [activechannels]);

  useEffect(() => {
    socket.emit("getactivechannels");
    socket.once("getactivechannels", (channelsinfo) => {
      setActiveChannels(channelsinfo);
    });
    return () => {
      setActiveChannels([]);
      setActiveChannelsInfo([]);
    };
  }, []);

  //랜딩 페이지
  useEffect(() => {
    const isFirstTime = sessionStorage.getItem("isFirstTime");
    if (!isFirstTime) {
      sessionStorage.setItem("isFirstTime", "true");
      navigate("/landing");
      return;
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Logo onClick={() => navigate(`/landing`)}>
        <LogoIcon src="/img/SteamPlusLogoIconSH.svg" />
        <LogoText src="/img/SteamPlusLogoTextSH.svg" />
      </Logo>
      <MainLayout>
        {/* 메인게임 이미지 */}
        <CurrentGame game={randomGames} />{" "}
        <MainWrap>
          {/* 인기채널 */}
          <PoularChannel />
          {/* 현재활성화된 채널 */}
          <ActivateChannel gamedata={activeChannelsInfo} />
          {/* 추천채널 */}
          <Top10 />
        </MainWrap>
      </MainLayout>
    </div>
  );
};

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 32px;
  margin-top: 32px;

  z-index: 999;
  cursor: pointer;
`;

const LogoIcon = styled.img`
  height: 46px;
`;

const LogoText = styled.img`
  height: 43px;
`;

const MainWrap = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
`;

export default MainPage;

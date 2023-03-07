import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import PoularChannel from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import socket from "../socket";
import { activechannelsRecoil, activechannelsinfoRecoil } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { Top10 } from "../components/mainpage/Top10";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const PROXY_ID: any = process.env.REACT_APP_PROXY_ID;

  const navigate = useNavigate();

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

  //top10 game 정보

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

  ///인기게임 데이터 api
  // const getFeaturedGames = async () => {
  //   const response = await axios.get(
  //     "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/featured"
  //   );

  //   const FeaturedGames: any = {
  //     game1: response?.data?.featured_win[0],
  //     game2: response?.data?.featured_win[1],
  //     game3: response?.data?.featured_win[2],
  //   };
  //   return FeaturedGames;
  // };

  // const { data: dataa }: any = useQuery("getFeaturedGames", getFeaturedGames);

  return (
    <div style={{ position: "relative" }}>
      <Logo
        src="/img/SteamPlusLogo2.png"
        onClick={() => navigate(`/landing`)}
      />
      <MainLayout>
        {/* 메인게임 이미지 */}
        <CurrentGame game={data} />{" "}
        <MainWrap>
          {/* 인기채널 */}
          <PoularChannel />
          {/* 현재활성화된 채널 */}
          <ActivateChannel gamedata={activeChannelsInfo} />
          <Top10 />
        </MainWrap>
      </MainLayout>
    </div>
  );
}

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  position: absolute;
  margin-left: 32px;
  margin-top: 32px;
  width: 112px;
  height: auto;
  z-index: 999;
  cursor: pointer;
  /* box-shadow: 0px 0px 10px 0px #fff; */
`;

const MainWrap = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
`;

export default MainPage;

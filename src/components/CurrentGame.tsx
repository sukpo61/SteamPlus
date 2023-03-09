import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const CurrentGame = ({ game }: any) => {
  const navigate = useNavigate();
  const [gameAll, setGameAll] = useState({
    id: "",
    title: "",
    video: "",
  });

  useEffect(() => {
    console.log("뭔게임", game);
    setGameAll({
      id: game?.steam_appid,
      title: game?.name,
      video: game?.movies ? game?.movies[0]?.webm?.max : "",
    });
  }, [game]);

  return (
    <CurrentGameLayout>
      {/* 게임비디오 */}
      <GameVideo src={gameAll.video} autoPlay muted loop />
      <CurrentGameBlackImg />
      <CurrentGameBox>
        {/* 게임타이틀 */}
        <CurrentGameTitle>{gameAll?.title}</CurrentGameTitle>
        {/* 게임채널입장*/}
        <CurrentChannelJoinBtn
          onClick={() => {
            navigate(`/Teamchat/:${gameAll?.id}`, {
              state: {
                gameid: gameAll?.id.toString(),
              },
            });
          }}
        >
          게임채널 입장하기
        </CurrentChannelJoinBtn>
      </CurrentGameBox>
    </CurrentGameLayout>
  );
};
const GameVideo = styled.video`
  width: 100%;
  height: 700px;
  object-fit: cover;
  position: fixed;
  top: 0;
`;
const CurrentGameLayout = styled.div`
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

const CurrentGameBlackImg = styled.div`
  position: fixed;
  width: 100%;
  height: 700px;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(25, 32, 48, 0) 0%,
    rgba(25, 32, 48, 1) 100%
  );
`;

const CurrentGameTitle = styled.span`
  text-align: right;
  font-weight: 700;
  font-size: 72px;
  text-shadow: 0px 0px 15px white;
  color: #ffffff;
`;

const CurrentChannelJoinBtn = styled.span`
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-top: 25px;
  margin-left: auto;
  text-align: center;
  background: #00b8c8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

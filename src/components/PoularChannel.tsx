import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { popularchannelsRecoil } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const PoularChannel = () => {
  const popularchannels = useRecoilValue(popularchannelsRecoil);
  const fivearray = [1, 2, 3, 4];
  const emptylength = 5 - popularchannels.length;
  const firstgame = popularchannels[0];
  const navigate = useNavigate();

  return (
    <PoularChannelLayout>
      <PopularChannel>
        {popularchannels[0] ? (
          <PopularChannel1st
            onClick={() =>
              navigate(`/Teamchat/:${firstgame?.info.steam_appid}`, {
                state: {
                  gameid: firstgame?.info.steam_appid.toString(),
                },
              })
            }
          >
            <PopularChannelTitle>인기채널</PopularChannelTitle>
            <PopularChannelImg1st src={firstgame?.info.header_image} />
            <ChannelBox>
              <PoPularChannelTitle>{firstgame?.info.name}</PoPularChannelTitle>
              <PoPularChannelCategory>
                {firstgame?.info.genres.map((e: any) => {
                  return `${e.description} `;
                })}
                <PoPularChannelActivate>
                  <ChannelOnOff />
                  <ChannelPlayerCount1st>
                    {firstgame?.usercount}명
                  </ChannelPlayerCount1st>
                </PoPularChannelActivate>
              </PoPularChannelCategory>
            </ChannelBox>
          </PopularChannel1st>
        ) : (
          <PopularChannel1stempty>인기채널이 없습니다.</PopularChannel1stempty>
        )}

        <PoularChannelLayout2>
          {popularchannels.slice(1, 4).map((game: any) => {
            return (
              <PopularChannel1st2
                onClick={() =>
                  navigate(`/Teamchat/:${game?.info.steam_appid}`, {
                    state: {
                      gameid: game?.info.steam_appid.toString(),
                    },
                  })
                }
              >
                <PoPularChannelImg src={game.info.header_image} />
                <PoPularChannelBox>
                  <ChannelTitle1st2>{game.info.name}</ChannelTitle1st2>
                  <PoPularChannelActivate>
                    <ChannelOnOff />
                    <ChannelPlayerCount1st2>
                      {game.usercount}명
                    </ChannelPlayerCount1st2>
                  </PoPularChannelActivate>
                </PoPularChannelBox>
              </PopularChannel1st2>
            );
          })}
          {fivearray.slice(0, emptylength).map((_, index) => {
            return (
              <PopularChannel1st2empty>
                {popularchannels.length === 0 ? (
                  <span>{index + 2 + popularchannels.length} </span>
                ) : (
                  <span>{index + 1 + popularchannels.length} </span>
                )}
                <div>인기채널이 없습니다.</div>
              </PopularChannel1st2empty>
            );
          })}
        </PoularChannelLayout2>
      </PopularChannel>
    </PoularChannelLayout>
  );
};

export default PoularChannel;

const PopularChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  position: absolute;
  width: 100%;
  top: -35px;
  text-shadow: 0px 0px 15px white;
`;
const PoularChannelLayout2 = styled.div<any>`
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

const PopularChannel = styled.div`
  width: 100%;
  height: 380px;
  margin-top: 102px;
  display: flex;
  position: relative;
  justify-content: center;
`;

const PopularChannel1st = styled.div`
  color: white;
  width: 396px;
  height: 380px;
  display: flex;
  padding: 16px;
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
const PopularChannel1stempty = styled.div`
  color: white;
  width: 396px;
  height: 380px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  background: #263245;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px #000;
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
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 15px 0px #000;
  &:hover {
    box-shadow: 0px 0px 15px 0px #fff;
  }
  transition: 0.5s ease;
`;
const PopularChannel1st2empty = styled.div`
  position: relative;
  font-family: "Noto Sans";
  overflow: hidden;
  color: white;
  width: 232px;
  height: 180px;
  font-size: 12px;
  font-weight: 500;
  background: #263245;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px #000;
  span {
    font-size: 300px;
    position: absolute;
    left: -40px;
    opacity: 20%;
  }
  transition: 0.5s ease;
`;
const ChannelBox = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PoPularChannelBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;
const PopularChannelImg1st = styled.img`
  // img 태그로 교체 필요

  width: 364px;
  height: 285px;

  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const PoPularChannelImg = styled.img`
  // img 태그로 교체 필요
  width: 100%;
  height: 116px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const PoPularChannelTitle = styled.div`
  margin-bottom: 4px;
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
const ChannelTitle1st2 = styled.div`
  display: flex;
  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
`;
const PoPularChannelCategory = styled.div`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
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
`;
const ChannelPlayerCount1st2 = styled.div`
  font-family: "Noto Sans";
  font-weight: 300;
  font-size: 12px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #ffffff;
`;

import React from "react";
import styled from "styled-components";
import GameChannelBlock from "./common/GameChannelBlock";

export const ActivateChannel = ({ gamedata }: any) => {
  return (
    <>
      <ActivateChannelLayout>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ChannelTitle>현재활성화된 채널</ChannelTitle>

          <ActivateChannel1st>
            {gamedata?.map((game: any) => {
              if (game === undefined) {
                return <div></div>;
              }
              // console.log("game", game);
              return (
                <GameChannelBlockView>
                  <GameChannelBlock game={game.info} count={game.usercount} />
                </GameChannelBlockView>
              );
            })}
          </ActivateChannel1st>
        </div>
      </ActivateChannelLayout>
    </>
  );
};
const ChannelOnOff = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #23de79;
`;

const GameChannelBlockView = styled.div``;
const ChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  top: -5px;
  position: absolute;
  width: 100%;
  text-shadow: 0px 0px 15px white;
`;
const ActivateChannelContents = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: space-between;

  width: 100%;
`;
const ActivateChannels = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  gap: 8px;
  margin-left: 10px;
`;
const ActivateChannelPlayerCount = styled.div`
  font-family: "Noto Sans";
  font-weight: 300;
  font-size: 14px;

  color: #ffffff;
`;
const ActivateChannelCategory = styled.div`
  font-family: "Noto Sans";
  font-weight: 200;
  font-size: 16px;
  color: #a7a9ac;
`;
const ActivateChannelTitle = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;

  margin-top: -50px;
`;
const ActivateChannelBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
const ActivateChannelImg1st = styled.img`
  // img 태그로 교체 필요
  margin: 10px;
  width: 300px;
  height: 130px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const ActivateChannelLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 80px;
  position: relative;
  z-index: 999;
`;
const ActivateChannel1st = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  margin-top: 30px;
`;
const CurrentChannelJoinBtn = styled.span`
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #00b8c8;
  border-radius: 8px;
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  margin-right: 30px;

  margin-top: 70px;
`;

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

const GameChannelBlockView = styled.div``;
const ChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  top: -5px;
  position: absolute;
  width: 100%;
  text-shadow: 0px 0px 15px white;
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

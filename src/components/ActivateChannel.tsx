import React from "react";
import styled from "styled-components";
export const ActivateChannel = ({ game, data2 }: any) => {
  const gameImg1 = data2?.game1?.header_image;
  const gameName1 = data2?.game1?.name;
  const gameImg2 = data2?.game2?.header_image;
  const gameName2 = data2?.game2?.name;
  const gameImg3 = data2?.game3?.header_image;
  const gameName3 = data2?.game3?.name;

  return (
    <>
      <ActivateChannelLayout>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ChannelTitle>현재활성화된 채널</ChannelTitle>
          <ActivateChannel1st>
            <ActivateChannelImg1st src={game?.gameSubimg} />
            <ActivateChannelContents>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ActivateChannelTitle>{game?.gametitle}</ActivateChannelTitle>
                <ActivateChannelBox>
                  <ActivateChannelCategory>
                    {game?.gameCategories} {game?.gameCategories2}{" "}
                    {game?.gameCategories3}
                  </ActivateChannelCategory>
                  <ActivateChannels>
                    {/* 초록불 */}
                    <ChannelOnOff />
                    <ActivateChannelPlayerCount>
                      20명
                    </ActivateChannelPlayerCount>
                  </ActivateChannels>
                </ActivateChannelBox>
              </div>
              <>
                <CurrentChannelJoinBtn>입장하기</CurrentChannelJoinBtn>
              </>
            </ActivateChannelContents>
          </ActivateChannel1st>
          <ActivateChannel1st>
            <ActivateChannelImg1st src={gameImg1} />
            <ActivateChannelContents>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ActivateChannelTitle>{gameName1}</ActivateChannelTitle>
                <ActivateChannelBox>
                  <ActivateChannelCategory>
                    Action Adventure
                  </ActivateChannelCategory>
                  <ActivateChannels>
                    {/* 초록불 */}
                    <ChannelOnOff />
                    <ActivateChannelPlayerCount>
                      20명
                    </ActivateChannelPlayerCount>
                  </ActivateChannels>
                </ActivateChannelBox>
              </div>
              <>
                <CurrentChannelJoinBtn>입장하기</CurrentChannelJoinBtn>
              </>
            </ActivateChannelContents>
          </ActivateChannel1st>
          <ActivateChannel1st>
            <ActivateChannelImg1st src={gameImg2} />
            <ActivateChannelContents>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ActivateChannelTitle>{gameName2}</ActivateChannelTitle>
                <ActivateChannelBox>
                  <ActivateChannelCategory>
                    Action RPG Strategy
                  </ActivateChannelCategory>
                  <ActivateChannels>
                    {/* 초록불 */}
                    <ChannelOnOff />
                    <ActivateChannelPlayerCount>
                      20명
                    </ActivateChannelPlayerCount>
                  </ActivateChannels>
                </ActivateChannelBox>
              </div>
              <>
                <CurrentChannelJoinBtn>입장하기</CurrentChannelJoinBtn>
              </>
            </ActivateChannelContents>
          </ActivateChannel1st>
          <ActivateChannel1st>
            <ActivateChannelImg1st src={gameImg3} />
            <ActivateChannelContents>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ActivateChannelTitle>{gameName3}</ActivateChannelTitle>
                <ActivateChannelBox>
                  <ActivateChannelCategory>
                    RPG Simulation
                  </ActivateChannelCategory>
                  <ActivateChannels>
                    {/* 초록불 */}
                    <ChannelOnOff />
                    <ActivateChannelPlayerCount>
                      20명
                    </ActivateChannelPlayerCount>
                  </ActivateChannels>
                </ActivateChannelBox>
              </div>
              <>
                <CurrentChannelJoinBtn>입장하기</CurrentChannelJoinBtn>
              </>
            </ActivateChannelContents>
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
const ChannelTitle = styled.div`
  color: white;
  font-size: 20px;
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
  font-weight: 400;
  font-size: 16px;
  color: #a7a9ac;
`;
const ActivateChannelTitle = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
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
  position: relative;
  z-index: 999;
`;
const ActivateChannel1st = styled.div`
  width: 900px;
  height: 150px;
  display: flex;
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  position: relative;
  margin-top: 30px;
  box-shadow: 3px 4px 3px 2px black;
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
`;

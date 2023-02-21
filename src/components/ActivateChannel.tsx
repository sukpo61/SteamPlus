import React from "react";
import styled from "styled-components";
export const ActivateChannel = ({
  gameimg,
  gameTitle,
  gameCategories,
}: any) => {
  return (
    <>
      <ActivateChannelLayout>
        <ActivateChannel1st>
          <ChannelTitle>현재활성화된 채널</ChannelTitle>
          <ActivateChannelImg1st src={gameimg} />
          <ActivateChannelContents>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ActivateChannelTitle>{gameTitle}</ActivateChannelTitle>
              <ActivateChannelBox>
                <ActivateChannelCategory>
                  {gameCategories}
                </ActivateChannelCategory>
                <ActivateChannels>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ActivateChannelPlayerCount>20명</ActivateChannelPlayerCount>
                </ActivateChannels>
              </ActivateChannelBox>
            </div>
            <>
              <CurrentChannelJoinBtn>입장하기</CurrentChannelJoinBtn>
            </>
          </ActivateChannelContents>
        </ActivateChannel1st>
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
  top: -30px;
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
  width: 130px;
  height: 130px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const ActivateChannelLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  position: relative;
`;
const ActivateChannel1st = styled.div`
  width: 900px;
  height: 150px;
  display: flex;
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
  color: white;
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [gameimg, setGameImg] = useState();
  const [gameTitle, setGameTitle] = useState();
  const [gameCategories, setGameCategories] = useState();
  const GameId = localStorage.getItem("gameid");
  const gotologin = () => {
    navigate("/login");
  };
  //게임이미지 불러오기
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
        {
          params: {
            // appids: GameId,
            appids: 250900, // 해당 게임의 id값
            language: "korean",
          },
        }
      )
      .then((response) => {
        console.log("gamedetail", response);
        //이미지 네임
        setGameImg(response.data[250900].data.header_image);

        // // 게임타이틀
        setGameTitle(response.data[250900].data.name);
        // // 게임카테고리
        setGameCategories(response.data[250900].data.genres[0].description);
        //밑에 log는 게임설명
        console.log(response.data);
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
      <CurrentGameArea>
        {/* 게임이미지 */}
        <CurrentGameImg src={gameimg} />
        <CurrentGameBlackImg />
        <CurrentGameBox>
          {/* 게임타이틀 */}
          <CurrentGameTitle>{gameTitle}</CurrentGameTitle>
          {/* 게임채널입장*/}
          <CurrentChannelJoinBtn>게임채널 입장하기</CurrentChannelJoinBtn>
        </CurrentGameBox>
      </CurrentGameArea>
      {/* 아래 */}
      <PoularChannelLayout>
        <PopularChannel>
          <PopularChannel1st>
            {/*활성화된 게임채널 */}
            <ChannelImg1st src={gameimg} />
            <ChannelTitle1st>{gameTitle}</ChannelTitle1st>
            <ChannelBox>
              <ChannelCategory1st>{gameCategories}</ChannelCategory1st>
              <ChannelActivate>
                {/* 초록불 */}
                <ChannelOnOff />
                <ChannelPlayerCount1st>20명</ChannelPlayerCount1st>
              </ChannelActivate>
            </ChannelBox>
          </PopularChannel1st>

          <PoularChannelLayout2>
            <PopularChannel1st2>
              <ChannelImg1st2 src={gameimg} />
              <ChannelBox2>
                <ChannelTitle1st2>{gameTitle}</ChannelTitle1st2>
                {/* <ChannelCategory1st2>{gameCategories}</ChannelCategory1st2> */}
                <ChannelActivate>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                </ChannelActivate>
              </ChannelBox2>
            </PopularChannel1st2>
            <PopularChannel1st2>
              <ChannelImg1st2 src={gameimg} />
              <ChannelBox2>
                <ChannelTitle1st2>{gameTitle}</ChannelTitle1st2>
                {/* <ChannelCategory1st2>{gameCategories}</ChannelCategory1st2> */}
                <ChannelActivate>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                </ChannelActivate>
              </ChannelBox2>
            </PopularChannel1st2>
            <PopularChannel1st2>
              <ChannelImg1st2 src={gameimg} />
              <ChannelBox2>
                <ChannelTitle1st2>{gameTitle}</ChannelTitle1st2>
                {/* <ChannelCategory1st2>{gameCategories}</ChannelCategory1st2> */}
                <ChannelActivate>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                </ChannelActivate>
              </ChannelBox2>
            </PopularChannel1st2>
            <PopularChannel1st2>
              <ChannelImg1st2 src={gameimg} />
              <ChannelBox2>
                <ChannelTitle1st2>{gameTitle}</ChannelTitle1st2>
                {/* <ChannelCategory1st2>{gameCategories}</ChannelCategory1st2> */}
                <ChannelActivate>
                  {/* 초록불 */}
                  <ChannelOnOff />
                  <ChannelPlayerCount1st2>20명</ChannelPlayerCount1st2>
                </ChannelActivate>
              </ChannelBox2>
            </PopularChannel1st2>
          </PoularChannelLayout2>

          {/* <PopularChannel2ndTo5th>
          <PopularChannelList>2</PopularChannelList>
          <PopularChannelList>1</PopularChannelList>
          <PopularChannelList>3</PopularChannelList>
          <PopularChannelList>5</PopularChannelList>
        </PopularChannel2ndTo5th> */}
        </PopularChannel>
      </PoularChannelLayout>
      {/* <GameChannelList> <GameChannelBlock /> </GameChannelList> */}
    </MainLayout>
  );
}
const PoularChannelLayout2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  margin-left: 20px;
  gap: 20px;
`;
const PoularChannelLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: -300px;
  z-index: 999;
`;
const PoularChannelTitle = styled.div`
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
`;
const PopularChannelMainTitle = styled.h2`
  height: 100%;
`;
const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CurrentGameArea = styled.div`
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
const CurrentGameImg = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
`;
const CurrentGameBlackImg = styled.div`
  position: absolute;
  width: 100%;
  height: 700px;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(25, 32, 48, 0) 0%,
    rgba(25, 32, 48, 1) 100%
  );
  /* opacity: 0.5; */
`;

const CurrentGameTitle = styled.span`
  text-align: right;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 72px;
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  color: #ffffff;
`;

const CurrentChannelJoinBtn = styled.span`
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  margin-left: auto;
  text-align: center;
  background: #00b8c8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

const PopularChannel = styled.div`
  width: 100%;
  height: 380px;
  margin-top: 102px;
  display: flex;
  justify-content: center;
`;

const PopularChannel1st = styled.div`
  width: 396px;
  height: 380px;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
`;
const PopularChannel1st2 = styled.div`
  width: 232px;
  height: 180px;
  text-align: center;
  background: #263245;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #263245;
  border-radius: 10px;
  cursor: pointer;
`;
const ChannelBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ChannelBox2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;
const ChannelImg1st = styled.img`
  // img 태그로 교체 필요
  margin: 16px auto 0;
  width: 360px;
  height: 285px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;
const ChannelImg1st2 = styled.img`
  // img 태그로 교체 필요
  width: 100%;
  height: 115px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const ChannelTitle1st = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  margin: 16px 0px 0 16px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
const ChannelTitle1st2 = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 13px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
`;
const ChannelCategory1st = styled.div`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a7a9ac;
`;
const ChannelCategory1st2 = styled.div`
  height: 27px;
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a7a9ac;
`;

const ChannelActivate = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 33px;
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
  margin-right: 16px;
  color: #ffffff;
`;
const ChannelPlayerCount1st2 = styled.div`
  font-family: "Noto Sans";
  font-weight: 300;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.03em;
  color: #ffffff;
`;
const PopularChannel2ndTo5th = styled.div``;

const PopularChannelList = styled.div``;

const GameChannelList = styled.div`
  width: 1400px; // MianPage SearchPage에서 사이즈 조절 필요
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 210px;
  /* overflow: hidden; */
`;
export default MainPage;

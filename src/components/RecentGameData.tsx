import styled from "styled-components";

const RecentGameData = ({ gameData }: any) => {
  const totalMinutes = gameData.playtime_mac_forever;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const gameID = gameData.appid;

  const gameimg: any = `https://steamcdn-a.akamaihd.net/steam/apps/${gameID}/header.jpg`;
  return (
    <RecentGameDataLaout>
      <RecentGameDataImgBox>
        <RecentGameDataImg src={gameimg} />
        {/* 백그라운드 이미지 */}
        <CurrentGameBlackImg />
        <GameBtn>게임 채널 참여</GameBtn>
        <RecentGameDataBox>
          <RecentGameDataTiTle>{gameData.name}</RecentGameDataTiTle>
          <RecentGameDataTime>
            총 플레이한시간 : {`${hours}시간${minutes}분`}
          </RecentGameDataTime>
        </RecentGameDataBox>
      </RecentGameDataImgBox>
    </RecentGameDataLaout>
  );
};

export default RecentGameData;
const GameBtn = styled.span`
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  width: 85px;
  height: 30px;
  background: #00b8c8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 99;
  display: none;
`;
const CurrentGameBlackImg = styled.div`
  width: 300px;
  height: 132px;
  bottom: 0px;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  &:hover {
    backdrop-filter: blur(2px);
  }
  /* opacity: 0.5; */
`;
const RecentGameDataLaout = styled.div`
  width: 300px;
  height: 130px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  z-index: 9;
  transition: 0.5s ease;
  &:hover {
    backdrop-filter: blur(2px);
    p {
      display: none;
    }
    span {
      display: block;
    }
    div {
      backdrop-filter: blur(2px);
    }
  }
`;
const RecentGameDataTiTle = styled.p`
  text-align: right;
  font-size: 24px;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  word-break: keep-all;
  word-wrap: break-word;
`;
const RecentGameDataTime = styled.p`
  font-size: 12px;
  font-weight: 200;
  margin-top: 5px;
  color: #ccc;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: end;
  position: relative; ;
`;
const RecentGameDataImgBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* overflow: hidden; */
`;
const RecentGameDataImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const RecentGameDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 5px;
`;

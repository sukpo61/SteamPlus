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
        <CurrentGameBlackImg />
        <RecentGameDataBox>
          <RecentGameDataTiTle> {gameData.name}</RecentGameDataTiTle>
          <RecentGameDataTime>
            총 플레이한시간 : {`${hours}시간${minutes}분`}
          </RecentGameDataTime>
        </RecentGameDataBox>
      </RecentGameDataImgBox>
    </RecentGameDataLaout>
  );
};

export default RecentGameData;
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
  background-color: red;
`;
const RecentGameDataTiTle = styled.div`
  font-size: 24px;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const RecentGameDataTime = styled.div`
  font-size: 12px;
  font-weight: 200;
  margin-top: 5px;
  color: #ccc;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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
  bottom: 5px;
  right: 5px;
`;

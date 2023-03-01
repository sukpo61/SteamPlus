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
  top: 20px;
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
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  z-index: 9;
`;
const RecentGameDataTiTle = styled.div`
  font-size: 24px;
  font-weight: 400;
`;
const RecentGameDataTime = styled.div`
  font-size: 12px;
  font-weight: 200;
  margin-top: 5px;
  color: #ccc;
`;
const RecentGameDataImgBox = styled.div`
  width: 300px;
  height: 130px;
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
  bottom: 25px;
  right: 40px;
`;

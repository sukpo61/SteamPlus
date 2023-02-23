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
      </RecentGameDataImgBox>
      <RecentGameDataBox>
        <RecentGameDataTiTle> {gameData.name}</RecentGameDataTiTle>
        <RecentGameDataTime>
          총 플레이한시간 : {`${hours}시간${minutes}분`}
        </RecentGameDataTime>
      </RecentGameDataBox>
    </RecentGameDataLaout>
  );
};

export default RecentGameData;

const RecentGameDataLaout = styled.div`
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
const RecentGameDataTiTle = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;
const RecentGameDataTime = styled.div`
  font-size: 12px;
  font-weight: 100;
  margin-top: 5px;
  color: #ccc;
`;
const RecentGameDataImgBox = styled.div`
  width: 300px;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
`;
const RecentGameDataImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const RecentGameDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

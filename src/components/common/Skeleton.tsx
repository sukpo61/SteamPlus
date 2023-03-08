import styled, { keyframes } from "styled-components";

function Skeleton() {
  return (
    <GameListBlock className="skeleton-item">
      <GameChannelImgArea />
      <GameChannelDetailPart>
        <div>
          <GameChannelTitle className="skeleton-name"></GameChannelTitle>
          <GameChannelCategory className="skeleton-info"></GameChannelCategory>{" "}
        </div>
        <AdmitButton></AdmitButton>
      </GameChannelDetailPart>
    </GameListBlock>
  );
}

const GameListBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 900px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 10px; /* 추가 */
`;

const GameChannelImgArea = styled.div`
  background: linear-gradient(to right, #404b5e, #404b5e, #404b5e);
  width: 212px;
  height: 100px;
`;

const GameChannelDetailPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 688px; // 홈에서 사이즈 조절 필요
  height: 100px;
  background-color: #263245;
  padding: 24px 24px 24px 20px;
`;

const GameChannelTitle = styled.div`
  background: linear-gradient(to right, #404b5e, #404b5e, #404b5e);
  width: 300px;
  height: 50px;
  font-style: normal;
  color: white;
  letter-spacing: -0.03em;
  line-height: 29px;
  font-size: 24px;
  margin-bottom: 12px;
  height: 29px;
`;

const GameChannelCategory = styled.div`
  width: 100px;
  height: 10px;
  background: linear-gradient(to right, #404b5e, #404b5e, #404b5e);
  font-style: normal;
  font-size: 14px;
  color: #a7a9ac;
  letter-spacing: -0.03em;
`;

const AdmitButton = styled.div`
  width: 100px;
  height: 42px;
  background: linear-gradient(to right, #404b5e, #404b5e, #404b5e);
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

export default Skeleton;

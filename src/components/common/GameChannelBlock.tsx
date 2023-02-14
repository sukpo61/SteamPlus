import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Game {
  id: any;
  tiny_image: string;
  response: any;
  data: any;
}

interface Props {
  game: any;
}

function GameChannelBlock({ game }: Props) {
  const navigate = useNavigate();

  return (
    <GameListBlock
    // onClick={() => navigate(`/teamchat/${}`, {})} key={}
    >
      <GameChannelImgPart src={`${game.tiny_image}`} />
      <GameChannelDetailPart>
        <div>
          <GameChannelTitle>{`${game.name}`}</GameChannelTitle>
          {/* {response.data.items} */}
          <GameChannelInfo>
            <GameChannelCategory>어드벤쳐, RPG, 앞서해보기</GameChannelCategory>
            <NumberOfPlayer>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#23DE79",
                }}
              ></div>
              {/* {`${}`} */}명
            </NumberOfPlayer>
          </GameChannelInfo>
        </div>
        <AdmitButton>입장하기</AdmitButton>
      </GameChannelDetailPart>
    </GameListBlock>
  );
}

const GameListBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 890px; // 홈에서 width 길이 조절 필요
  height: 108px;
  border-radius: 10px;
  overflow: hidden;
`;

const GameChannelImgPart = styled.img`
  // 썸네일
  /* background-color: lightgrey; */
  width: 205px;
  height: 108px;
`;
const GameChannelDetailPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 685px; // 홈에서 사이즈 조절 필요
  height: 108px;

  background-color: #263245;
  padding: 24px 24px 24px 20px;
`;

const GameChannelTitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  color: white;
  letter-spacing: -0.03em;
  line-height: 29px;
  font-size: 24px;

  margin-bottom: 12px;
`;

const GameChannelInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
const GameChannelCategory = styled.div`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-size: 14px;
  color: #a7a9ac;
  letter-spacing: -0.03em;
`;

const NumberOfPlayer = styled.div`
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const AdmitButton = styled.button`
  width: 100px;
  height: 42px;
  background: #00b8c8;
  border-radius: 8px;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

export default GameChannelBlock;

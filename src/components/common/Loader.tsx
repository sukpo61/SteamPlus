import React from "react";
import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";

function Loading() {
  return (
    <Background>
      <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </Background>
  );
}

const Background = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 50px; */
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
  color: white;
`;
export default Loading;

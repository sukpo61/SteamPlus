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
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* width: 100%; */
  /* height: 100%; */
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font: 1rem "Noto Sans KR";
  text-align: center;
  color: white;
`;
export default Loading;

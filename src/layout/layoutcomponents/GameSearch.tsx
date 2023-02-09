import React from "react";
import { gamesearchbutton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function GameSearch() {
  // gamesearch 클릭 state
  const gamesearchBoolean = useRecoilValue(gamesearchbutton);

  return (
    <GameSearchDiv gamesearchBoolean={gamesearchBoolean}>
      GameSearch
    </GameSearchDiv>
  );
}

export default GameSearch;
const GameSearchDiv = styled.div<{ gamesearchBoolean: Boolean }>`
  width: 400px;
  height: 100%;
  background: #727272;
  position: fixed;
  left: ${(props) => (props.gamesearchBoolean ? "100px" : "-500px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  border-top-right-radius: 30px;
`;

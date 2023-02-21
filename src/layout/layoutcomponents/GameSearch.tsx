import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function GameSearch() {
  // gamesearch 클릭 state
  const layoutMenu = useRecoilValue(LayoutButton);

  return <GameSearchDiv layoutMenu={layoutMenu}>GameSearch</GameSearchDiv>;
}

export default GameSearch;
const GameSearchDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "gamesearch" ? "block" : "none")};
`;

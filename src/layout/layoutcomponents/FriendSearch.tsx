import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function FriendSearch() {
  const layoutMenu = useRecoilValue(LayoutButton);

  return (
    <FriendSearchDiv layoutMenu={layoutMenu}>FriendSearch</FriendSearchDiv>
  );
}

export default FriendSearch;
const FriendSearchDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) =>
    props.layoutMenu === "friendsearch" ? "block" : "none"};
`;

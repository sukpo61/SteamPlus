import React from "react";
import { friendsearchbutton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function FriendSearch() {
  const friendsearchBoolean = useRecoilValue(friendsearchbutton);

  return (
    <FriendSearchDiv friendsearchBoolean={friendsearchBoolean}>
      FriendSearch
    </FriendSearchDiv>
  );
}

export default FriendSearch;
const FriendSearchDiv = styled.div<{ friendsearchBoolean: Boolean }>`
  width: 400px;
  height: 100%;
  background: blue;
  position: fixed;
  left: ${(props) => (props.friendsearchBoolean ? "100px" : "-500px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  border-top-right-radius: 30px;
`;

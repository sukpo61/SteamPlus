import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState } from "recoil";

function FriendTab() {
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  const LayoutButtonOnClick = (i: string) => {
    if (layoutMenu === i) {
      setLayoutMenu("close");
    } else {
      setLayoutMenu(i);
    }
  };

  return (
    <MenuTitleFlex>
      <FriendMenuDiv
        layoutMenu={layoutMenu}
        onClick={() => LayoutButtonOnClick("friend")}
      >
        Friend
      </FriendMenuDiv>
      <FriendSearchMenuDiv
        layoutMenu={layoutMenu}
        onClick={() => LayoutButtonOnClick("friendsearch")}
      >
        Friend Search
      </FriendSearchMenuDiv>
      <FriendAddDiv
        layoutMenu={layoutMenu}
        onClick={() => LayoutButtonOnClick("friendadd")}
      >
        Friend Add
      </FriendAddDiv>
    </MenuTitleFlex>
  );
}

export default FriendTab;

const MenuTitleFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;
const FriendMenuDiv = styled.h2<{ layoutMenu: String }>`
  background-color: ${(props) =>
    props.layoutMenu === "friend" ? "yellow" : "none"};
  cursor: pointer;
`;
const FriendSearchMenuDiv = styled.h2<{ layoutMenu: String }>`
  background-color: ${(props) =>
    props.layoutMenu === "friendsearch" ? "yellow" : "none"};
  cursor: pointer;
`;
const FriendAddDiv = styled.h2<{ layoutMenu: String }>`
  background-color: ${(props) =>
    props.layoutMenu === "friendadd" ? "yellow" : "none"};
  cursor: pointer;
`;

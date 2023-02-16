import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function FriendTab() {
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  // //친구 알림 내역
  // const [FriendNoticeLength] = useRecoilValue<any>(FriendNoticeAll);
  // // console.log(FriendNoticeLength);

  const FriendButtonOnClick = (i: string) => {
    setLayoutMenu(i);
  };

  return (
    <MenuTitleFlex>
      <FriendMenuDiv
        layoutMenu={layoutMenu}
        onClick={() => FriendButtonOnClick("friend")}
      >
        친구리스트
      </FriendMenuDiv>
      <FriendSearchMenuDiv
        layoutMenu={layoutMenu}
        onClick={() => FriendButtonOnClick("friendsearch")}
      >
        유저 검색
      </FriendSearchMenuDiv>
      <FriendAddDiv
        layoutMenu={layoutMenu}
        onClick={() => FriendButtonOnClick("friendadd")}
      >
        친구 요청
      </FriendAddDiv>
    </MenuTitleFlex>
  );
}

export default FriendTab;

const MenuTitleFlex = styled.div`
  width: 350px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto 0;
  font-size: 16px;
  color: #777d87;
  background-color: #192030;
  border-radius: 8px;
  overflow: hidden;
`;
const FriendMenuDiv = styled.h2<{ layoutMenu: String }>`
  width: 117px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  box-shadow: ${(props) =>
    props.layoutMenu === "friend"
      ? "0px 0px 15px 10px rgba(0, 0, 0, 0.25);"
      : "none"};
  background-color: ${(props) =>
    props.layoutMenu === "friend" ? "#263245" : "none"};
  color: ${(props) => (props.layoutMenu === "friend" ? "#00B8C8" : "none")};
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #263245;
  }
`;
const FriendSearchMenuDiv = styled.h2<{ layoutMenu: String }>`
  width: 116px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  box-shadow: ${(props) =>
    props.layoutMenu === "friendsearch"
      ? "0px 0px 15px 10px rgba(0, 0, 0, 0.25);"
      : "none"};
  background-color: ${(props) =>
    props.layoutMenu === "friendsearch" ? "#263245" : "none"};
  color: ${(props) =>
    props.layoutMenu === "friendsearch" ? "#00B8C8" : "none"};
  &:hover {
    background-color: #263245;
  }
  transition: 0.5s ease;
  cursor: pointer;
`;
const FriendAddDiv = styled.h2<{ layoutMenu: String }>`
  width: 117px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  box-shadow: ${(props) =>
    props.layoutMenu === "friendadd"
      ? "0px 0px 15px 10px rgba(0, 0, 0, 0.25);"
      : "none"};
  background-color: ${(props) =>
    props.layoutMenu === "friendadd" ? "#263245" : "none"};
  color: ${(props) => (props.layoutMenu === "friendadd" ? "#00B8C8" : "none")};
  &:hover {
    background-color: #263245;
  }
  transition: 0.5s ease;
  cursor: pointer;
`;

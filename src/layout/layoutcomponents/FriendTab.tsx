import React from "react";
import { LayoutButton, getFriend, newFriendAdd } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FriendProps } from "./Friend";

function FriendTab() {
  const myId = 1;
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);

  // //친구 알림 내역
  // const [FriendNoticeLength] = useRecoilValue<any>(FriendNoticeAll);
  // // console.log(FriendNoticeLength);

  //양쪽 다 친구 내역
  const friend = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friendAdd.length; t++) {
      if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        return i.myId === myId;
      } else if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        return i.myId === myId;
      }
    }
  });

  //친구 요청 온 내역만 (내 친구내역엔 없고 상대 친구내역엔 있는 상태)
  const friendAddCome = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friend.length; t++) {
      if (friend[t].friendId === i.myId && friend[t].myId === i.friendId) {
        return;
      }
    }
    return i.friendId === myId;
  });

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
        {friendAddCome.length === 0 ? (
          ""
        ) : (
          <FriendNotice>{friendAddCome.length}</FriendNotice>
        )}
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
  position: relative;
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

const FriendNotice = styled.div`
  position: absolute;
  top: 5px;
  left: 15px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
  font-weight: 500;
`;

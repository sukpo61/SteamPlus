import React, { useEffect } from "react";
import {
  LayoutButton,
  getFriend,
  friendAllState,
  newFriendAdd,
} from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import FriendTab from "./FriendTab";
import FriendContextMenu from "./FriendContextMenu";
import { FriendSearchProps } from "./FriendSearch";
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export interface FriendProps {
  id: any;
  myId: string;
  friendId: string;
  myNickName: string;
  friendNickName: string;
  myProfileimg: string;
  friendProfileimg: string;
}

function Friend() {
  const queryClient = useQueryClient();
  // //화면 기준 x,y좌표
  // const element = document.getElementById("my-element");
  // const rect = element?.getBoundingClientRect();

  //친구 내역 전체 불러오기
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);

  //친구 우클릭
  const [menuPosition, setMenuPosition] = useState<{
    xPos: string;
    yPos: string;
  }>({
    xPos: "-1000px",
    yPos: "-1000px",
  });

  const myId = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  //양쪽 다 친구 내역
  const allFriendList = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friendAdd.length; t++) {
      if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId &&
        frendSearchInput === ""
      ) {
        return i.myId === myId;
      } else if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        const lowercaseNickname = i.friendNickName.toLowerCase();
        const lowercaseSearchInput = frendSearchInput.toLowerCase();
        return (
          i.myId === myId && lowercaseNickname.includes(lowercaseSearchInput)
        );
      }
    }
  });

  //자동업데이트 되는 친구 계정 바로 가져오기
  const friend = friendAllRecoil.filter((i: FriendSearchProps) => {
    for (let t = 0; t < allFriendList.length; t++) {
      if (allFriendList[t].friendId === i.id) {
        return true;
      }
    }
    return false;
  });

  // //친구 우클릭
  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setMenuPosition({
      xPos: `${event.screenX}px`,
      yPos: `${event.screenY - 140}px`,
    });
  };

  const handleCloseContextMenu = () => {
    setMenuPosition({ xPos: "-1000px", yPos: "-1000px" });
  };

  useEffect(() => {
    const handleWindowClick = () => {
      handleCloseContextMenu();
    };

    if (menuPosition.xPos !== "-1000px" && menuPosition.yPos !== "-1000px") {
      //클릭하면 추가
      window.addEventListener("click", handleWindowClick);
    } else {
      //클릭하면 이벤트 삭제
      window.removeEventListener("click", handleWindowClick);
    }

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [menuPosition]);

  //친구 온라인 상태확인
  const isFriendOnline = (lastLogin: string): boolean => {
    const TEN_MINUTES = 60 * 1000; //1분
    const date = new Date();
    const lastLoginDate = new Date(lastLogin);
    const diffInMs = date.getTime() - lastLoginDate.getTime();
    const diffInSec = Math.round(diffInMs / 1000);
    return diffInSec < TEN_MINUTES / 1000;
  };

  return (
    <FriendDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />
        <MenuTitleIform>
          <MenuTitleInput
            onChange={frendSearchOnChange}
            placeholder={"친구 검색"}
          ></MenuTitleInput>
        </MenuTitleIform>
        <MenuTitleh2>친구 {friend.length}명</MenuTitleh2>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friend?.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv onContextMenu={handleContextMenu}>
            <FriendContextMenu
              xPos={menuPosition.xPos}
              yPos={menuPosition.yPos}
              onClose={handleCloseContextMenu}
              id={i.id}
            />

            <FriendBoxNameDiv>
              <FriendBoxNameImgDiv>
                <FriendBoxNameImg src={i.profileimg} />

                {/* 온라인표시 */}
                {i.login && isFriendOnline(i.lastLogin) ? (
                  <FriendBoxNameOnline />
                ) : (
                  <FriendBoxNameOffline />
                )}
              </FriendBoxNameImgDiv>

              <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

              <FriendBoxNamePlayingP>
                `Dave the Diver`방 참여중
              </FriendBoxNamePlayingP>

              <FriendBoxNotice>7</FriendBoxNotice>
            </FriendBoxNameDiv>
          </FriendBoxDiv>
        );
      })}
    </FriendDiv>
  );
}

export default Friend;
const FriendDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "friend" ? "block" : "none")};
  margin-top: 160px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 160px;
  background-color: #263245;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 30px;
  z-index: 99999999999;
`;
const MenuTitleIform = styled.form`
  position: relative;
  margin: 0 auto;
`;

const MenuTitleh2 = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  margin-left: 24px;
  margin-top: 12px;
`;
const MenuTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  margin: 20px auto 0px auto;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
  color: #fff;
  text-indent: 10px;
`;

const FriendBoxDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  //수정
  height: 60px;
  background-color: #263245;
  cursor: pointer;
`;
const FriendBoxNameDiv = styled.div`
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #192030;
  }
`;
const FriendBoxNameImgDiv = styled.div`
  position: relative;
`;
const FriendBoxNameImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const FriendBoxNameOnline = styled.div`
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-color: #23de79;
  border-radius: 50%;
  border: 1px solid #777d87;
`;
const FriendBoxNameOffline = styled.div`
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-color: #404b5e;
  border-radius: 50%;
  border: 1px solid #777d87;
`;
const FriendBoxNameH2 = styled.h2`
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
`;
const FriendBoxNamePlayingP = styled.p`
  font-size: 10px;
  color: #a7a9ac;
`;
const FriendBoxNotice = styled.div`
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background-color: #ff5b5b;
  border-radius: 50%;
  margin-left: auto;
`;

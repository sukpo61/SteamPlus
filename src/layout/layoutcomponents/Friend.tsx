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
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export interface FriendProps {
  id: string;
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

  //친구 우클릭
  const [menuPosition, setMenuPosition] = useState<{
    xPos: string;
    yPos: string;
  }>({
    xPos: "-1000px",
    yPos: "-1000px",
  });

  const myId = localStorage.getItem("steamid");
  const myNickName = localStorage.getItem("nickName");

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  // // 친구 삭제
  // const DeleteMutation = useMutation(
  //   //넘겨받은 id를 삭제
  //   (id) => axios.delete(`http://localhost:3001/friend/${id}`),
  //   {
  //     onSuccess: () => {
  //       // 쿼리 무효화
  //       queryClient.invalidateQueries("friend");
  //       queryClient.invalidateQueries("friendsearch");
  //     },
  //   }
  // );

  // //친구 삭제 인데 +1 된것 까지 삭제 혹은 그 반대로 +1이 없는 것 까지 삭제
  // const friendDeleteOnClick = (id: any) => {
  //   const deleteAll: any = id + "1";
  //   const deleteAll2: any = id.slice(0, -1);
  //   DeleteMutation.mutate(id);
  //   DeleteMutation.mutate(deleteAll);
  //   DeleteMutation.mutate(deleteAll2);
  // };

  //양쪽 다 친구 내역
  const friend = getFriendAuth?.filter((i: FriendProps) => {
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
      {friend?.map((i: FriendProps) => {
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
                <FriendBoxNameImg></FriendBoxNameImg>

                {/* 온라인표시 */}
                <FriendBoxNameOnline />
              </FriendBoxNameImgDiv>

              <FriendBoxNameH2>{i.friendNickName}</FriendBoxNameH2>

              <FriendBoxNamePlayingP>
                `Dave the Diver`방 참여중
              </FriendBoxNamePlayingP>

              <FriendBoxNotice>11</FriendBoxNotice>
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
const FriendBoxNameImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 0px;
  margin-right: 10px;
  background-color: #ccc;
`;
const FriendBoxNameOnline = styled.div`
  position: absolute;
  bottom: 0;
  width: 15px;
  height: 15px;
  background-color: #23de79;
  border-radius: 50%;
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

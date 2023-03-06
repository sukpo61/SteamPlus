import React from "react";
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
import { v4 as uuidv4 } from "uuid";
import FriendTab from "./FriendTab";
import { FriendProps } from "./Friend";
export interface FriendSearchProps {
  id: string;
  profileimg: string;
  nickname: string;
  login: boolean;
  lastLogin: any;
}

function FriendSearch() {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  const queryClient = useQueryClient();
  const myId = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");
  const myProfileImg = sessionStorage.getItem("profileimg");

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);
  // //아이디
  // const [myId] = useRecoilValue(myIds);
  // const [myNickName] = useRecoilValue(myNickNames);

  // console.log(myId);

  //친구 추가
  const postMutation = useMutation(
    (friendAdd: object) => axios.post(`${DATABASE_ID}/friend`, friendAdd),
    {
      onSuccess: () => {
        // 쿼리 무효화
        queryClient.invalidateQueries(["friend"]);
        queryClient.invalidateQueries(["friendsearch"]);
      },
    }
  );

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  // const friendAddOnClick = (i: FriendSearchProps) => {
  //   let friendAdd = {
  //     id: uuidv4(),
  //     myId,
  //     friendId: i.id,
  //     myNickName,
  //     friendNickName: i.nickname,
  //   };

  //   postMutation.mutate(friendAdd);
  // };

  const friendAddOnClick = async (i: FriendSearchProps) => {
    let friendAdd = {
      id: uuidv4(),
      myId,
      friendId: i.id,
      myNickName,
      friendNickName: i.nickname,
    };
    try {
      // const response = getFriendAuth.filter(
      //   (item) => item.myId === myId && item.friendId === i.id
      // );
      //상대와 친구가 돼있는지 검사후 이중 저장 방지
      const response = await axios.get(
        `${DATABASE_ID}/friend?myId=${myId}&friendId=${i.id}`
      );

      const existingFriend = response.data[0];
      console.log(existingFriend);

      if (existingFriend) {
        console.log("이미 친구");
        return;
      }
      postMutation.mutate(friendAdd);
    } catch (error) {
      console.error(error);
    }
  };

  //이미 친구인 목록
  // 계정목록과 친구목록을 불러온 후 친구목록중 내 친구목록인 것 구한다.
  //그친구목록의 친구 id가 일치하는 계정 목록을 불러옴
  const alreadyFriend = friendAllRecoil?.filter((i: FriendSearchProps) => {
    for (let t = 0; t < getFriendAuth.length; t++) {
      if (frendSearchInput === "") {
        return false;
      } else if (
        getFriendAuth[t].friendId === i.id &&
        getFriendAuth[t].myId === myId
      ) {
        const lowercaseNickname = i?.nickname.toLowerCase();
        const lowercaseSearchInput = frendSearchInput?.toLowerCase();
        return lowercaseNickname?.includes(lowercaseSearchInput);
      }
    }
  });

  //auth 가져온후 검색한것만 map
  const friendSearch = friendAllRecoil?.filter((i: FriendSearchProps) => {
    for (let item = 0; item < friendAdd.length; item++) {
      if (i.id === friendAdd[item].myId) {
        return false;
      }
    }
    // 현재 친구상태면 안보이게
    for (let t = 0; t < alreadyFriend.length; t++) {
      if (alreadyFriend[t].id === i.id) {
        return false;
      }
    }
    //대문자 검색
    const lowercaseNickname = i.nickname?.toLowerCase();
    const lowercaseSearchInput = frendSearchInput?.toLowerCase();
    if (i.id === myId) {
      return false;
    } else if (frendSearchInput === "") {
      return false;
    } else if (lowercaseNickname.includes(lowercaseSearchInput)) {
      return true;
    }
    //특정문자열이 포함되면 true반환
    //자신은 안뜨고 검색한것만
    // for문 밖으로 return값을 빼내니까 영어검색 작동
  });

  return (
    <FriendSearchDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />

        <MenuTitleInput
          onChange={frendSearchOnChange}
          placeholder="유저 검색"
        ></MenuTitleInput>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {alreadyFriend?.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv key={i.id}>
            <FriendBoxNameImg src={i.profileimg} />
            <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

            <FriendBoxNameP></FriendBoxNameP>
          </FriendBoxDiv>
        );
      })}
      {friendSearch?.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv key={i.id}>
            <FriendBoxNameImg src={i.profileimg} />
            <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

            <FriendBoxNameP onClick={() => friendAddOnClick(i)}>
              +
            </FriendBoxNameP>
          </FriendBoxDiv>
        );
      })}
    </FriendSearchDiv>
  );
}

export default FriendSearch;
const FriendSearchDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) =>
    props.layoutMenu === "friendsearch" ? "block" : "none"};
  margin-top: 140px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 130px;
  background-color: #263245;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 30px;
`;
const MenuTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  margin: 0 auto 10px auto;
  color: #fff;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
  text-indent: 10px;
`;

const FriendBoxDiv = styled.div`
  width: 100%;
  padding: 0 25px;
  height: 60px;
  background-color: #263245;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #192030;
  }
`;
const FriendBoxNameImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const FriendBoxNameH2 = styled.h2`
  font-size: 14px;
  color: #fff;
`;
const FriendBoxNameP = styled.p`
  color: #00b8c8;
  margin-left: auto;
  font-size: 28px;
  cursor: pointer;
`;

import React from "react";
import { LayoutButton, getFriend, friendAllState } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import FriendTab from "./FriendTab";
import { FriendProps } from "./Friend";
export interface FriendSearchProps {
  id: Number;
  uid: Number;
  nickname: String;
}

function FriendSearch() {
  const queryClient = useQueryClient();
  const myId = 1;
  const myNickName = "고양이";

  // const myId = 2;
  // const myNickName = "강아지";

  // const myId = 3;
  // const myNickName = "호랑이";

  // const myId = 7;
  // const myNickName = "Cat";

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  console.log(getFriend);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);
  console.log(friendAllRecoil);

  //친구 추가
  const postMutation = useMutation(
    (friendAdd: object) =>
      axios.post("http://localhost:3001/friend", friendAdd),
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

  const friendAddOnClick = (i: FriendSearchProps) => {
    let friendAdd = {
      id: uuidv4(),
      myId,
      friendId: i.id,
      myNickName,
      friendNickName: i.nickname,
    };

    postMutation.mutate(friendAdd);
  };

  //친구 요청 온 내역 전체
  const friendAdd = getFriendAuth?.filter((i: FriendProps) => {
    // for (let t = 0; t < data?.data.length; t++){
    //   if(data?.data[t].friendId)
    // }
    return myId === i.friendId;
  });
  console.log(friendAdd);

  //이미 친구인 목록
  // 계정목록과 친구목록을 불러온 후 친구목록중 내 친구목록인 것 구한다.
  //그친구목록의 친구 id가 일치하는 계정 목록을 불러옴
  const alreadyFriend = friendAllRecoil?.filter((i: FriendSearchProps) => {
    for (let t = 0; t < getFriendAuth.length; t++) {
      if (frendSearchInput === "") {
        return;
      } else if (
        getFriendAuth[t].friendId === i.id &&
        getFriendAuth[t].myId === myId
      ) {
        const lowercaseNickname = i.nickname.toLowerCase();
        const lowercaseSearchInput = frendSearchInput.toLowerCase();
        return lowercaseNickname.includes(lowercaseSearchInput);
      }
    }
  });

  //auth 가져온후 검색한것만 map
  const friendSearch = friendAllRecoil?.filter((i: FriendSearchProps) => {
    for (let t = 0; t < friendAdd.length; t++) {
      console.log(i.id === friendAdd[t].myId);

      if (frendSearchInput === "") {
        return;
      } else if (
        //
        i.id === friendAdd[t].myId
      ) {
        return;
      } else {
        // 현재 친구상태면 안보이게
        for (let t = 0; t < alreadyFriend.length; t++) {
          if (alreadyFriend[t].id === i.id) {
            return;
          }
        }
        //대문자 검색
        const lowercaseNickname = i.nickname.toLowerCase();
        const lowercaseSearchInput = frendSearchInput.toLowerCase();
        return (
          i.id !== myId && lowercaseNickname.includes(lowercaseSearchInput)
        );
        //특정문자열이 포함되면 true반환
        //자신은 안뜨고 검색한것만
        // for문 밖으로 return값을 빼내니까 영어검색 작동
      }
    }
  });

  return (
    <FriendSearchDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />

        <MenuTitleInput onChange={frendSearchOnChange}></MenuTitleInput>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {alreadyFriend?.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameImg></FriendBoxNameImg>
            <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

            <FriendBoxNameP></FriendBoxNameP>
          </FriendBoxDiv>
        );
      })}
      {friendSearch?.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameImg></FriendBoxNameImg>
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
  margin-top: 150px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 130px;
  background-color: #404b5e;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 30px;
`;
const MenuTitleFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
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
`;

const FriendBoxDiv = styled.div`
  margin: 30px auto 0;
  width: 350px;
  height: 100px;
  background-color: #263245;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FriendBoxNameImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 30px;
  margin-right: 10px;
  background-color: #ccc;
`;
const FriendBoxNameH2 = styled.h2`
  color: #fff;
`;
const FriendBoxNameP = styled.p`
  color: #fff;
  margin-left: auto;
  margin-right: 30px;
  font-size: 32px;
  cursor: pointer;
`;

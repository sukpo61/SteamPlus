import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface FriendProps {
  myId: Number;
  friendId: Number;
  myNickName: String;
  friendNickName: String;
}

function Friend() {
  const myId = 1;

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  const LayoutButtonOnClick = (i: string) => {
    if (layoutMenu === i) {
      setLayoutMenu("close");
    } else {
      setLayoutMenu(i);
    }
  };

  const getFriend = async () => {
    const response = await axios.get("http://localhost:3001/friend");
    return response;
  };
  const { isLoading, isError, data, error } = useQuery("friend", getFriend);
  if (isLoading) {
    return <p>로딩중임</p>;
  }
  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }
  // console.log(data?.data);
  const friend = data?.data.filter((i: FriendProps) => {
    if (frendSearchInput === "") {
      return i.myId === myId;
    } else {
      const lowercaseNickname = i.friendNickName.toLowerCase();
      const lowercaseSearchInput = frendSearchInput.toLowerCase();
      return (
        i.myId === myId && lowercaseNickname.includes(lowercaseSearchInput)
      );
    }
  });
  // console.log(friend);

  return (
    <FriendDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        <MenuTitleFlex>
          <FriendMenuDiv>Friend</FriendMenuDiv>
          <FriendSearchMenuDiv
            onClick={() => LayoutButtonOnClick("friendsearch")}
          >
            Friend Search
          </FriendSearchMenuDiv>
        </MenuTitleFlex>

        <MenuTitleIform>
          <MenuTitleInput onChange={frendSearchOnChange}></MenuTitleInput>
          {/* <MenuTitleButton>확인</MenuTitleButton> */}
        </MenuTitleIform>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friend.map((i: FriendProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameDiv>
              <FriendBoxNameImg></FriendBoxNameImg>
              <FriendBoxNameH2>{i.friendNickName}</FriendBoxNameH2>

              <FriendBoxNameP>온라인</FriendBoxNameP>
            </FriendBoxNameDiv>

            <FriendGamingDiv>
              <h2>dave diver방 참가중</h2>
              <h2>참가하기</h2>
            </FriendGamingDiv>
          </FriendBoxDiv>
        );
      })}
    </FriendDiv>
  );
}

export default Friend;
const FriendDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "friend" ? "block" : "none")};
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
const FriendMenuDiv = styled.h2`
  background-color: yellow;
  cursor: pointer;
`;
const FriendSearchMenuDiv = styled.h2`
  cursor: pointer;
`;
const MenuTitleIform = styled.form`
  position: relative;
  margin: 0 auto;
`;
const MenuTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  margin: 0 auto 10px auto;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
  color: #fff;
`;

const FriendBoxDiv = styled.div`
  margin: 30px auto 0;
  width: 350px;
  height: 140px;
  background-color: #263245;
  border-radius: 10px;
`;
const FriendBoxNameDiv = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: center;
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
`;
const FriendGamingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  justify-content: space-around;
`;

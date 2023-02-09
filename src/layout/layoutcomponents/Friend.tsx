import React from "react";
import { friendbutton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import axios from "axios";

interface FriendProps {
  myId: Number;
  friendId: Number;
  myNickName: String;
  friendNickName: String;
}

function Friend() {
  const friendBoolean = useRecoilValue(friendbutton);
  const myId = 1;

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
  console.log(data?.data);
  const friend = data?.data.filter((i: FriendProps) => {
    return i.myId === myId;
  });
  // console.log(friend);

  return (
    <FriendDiv friendBoolean={friendBoolean}>
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

      {/* <FriendBoxDiv>
        <FriendBoxNameDiv>
          <FriendBoxNameImg></FriendBoxNameImg>
          <FriendBoxNameH2>친구</FriendBoxNameH2>

          <FriendBoxNameP>온라인</FriendBoxNameP>
        </FriendBoxNameDiv>

        <FriendGamingDiv>
          <h2>dave diver방 참가중</h2>
          <h2>참가하기</h2>
        </FriendGamingDiv>
      </FriendBoxDiv> */}
    </FriendDiv>
  );
}

export default Friend;
const FriendDiv = styled.div<{ friendBoolean: Boolean }>`
  width: 400px;
  height: 100%;
  background: blue;
  position: fixed;
  left: ${(props) => (props.friendBoolean ? "100px" : "-500px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  border-top-right-radius: 30px;
`;
const FriendBoxDiv = styled.div`
  margin: 30px auto 0;
  width: 350px;
  height: 140px;
  background-color: #192030;
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

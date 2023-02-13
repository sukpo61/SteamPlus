import React from "react";
import {
  LayoutButton,
  friendAddState,
  friendAllState,
} from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import FriendTab from "./FriendTab";
import { useEffect } from "react";

//void ?? string ??
export interface FriendProps {
  id: String;
  myId: Number;
  friendId: Number;
  myNickName: String;
  friendNickName: String;
}

function Friend() {
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

  const [friendAddRecoil, setFriendAddRecoil] = useRecoilState(friendAddState);
  console.log(friendAddRecoil);

  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);
  console.log(friendAllRecoil);

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  // 친구 삭제
  const DeleteMutation = useMutation(
    //넘겨받은 id를 삭제
    (id) => axios.delete(`http://localhost:3001/friend/${id}`),
    {
      onSuccess: () => {
        // 쿼리 무효화
        queryClient.invalidateQueries("friend");
        queryClient.invalidateQueries("friendsearch");
      },
    }
  );

  //친구 삭제 인데 +1 된것 까지 삭제 혹은 그 반대로 +1이 없는 것 까지 삭제
  const friendDeleteOnClick = (id: any) => {
    const deleteAll: any = id + "1";
    const deleteAll2: any = id.slice(0, -1);
    DeleteMutation.mutate(id);
    DeleteMutation.mutate(deleteAll);
    DeleteMutation.mutate(deleteAll2);
  };

  const getFriend = async () => {
    const response = await axios.get("http://localhost:3001/friend");
    return response;
  };

  const { isLoading, isError, data, error } = useQuery("friend", getFriend, {
    onSuccess: () => {
      // setFriendAddRecoil(friendAdd);
      // setFriendAllRecoil(friend);
    },
  });

  //친구 요청 온 내역 전체
  const friendAdd = data?.data.filter((i: FriendProps) => {
    return i.friendId === myId;
  });

  //양쪽 다 친구 내역
  const friend = data?.data.filter((i: FriendProps) => {
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

  // //내가 친구 요청 보낸 내역 (내 친구내역만 있고 상대 친구내역엔 없는 상태)
  // const friendAddSend = data?.data.filter((i: FriendProps) => {
  //   //만약 친구 요청온 것의 myid와 frendid / frendid와 myid가 같다면 제외
  //   for (let t = 0; t < friendAdd.length; t++) {
  //     if (
  //       friendAdd[t].friendId === i.myId &&
  //       friendAdd[t].myId === i.friendId
  //     ) {
  //       return;
  //     }
  //   }
  //   return i.myId === myId && frendSearchInput === "";
  // });

  // //친구 요청 온 내역만 (내 친구내역엔 없고 상대 친구내역엔 있는 상태)
  // const friendAddCome = data?.data.filter((i: FriendProps) => {
  //   for (let t = 0; t < friend.length; t++) {
  //     if (friend[t].friendId === i.myId && friend[t].myId === i.friendId) {
  //       return;
  //     }
  //   }
  //   return i.friendId === myId && frendSearchInput === "";
  // });

  useEffect(() => {
    setFriendAddRecoil(friendAdd);
    setFriendAllRecoil(friend);
  }, [isLoading]);

  if (isLoading) {
    return <p>로딩중임</p>;
  }

  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }

  return (
    <FriendDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />

        <MenuTitleIform>
          <MenuTitleInput onChange={frendSearchOnChange}></MenuTitleInput>
          {/* <MenuTitleButton>확인</MenuTitleButton> */}
        </MenuTitleIform>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friend?.map((i: FriendProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameDiv>
              <FriendBoxNameImg></FriendBoxNameImg>
              <FriendBoxNameH2>{i.friendNickName}</FriendBoxNameH2>

              <FriendBoxNameP
                onClick={() => {
                  friendDeleteOnClick(i.id);
                }}
              >
                삭제
              </FriendBoxNameP>
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
  margin: 10px auto 0;
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
  cursor: pointer;
`;
const FriendGamingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  justify-content: space-around;
`;

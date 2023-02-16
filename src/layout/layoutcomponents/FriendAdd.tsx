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
import FriendTab from "./FriendTab";
import { FriendProps } from "./Friend";

function Friend() {
  const queryClient = useQueryClient();

  const myId = localStorage.getItem("steamid");
  const myNickName = localStorage.getItem("nickName");

  // const myId = 2;
  // const myNickName = "강아지";

  // const myId = 3;
  // const myNickName = "호랑이";

  // const myId = 7;
  // const myNickName = "Cat";

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };
  //친구 내역 전체 불러오기
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //친구 요청 온 내역 전체
  const [friendAdd] = useRecoilValue(newFriendAdd);

  //친구 수락
  const postMutation = useMutation(
    (friendAdd: object) =>
      axios.post("http://localhost:3001/friend", friendAdd),
    {
      onSuccess: () => {
        // 쿼리 무효화
        queryClient.invalidateQueries("friend");
        queryClient.invalidateQueries("friendsearch");
      },
    }
  );

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

  //친구 수락
  const friendAddOnClick = async (i: FriendProps) => {
    let friendAdd = {
      id: i.id + "1",
      myId: i.friendId,
      friendId: i.myId,
      myNickName: i.friendNickName,
      friendNickName: i.myNickName,
    };

    try {
      //상대와 친구가 돼있는지 검사후 이중 저장 방지
      const response = await axios.get(
        `http://localhost:3001/friend?myId=${i.friendId}&friendId=${myId}`
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
  //친구 삭제 인데 +1 된것 까지 삭제 혹은 그 반대로 +1이 없는 것 까지 삭제
  const friendDeleteOnClick = (id: any) => {
    const deleteAll: any = id + "1";
    const deleteAll2: any = id.slice(0, -1);
    DeleteMutation.mutate(id);
    DeleteMutation.mutate(deleteAll);
    DeleteMutation.mutate(deleteAll2);
  };

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

  //내가 친구 요청 보낸 내역 (내 친구내역만 있고 상대 친구내역엔 없는 상태)
  const friendAddSend = getFriendAuth?.filter((i: FriendProps) => {
    //만약 친구 요청온 것의 myid와 frendid / frendid와 myid가 같다면 제외
    for (let t = 0; t < friendAdd.length; t++) {
      if (
        friendAdd[t].friendId === i.myId &&
        friendAdd[t].myId === i.friendId
      ) {
        return;
      }
    }
    return i.myId === myId && frendSearchInput === "";
  });

  //친구 요청 온 내역만 (내 친구내역엔 없고 상대 친구내역엔 있는 상태)
  const friendAddCome = getFriendAuth?.filter((i: FriendProps) => {
    for (let t = 0; t < friend.length; t++) {
      if (friend[t].friendId === i.myId && friend[t].myId === i.friendId) {
        return;
      }
    }
    return i.friendId === myId && frendSearchInput === "";
  });

  return (
    <FriendDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        {/* 세개의 탭 */}
        <FriendTab />
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friendAddCome.length === 0 ? (
        ""
      ) : (
        <FriendAddH2>수락 대기 중</FriendAddH2>
      )}
      {friendAddCome?.map((i: FriendProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameDiv>
              <FriendBoxNameImg src={i.myProfileimg} />
              <FriendBoxNameH2>{i.myNickName}</FriendBoxNameH2>

              <FriendBoxNameH3
                onClick={() => {
                  friendAddOnClick(i);
                }}
              >
                수락
              </FriendBoxNameH3>
              <FriendBoxNameP
                onClick={() => {
                  friendDeleteOnClick(i.id);
                }}
              >
                거절
              </FriendBoxNameP>
            </FriendBoxNameDiv>
          </FriendBoxDiv>
        );
      })}
      {friendAddSend.length === 0 ? (
        ""
      ) : (
        <FriendAddH2>전송된 친구 요청</FriendAddH2>
      )}
      {friendAddSend?.map((i: FriendProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameDiv>
              <FriendBoxNameImg src={i.friendProfileimg} />
              <FriendBoxNameH2>{i.friendNickName}</FriendBoxNameH2>

              <FriendBoxCancelP
                onClick={() => {
                  friendDeleteOnClick(i.id);
                }}
              >
                취소
              </FriendBoxCancelP>
            </FriendBoxNameDiv>
          </FriendBoxDiv>
        );
      })}
    </FriendDiv>
  );
}

export default Friend;
const FriendDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "friendadd" ? "block" : "none")};
  margin-top: 80px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 70px;
  background-color: #263245;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 30px;
`;

const FriendAddH2 = styled.h2`
  font-size: 13px;
  color: #d4d4d4;
  margin: 16px 0 16px 25px;
`;

const FriendBoxDiv = styled.div`
  margin: 0px auto;
  width: 350px;
  height: 60px;
  background-color: #263245;
  display: flex;
  align-items: center;
`;
const FriendBoxNameDiv = styled.div`
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const FriendBoxNameImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const FriendBoxNameH2 = styled.h2`
  color: #fff;
`;
const FriendBoxNameH3 = styled.h3`
  color: #fff;
  margin-left: auto;
  margin-right: 8px;
  width: 40px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  border-radius: 8px;
  background-color: #00b8c8;
  font-weight: 500;
  margin-left: auto;
  text-align: center;
  cursor: pointer;
`;

const FriendBoxNameP = styled.p`
  color: #fff;
  width: 40px;
  height: 24px;
  line-height: 24px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 8px;
  background-color: #404b5e;
  text-align: center;
  cursor: pointer;
`;

const FriendBoxCancelP = styled.p`
  color: #fff;
  width: 40px;
  height: 24px;
  line-height: 24px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 8px;
  margin-left: auto;
  background-color: #404b5e;
  text-align: center;
  margin-left: auto;
  cursor: pointer;
`;

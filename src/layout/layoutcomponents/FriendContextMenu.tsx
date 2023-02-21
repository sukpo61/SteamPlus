import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { getFriend } from "../../recoil/atom";
import { FriendProps } from "./Friend";

function FriendContextMenu({ xPos, yPos, id, onClose }: any) {
  const queryClient = useQueryClient();
  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);

  const handleClick = () => {
    onClose();
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

  //찾아온 친구 id 를이용해 두개다 삭제
  const friendDeleteOnClick = (id: any) => {
    const friendDelete = getFriendAuth.filter((i) => {
      return id === i.friendId || id === i.myId;
    });

    DeleteMutation.mutate(friendDelete[0].id);
    DeleteMutation.mutate(friendDelete[1].id);
  };

  return (
    <>
      <ContextMenuDiv yPos={yPos} xPos={xPos} onClick={handleClick}>
        <ContextMenuP>참여하기</ContextMenuP>
        <ContextMenuP>채팅삭제 </ContextMenuP>
        <ContextMenuP
          onClick={() => {
            friendDeleteOnClick(id);
          }}
        >
          친구삭제
        </ContextMenuP>
      </ContextMenuDiv>
    </>
  );
}

export default FriendContextMenu;

const ContextMenuDiv = styled.div<{ yPos: string; xPos: string }>`
  position: fixed;
  top: ${(props) => props.yPos};
  left: ${(props) => props.xPos};
  background-color: #192030;
  z-index: 99999999999;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 14px;
  width: 120px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
`;
const ContextMenuP = styled.p`
  padding: 10px 0;
  color: #a7a9ac;
  &:hover {
    color: #00b8c8;
  }
`;

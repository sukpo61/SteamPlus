import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import styled from "styled-components";

function FriendContextMenu({ xPos, yPos, id, onClose }: any) {
  const queryClient = useQueryClient();

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

  //친구 삭제 인데 +1 된것 까지 삭제 혹은 그 반대로 +1이 없는 것 까지 삭제
  const friendDeleteOnClick = (id: any) => {
    const deleteAll: any = id + "1";
    const deleteAll2: any = id.slice(0, -1);
    DeleteMutation.mutate(id);
    DeleteMutation.mutate(deleteAll);
    DeleteMutation.mutate(deleteAll2);
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

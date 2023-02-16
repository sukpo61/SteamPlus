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
        <p
          style={{ padding: "0px 0 10px 0" }}
          onClick={() => {
            friendDeleteOnClick(id);
          }}
        >
          친구 삭제{" "}
        </p>
        <p>채팅 삭제 </p>
      </ContextMenuDiv>
    </>
  );
}

export default FriendContextMenu;

const ContextMenuDiv = styled.div<{ yPos: string; xPos: string }>`
  position: fixed;
  top: ${(props) => props.yPos};
  left: ${(props) => props.xPos};
  border: 1px solid #000;
  background-color: white;
  z-index: 1;
  padding: 0.5rem;
`;

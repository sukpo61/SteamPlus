import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  getFriend,
  currentGameIdRecoil,
  friendroominfoRecoil,
  LayoutButton,
  friendAllState,
  friendChatNotice,
} from "../../recoil/atom";
import { FriendProps } from "./Friend";
import { FriendSearchProps } from "./FriendSearch";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function FriendContextMenu({ xPos, yPos, id, onClose }: any) {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  const myId: any = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");
  const queryClient = useQueryClient();
  //친구 내역 전체
  const [getFriendAuth, setGetFriendAuth] =
    useRecoilState<FriendProps[]>(getFriend);
  //계정 내역 전체 불러오기
  const [friendAllRecoil, setFriendAllRecoil] =
    useRecoilState<FriendSearchProps[]>(friendAllState);
  //개인 채팅 알림
  const [chatTextNotice, setChatTextNotice] =
    useRecoilState<any>(friendChatNotice);
  const [friendroominfo, setFriendRoomInfo] =
    useRecoilState(friendroominfoRecoil);

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  const navigate = useNavigate();

  const handleClick = () => {
    onClose();
  };

  // 친구 삭제
  const DeleteMutation = useMutation(
    //넘겨받은 id를 삭제
    (id) => axios.delete(`${DATABASE_ID}/friend/${id}`),
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
      return (
        (id === i.friendId && i.myId === myId) ||
        (id === i.myId && myId === i.friendId)
      );
    });

    DeleteMutation.mutate(friendDelete[0].id);
    DeleteMutation.mutate(friendDelete[1].id);
  };

  const joinFriendRoom = (userid: any) => {
    socket.emit("friendchannel", userid);
    socket.once("friendchannel", (roomname, frienduserid) => {
      if (frienduserid === userid && roomname) {
        console.log("frjoin", roomname);
        navigate(`/Teamchat/:${roomname.split("/")[0]}`, {
          replace: true,
          state: {
            gameid: roomname.split("/")[0].toString(),
          },
        });
        setFriendRoomInfo({
          roomtitle: roomname.split("/")[1],
          channelId: roomname.split("/")[0],
        });
        setLayoutMenu("voicetalk");
      }
    });
  };
  //먼저 채팅 입장을 누르면 uuid로 된 방을 생성 보낼땐 uuid, id, myid를 모두 보내고
  //서버에서 받은 후 친구에 해당하는 id를 찾아 강제참여 시키고
  // 연결
  // socket.on("friendNickName", () => {
  //   socket.emit("nickName", myId);
  // });
  // let userSocketId: any = [];
  const [userId, setUserId] = useState<any>([]);
  socket.on("userId", (id) => {
    // console.log(id);
    setUserId(id);
    // console.log(userId);
  });

  const ChatOnClick = (id: any) => {
    //선택한 아이디 불러오기
    const clickId = userId.find((i: any) => {
      return i.split("/")[0] === id;
    });
    //선택한 아이디와 내아이디 더하기 (방이름)
    const roomName = parseInt(clickId.split("/")[0]) + parseInt(myId);
    console.log(roomName);
    console.log("joined");
    socket.emit("friendChat", clickId, roomName);
    navigate(`/testchat/:${roomName}`, { state: clickId.split("/")[0] });

    const chatNoticeClear = chatTextNotice.filter((i: any) => {
      if (i.id === id) {
        return false;
      } else {
        return i;
      }
    });
    setChatTextNotice(chatNoticeClear);
    setLayoutMenu("close");
  };

  // socket.on("friendId", (rooms) => {
  //   console.log(rooms);
  // });

  useEffect(() => {
    socket.emit("nickName", myId, socket.id);
  }, [socket.id]);

  const friendLoggin = friendAllRecoil.find((i: any) => {
    return i.id === id;
  });
  // console.log(friendLoggin);

  //친구 온라인 상태확인
  const isFriendOnline = (lastLogin: string): boolean => {
    const TEN_MINUTES = 60 * 1000; //1분
    const date = new Date();
    const lastLoginDate = new Date(lastLogin);
    const diffInMs = date.getTime() - lastLoginDate.getTime();
    const diffInSec = Math.round(diffInMs / 1000);
    return diffInSec < TEN_MINUTES / 1000;
  };

  return (
    <>
      <ContextMenuDiv yPos={yPos} xPos={xPos} onClick={handleClick}>
        <ContextMenuP
          onClick={() => {
            joinFriendRoom(id);
          }}
        >
          참여하기
        </ContextMenuP>
        {friendLoggin?.login && isFriendOnline(friendLoggin?.lastLogin) ? (
          <ContextMenuP onClick={() => ChatOnClick(id)}>1대1 채팅</ContextMenuP>
        ) : (
          ""
        )}

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

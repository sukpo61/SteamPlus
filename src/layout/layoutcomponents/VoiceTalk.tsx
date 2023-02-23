import React, { useEffect, useState } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import socket from "../../socket";
import useInput from "../../hooks/useInput";
import { friendAllState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { FriendSearchProps } from "./FriendSearch";

function VoiceTalk() {
  const layoutMenu = useRecoilValue(LayoutButton);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [roomsInfo, setRoomsInfo] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const channelName = "Dead space";
  const userid = sessionStorage.getItem("steamid");
  const [friendAllRecoil, setFriendAllRecoil] =
    useRecoilState<FriendSearchProps[]>(friendAllState);
  const {
    value: roomtitle,
    setinputValue: setRoomTitle,
    reset: resetTitle,
  } = useInput("");

  console.log(friendAllRecoil);

  const onRoomSubmit = (newroom: any) => {
    if (roomtitle === "") {
      window.alert("제목을 입력하세요");
      return;
    }
    let NewData = {
      roomtitle,
      channelName,
    };
    setCurrentRoom(newroom);
    handleJoin(NewData);
    resetTitle();
    setCreateDisplay(false);
  };

  const RoomCancel = () => {
    setCreateDisplay(false);
    resetTitle();
  };

  const handleJoin = async (NewData: any) => {
    if (currentRoom) {
      socket.emit("join_room", NewData);
    }
    socket.emit("join_room", NewData);
    // await getMedia();dd

    // await startSharing();
  };

  const RoomList = roomsInfo.map((room: any) => {
    return (
      <RoomWrap key={room.name}>
        <RoomTitleWrap>
          <span>#{room.name.split("/")[1]}</span>
          <span></span>
        </RoomTitleWrap>
        {room.name === currentRoom ? (
          <Usercount>
            <Usercircle></Usercircle>
            <span>{room.userinfo.length}</span>
          </Usercount>
        ) : (
          <RoomUserList>현재룸</RoomUserList>
        )}
      </RoomWrap>
    );
  });

  useEffect(() => {
    console.log("socket on");
    socket.on("requestrooms", (roomsinfo: any) => {
      setRoomsInfo(roomsinfo);
    });

    socket.on("updaterooms", (roomsinfo: any) => {
      setRoomsInfo(roomsinfo);
    });
  }, []);

  return (
    <VoiceTalkDiv layoutMenu={layoutMenu}>
      <VoiceTalkWrap>
        <VoiceTalkTop>
          <VoiceTalkTopbar>
            <ChannelTitle>
              <span>{channelName}</span>
              <img src="/img/steam_link.png"></img>
            </ChannelTitle>
            <CreateRoom
              onClick={() => {
                setCreateDisplay(true);
              }}
            >
              + 채팅
            </CreateRoom>
          </VoiceTalkTopbar>
          <RoomTitleInput></RoomTitleInput>
        </VoiceTalkTop>
        {createDisplay && (
          <CreateRoomWrap>
            <CreateTitleInput
              className="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={roomtitle}
              onChange={setRoomTitle}
            ></CreateTitleInput>
            <ConfirmWrap>
              <TitleCancle onClick={RoomCancel}>취소</TitleCancle>
              <TitleConfirm onClick={onRoomSubmit}>확인</TitleConfirm>
            </ConfirmWrap>
          </CreateRoomWrap>
        )}
        <RoomListWrap>{RoomList}</RoomListWrap>
      </VoiceTalkWrap>
      <Controlbox></Controlbox>
    </VoiceTalkDiv>
  );
}

export default VoiceTalk;

const VoiceTalkDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "voicetalk" ? "block" : "none")};
`;

const VoiceTalkWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: white;
`;
const RoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background: #131a28;
  border-radius: 10px;
  padding: 20px;
`;
const RoomTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  background: #131a28;
  border-radius: 10px;
`;
const Usercount = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  color: white;
`;
const RoomUserList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  color: white;
`;
const Usercircle = styled.div`
  margin-right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #23de79;
`;
const ConfirmWrap = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
  flex-direction: row-reverse;
  color: white;
`;
const TitleConfirm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
`;
const TitleCancle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
`;
const CreateRoomWrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: white;
  padding: 20px 24px;
  gap: 12px;
  height: 216px;
  background: #131a28;
  border-radius: 10px;
`;

const CreateTitleInput = styled.input`
  height: 40px;
  border-radius: 10px;
  background-color: #20293d;
  color: #fff;
  border: 0;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  text-indent: 10px;
`;

const Controlbox = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #131a28;
  height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: white;
`;
const RoomListWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const VoiceTalkTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 96px;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const VoiceTalkTopbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CreateRoom = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 60px;
  height: 30px;
  background: #00b8c8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const ChannelTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  color: white;
  line-height: 28px;
  img {
    margin-left: 8px;
  }
  span {
  }
`;

const RoomTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  color: #fff;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
  text-indent: 10px;
`;

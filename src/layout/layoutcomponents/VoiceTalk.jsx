import React, { useEffect, useState, CSSProperties } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import socket from "../../socket";
import useInput from "../../hooks/useInput";
import { friendAllState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { FriendSearchProps } from "./FriendSearch";
import PulseLoader from "react-spinners/PulseLoader";

import {
  chatTextRecoil,
  AllStreamsRecoil,
  DataChannelMapRecoil,
  videoDisplayRecoil,
  currentRoomRecoil,
  videoRoomExitRecoil,
  currentGameIdRecoil,
  friendroominfoRecoil,
  channelNameRecoil,
} from "../../recoil/atom";

import TeamChat from "../../pages/TeamChat";
import { useLocation } from "react-router";

import { MdExitToApp } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { MdVideocam } from "react-icons/md";
import { AiOutlineBorder } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";

import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function VoiceTalk() {
  const layoutMenu = useRecoilValue(LayoutButton);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [roomsInfo, setRoomsInfo] = useState([]);
  const myuserid = sessionStorage.getItem("steamid");

  const [localStream, setLocalStream] = useState(null);

  const [usercount, setUserCount] = useState(2);

  const [checked, setChecked] = useState(false);

  const [RtcPeerConnectionMap, setRtcPeerConnectionMap] = useState(new Map());

  const [password, setPassword] = useState("");

  const [isValid, setIsValid] = useState(true);

  const [DataChannelMap, setDataChannelMap] =
    useRecoilState(DataChannelMapRecoil);

  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);

  const [AllStreams, setAllStreams] = useRecoilState(AllStreamsRecoil);

  const [chatText, setChatText] = useRecoilState(chatTextRecoil);

  const [videoDisplay, setvideoDisplay] = useRecoilState(videoDisplayRecoil);

  const [currentRoom, setCurrentRoom] = useRecoilState(currentRoomRecoil);

  const [videoRoomExit, setVideoRoomExit] = useRecoilState(videoRoomExitRecoil);

  const [channelName, setchannelName] = useRecoilState(channelNameRecoil);

  const [channelId, setchannelId] = useRecoilState(currentGameIdRecoil);

  const [friendroominfo, setFriendRoomInfo] =
    useRecoilState(friendroominfoRecoil);

  const {
    value: roomtitle,
    setinputValue: setRoomTitle,
    reset: resetTitle,
  } = useInput("");

  const navigate = useNavigate();

  const location = useLocation().pathname.split("/")[1];

  const userCountChange = (event) => {
    setUserCount(event.target.value);
  };
  const PasswordChange = () => {
    setChecked((e) => !e);
  };

  const handlePasswordChange = (event) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      setPassword(input);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  async function getMedia() {
    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(myStream);
      handleAddStream(myuserid, myStream);
    } catch (e) {
      console.log(e);
    }
  }

  const startSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setLocalStream(screenStream);

      handleAddStream(myuserid, screenStream);
    } catch (error) {
      console.error("Error starting screen share", error);
    }
  };
  //dsdasd
  const handleAddStream = (userid, stream) => {
    if (stream) {
      setAllStreams((e) => [...e, { userid, stream }]);
    }
  };

  const handleJoin = async (NewData) => {
    if (currentRoom) {
      handleLeave(currentRoom);
    }
    setCurrentRoom(NewData.roomtitle);
    await getMedia();
    socket.emit("join_room", NewData, myuserid);
    setChatText((e) => [...e, enterAlarm(NewData.roomtitle)]);
  };

  const handleLeave = async (roomname) => {
    if (RtcPeerConnectionMap.size !== 0) {
      RtcPeerConnectionMap.forEach((peerconnection, id) => {
        peerconnection.close();
      });
      RtcPeerConnectionMap.forEach((channel, id) => {
        channel.close();
      });

      // localStream.getTracks().forEach((track) => track.stop())

      setRtcPeerConnectionMap(() => new Map());
      setDataChannelMap(() => new Map());
    }
    setCurrentRoom("");
    setAllStreams([]);
    setChatText([]);
    setvideoDisplay(false);

    socket.emit("leave", myuserid, {
      roomtitle: roomname,
      channelId,
    });
  };

  const onRoomSubmit = () => {
    if (roomtitle === "") {
      window.alert("제목을 입력하세요");
      return;
    }
    if (roomsInfo.map((e) => e.name).includes(roomtitle)) {
      window.alert("제목이 존재합니다.");
      return;
    }
    if (!/^\d{4}$/.test(password) && checked) {
      setIsValid(false);
      return;
    }
    let NewData;
    if (checked) {
      NewData = {
        roomtitle,
        channelId,
        usercount,
        password,
      };
    } else {
      NewData = {
        roomtitle,
        channelId,
        usercount,
        password: "",
      };
    }
    handleJoin(NewData);
    resetTitle();
    setCreateDisplay(false);
    setPassword("");
    setChecked(false);
    setIsValid(true);
  };

  const RoomCancel = () => {
    setCreateDisplay(false);
    resetTitle();
    setChecked(false);
    setIsValid(true);
  };

  const RoomList = roomsInfo.map((room) => {
    return (
      <RoomWrap key={room.name}>
        <RoomTitleWrap
          onClick={() => {
            if (currentRoom === room.name) {
              return;
            }
            if (room.userinfo.length >= room.usercount) {
              window.alert("방 인원이 다찼어요.");
              return;
            }
            setCurrentRoom(room.name);
            handleJoin({
              roomtitle: room.name,
              channelId,
              usercount: room.usercount,
            });
          }}
        >
          <span>#{room.name}</span>
          <UserCountWrap>
            <TotalUser>{room.usercount}</TotalUser>
            <CurrentUser>{room.userinfo.length}</CurrentUser>
          </UserCountWrap>
        </RoomTitleWrap>
        <RoomUserList>
          {room.userinfo.map((user) => {
            const info = friendAllRecoil.find((e) => e.id === user.userid);
            return (
              <RoomUserWrap key={info?.id}>
                <img src={info?.profileimg}></img>
                <span>{info?.nickname}</span>
              </RoomUserWrap>
            );
          })}
        </RoomUserList>
      </RoomWrap>
    );
  });

  const createRTCPeerConnection = async (userid) => {
    const NewUserPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });

    localStream
      .getTracks()
      .forEach((track) => NewUserPeerConnection.addTrack(track, localStream));

    NewUserPeerConnection.onaddstream = (event) => {
      handleAddStream(userid, event.stream);
    };

    NewUserPeerConnection.onicecandidate = (event) => {
      socket.emit("ice", event.candidate, myuserid, {
        roomtitle,
        channelId,
      });
    };

    setRtcPeerConnectionMap((e) => e.set(userid, NewUserPeerConnection));

    return NewUserPeerConnection;
  };

  const joinAlarm = (answerid) => {
    const info = friendAllRecoil.find((e) => e.id === answerid);

    return {
      id: answerid,
      text: `${info.nickname} 님이 참여하셨습니다.`,
      type: "alarm",
    };
  };

  const leaveAlarm = (targetid) => {
    const info = friendAllRecoil.find((e) => e.id === targetid);

    return {
      id: targetid,
      text: `${info.nickname} 님이 떠나셨습니다.`,
      type: "alarm",
    };
  };
  const enterAlarm = (roomname) => {
    return {
      id: myuserid,
      text: `${roomname} 방에 입장하셨습니다.`,
      type: "alarm",
    };
  };
  const createData = (MyPeerConnection, answerid) => {
    const newDataChannel = MyPeerConnection.createDataChannel("chat");

    setDataChannelMap((e) => e.set(answerid, newDataChannel));

    return newDataChannel;
  };

  const createAnswerData = (channel, offerid) => {
    setDataChannelMap((e) => e.set(offerid, channel));

    return channel;
  };

  useEffect(() => {
    if (localStream) {
      socket.off("welcome");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
      socket.off("leave");

      socket.on("welcome", async (answerid) => {
        if (answerid === myuserid) {
          return;
        }
        console.log("welcome");
        setChatText((e) => [...e, joinAlarm(answerid)]);

        const MyPeerConnection = await createRTCPeerConnection(answerid);

        const myData = createData(MyPeerConnection, answerid);

        myData.onmessage = (message) => {
          const data = JSON.parse(message.data);
          setChatText((e) => [...e, data]);
        };

        const offer = await MyPeerConnection.createOffer();

        MyPeerConnection.setLocalDescription(offer);

        socket.emit("offer", offer, myuserid, answerid);
      });
      //ddd
      socket.on("offer", async (offer, offerid, answerid) => {
        console.log("offered");
        const MyPeerConnection = await createRTCPeerConnection(offerid);

        MyPeerConnection.ondatachannel = (e) => {
          const myData = createAnswerData(e.channel, offerid);
          myData.onmessage = (message) => {
            const data = JSON.parse(message.data);

            setChatText((e) => [...e, data]);
          };
        };
        MyPeerConnection.setRemoteDescription(offer);

        const answer = await MyPeerConnection.createAnswer();

        MyPeerConnection.setLocalDescription(answer);

        socket.emit("answer", answer, offerid, answerid);
      });

      socket.on("answer", (answer, answerid) => {
        RtcPeerConnectionMap.get(answerid).setRemoteDescription(answer);
      });

      socket.on("ice", (ice, targetid) => {
        if (RtcPeerConnectionMap.get(targetid)) {
          RtcPeerConnectionMap.get(targetid).addIceCandidate(ice);
        }
      });
      //sdfsdfd
      socket.on("leave", (targetid) => {
        RtcPeerConnectionMap.get(targetid).close();
        setRtcPeerConnectionMap((e) => {
          e.delete(targetid);
          return e;
        });
        DataChannelMap.get(targetid).close();
        setDataChannelMap((e) => {
          e.delete(targetid);
          return e;
        });
        setAllStreams((e) => e.filter((stream) => stream.userid !== targetid));
        setChatText((e) => [...e, leaveAlarm(targetid)]);
      });
    }

    return () => {
      socket.off("welcome");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
      socket.off("leave");
    };
  }, [localStream, RtcPeerConnectionMap, DataChannelMap]);

  useEffect(() => {
    socket.on("requestrooms", (roomsinfo) => {
      setRoomsInfo(roomsinfo);
    });

    socket.on("updaterooms", (roomsinfo) => {
      console.log("roomsinfo", roomsinfo);
      setRoomsInfo(roomsinfo);
    });
  }, []);

  useEffect(() => {
    if (currentRoom) {
      handleLeave(currentRoom);
    }
  }, [videoRoomExit]);

  useEffect(() => {
    if (friendroominfo) {
      handleJoin(friendroominfo);
    }
  }, [friendroominfo]);

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
        <RoomtoggleForm toggle={createDisplay}>
          <CreateRoomWrap>
            <CreateTitleInput
              className="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={roomtitle}
              onChange={setRoomTitle}
            ></CreateTitleInput>
            <SetPasswordWrap>
              <PasswordCheck>
                <Checkbox
                  checked={checked}
                  onChange={PasswordChange}
                ></Checkbox>
                <span>비밀번호설정</span>
              </PasswordCheck>
              <SetPasswordInput
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                minLength={4}
                maxLength={4}
                required
                disabled={!checked}
              ></SetPasswordInput>
            </SetPasswordWrap>
            <SetCountWrap>
              <SetCountSelect value={usercount} onChange={userCountChange}>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                <option value={4}>4명</option>
              </SetCountSelect>
              <UserCount>방인원수</UserCount>
            </SetCountWrap>
            <CreateRoomBottom>
              <div>
                {checked && (
                  <PasswordAlert isValid={isValid}>
                    4자리 숫자를 입력하세요.
                  </PasswordAlert>
                )}
              </div>
              <ConfirmWrap>
                <TitleCancle onClick={RoomCancel}>취소</TitleCancle>
                <TitleConfirm onClick={onRoomSubmit}>확인</TitleConfirm>
              </ConfirmWrap>
            </CreateRoomBottom>
          </CreateRoomWrap>
          <RoomListWrap>{RoomList}</RoomListWrap>
        </RoomtoggleForm>
      </VoiceTalkWrap>
      <Controlbox>
        <div>
          <BsFillMicFill></BsFillMicFill>
          <MdVolumeUp></MdVolumeUp>
        </div>
        <div>
          {location === "Teamchat" && (
            <MdVideocam
              onClick={() => {
                setvideoDisplay((e) => !e);
              }}
            ></MdVideocam>
          )}
          <MdSettings></MdSettings>
        </div>
      </Controlbox>
      <BacktoChat
        location={location}
        currentRoom={currentRoom}
        onClick={() => {
          navigate(`/Teamchat/:${channelId}`, {
            state: {
              gameid: channelId.toString(),
            },
          });
        }}
      >
        <Chaticon>
          <PulseLoader color="#ffffff" size={4}></PulseLoader>
        </Chaticon>
      </BacktoChat>
      <ExitRoom
        currentRoom={currentRoom}
        onClick={() => {
          handleLeave(currentRoom);
        }}
      >
        <span>#{currentRoom}</span>
        <MdExitToApp size={24} color="#F05656"></MdExitToApp>
      </ExitRoom>
    </VoiceTalkDiv>
  );
}

export default VoiceTalk;

const VoiceTalkDiv = styled.div`
  display: ${(props) => (props.layoutMenu === "voicetalk" ? "block" : "none")};
`;

const VoiceTalkWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  color: white;
`;
const UserCountWrap = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  width: 56px;
  height: 24px;
  border-radius: 12px;
  background-color: #4d5b73;
  color: white;
  overflow: hidden;
`;
const TotalUser = styled.div`
  display: flex;
  flex-direction: row;
  width: 28px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background-color: #263245;
  color: white;
`;
const CurrentUser = styled.div`
  display: flex;
  flex-direction: row;
  width: 28px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background-color: #4d5b73;
  color: white;
`;
const BacktoChat = styled.div`
  cursor: pointer;
  bottom: ${(props) => (props.location !== "Teamchat" ? "72px" : "-60px")};
  left: 12px;
  position: absolute;
  background: #192030;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
`;

const ExitRoom = styled.div`
  color: white;
  cursor: pointer;
  bottom: ${(props) => (props.currentRoom ? "72px" : "-60px")};
  right: 12px;
  position: absolute;
  background: #192030;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  padding: 0 20px;
  &:hover {
    background: #1d2538;
  }
  span {
    margin-right: 16px;
  }
`;

const Chaticon = styled.div`
  background: linear-gradient(
    90deg,
    #12f8d8 -15.62%,
    #09bec6 40.41%,
    #007db2 107.07%
  );
  width: 30px;
  height: 24px;
  border-radius: 8px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RoomtoggleForm = styled.div`
  position: relative;
  top: ${(props) => (props.toggle ? "0px" : "-224px")};
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const RoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background: #404b5e;
  border-radius: 10px;
  padding: 20px;
  &:hover {
    background: #3c4657;
  }
`;
const RoomTitleWrap = styled.div`
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 10px;
  &:hover {
  }
  div {
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
`;
const Usercount = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  color: white;
`;
const RoomUserWrap = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 12px;
  }
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
  display: flex;
  gap: 10px;
  flex-direction: row-reverse;
  color: white;
`;
const PasswordAlert = styled.div`
  font-size: 12px;
  display: flex;
  color: ${(props) => (props.isValid ? "white" : "#F05656")};
`;
const CreateRoomBottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  height: 216px;
  background: #404b5e;
  border-radius: 10px;
`;
const SetPasswordWrap = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  align-items: center;
`;
const SetCountWrap = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  flex-direction: row-reverse;
  color: white;
  align-items: center;
`;
const PasswordCheck = styled.div`
  color: #777d87;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  align-items: center;
  span {
    font-family: "Noto Sans";
    font-size: 14px;
    color: #777d87;
  }
`;
const UserCount = styled.div`
  margin-right: 15px;
  color: #d4d4d4;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CreateTitleInput = styled.input`
  height: 40px;
  border-radius: 10px;
  background: #263245;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: 0;
  text-indent: 10px;
`;
const SetPasswordInput = styled.input`
  height: 40px;
  width: 160px;
  border-radius: 10px;
  background: #263245;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: 0;
  text-indent: 10px;
  transition: all 0.2s;
  &:disabled {
    opacity: 50%;
  }
`;
const SetCountSelect = styled.select`
  width: 160px;
  height: 40px;
  border-radius: 10px;
  background: #263245;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: 0;
  text-indent: 10px;
`;

const Controlbox = styled.div`
  font-size: 24px;
  position: absolute;
  bottom: 0;
  background-color: #131a28;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  color: white;
  padding: 0 20px;
  div {
    cursor: pointer;
    display: flex;
    gap: 12px;
  }
`;
const RoomListWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const VoiceTalkTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  justify-content: space-between;
  padding: 24px 0 20px 0;
  background-color: #263245;
  z-index: 5;
  border-radius: 0 0 10px 10px;
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
    cursor: pointer;
  }
  span {
    cursor: pointer;
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

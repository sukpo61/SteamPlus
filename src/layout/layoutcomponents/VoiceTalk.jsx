import React, { useEffect, useState } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import socket from "../../socket";
import useInput from "../../hooks/useInput";
import { friendAllState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { FriendSearchProps } from "./FriendSearch";
import { DataChannelMapRecoil } from "../../recoil/atom";
import { chatTextRecoil } from "../../recoil/atom";
import TeamChat from "../../pages/TeamChat";
import { useLocation } from "react-router";

function VoiceTalk() {
  const layoutMenu = useRecoilValue(LayoutButton);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [videoDisplay, setvideoDisplay] = useState(false);
  const [roomsInfo, setRoomsInfo] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const channelName = "Dead space";
  const myuserid = sessionStorage.getItem("steamid");

  const [localStream, setLocalStream] = useState(null);
  const [AllStreams, setAllStreams] = useState([]);
  const [username, setUsername] = useState("");
  const [RtcPeerConnectionMap, setRtcPeerConnectionMap] = useState(new Map());

  const [DataChannelMap, setDataChannelMap] =
    useRecoilState(DataChannelMapRecoil);

  const [friendAllRecoil, setFriendAllRecoil] = useRecoilState(friendAllState);

  const [chatText, setChatText] = useRecoilState(chatTextRecoil);

  const {
    value: roomtitle,
    setinputValue: setRoomTitle,
    reset: resetTitle,
  } = useInput("");

  //dddd

  async function getMedia() {
    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(myStream);
      console.log("getMedia");
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
  //d
  const handleAddStream = (userid, stream) => {
    if (stream) {
      console.log(stream);
      setAllStreams((e) => [...e, { userid, stream }]);
    }
  };

  const handleJoin = async (NewData) => {
    if (currentRoom) {
      socket.emit("leave", myuserid, NewData);
    }
    await getMedia();
    socket.emit("join_room", NewData);
  };

  const handleLeave = (roomname) => {
    if (RtcPeerConnectionMap.size !== 0) {
      socket.emit("test");
      RtcPeerConnectionMap.forEach((peerconnection, id) => {
        peerconnection.close();
      });
      RtcPeerConnectionMap.forEach((channel, id) => {
        channel.close();
      });
      localStream.getTracks().forEach((track) => track.stop());
      setRtcPeerConnectionMap(() => new Map());
      setDataChannelMap(() => new Map());
    }

    setAllStreams([]);
    socket.emit("leave", myuserid, {
      roomtitle: roomname,
      channelName,
    });
  };

  const onRoomSubmit = (newroom) => {
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

  const RoomList = roomsInfo.map((room) => {
    return (
      <RoomWrap key={room.name}>
        <RoomTitleWrap>
          <span
            onClick={() => {
              setCurrentRoom(room.name);
              handleJoin({
                roomtitle: room.name,
                channelName,
              });
            }}
          >
            #{room.name}
          </span>
          {room.userinfo.map((e) => e.userid).includes(myuserid) && (
            <span
              onClick={() => {
                handleLeave(room.name);
              }}
            >
              나가기
            </span>
          )}
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

  const StreamList = AllStreams.map((data) => {
    const info = friendAllRecoil.find((e) => e.id === data.userid);

    const remotehandleVideoRef = (video) => {
      if (video) {
        video.srcObject = data.stream;
      }
    };

    return (
      <VideoWrap key={data.userid}>
        <video ref={remotehandleVideoRef} autoPlay playsInline muted />
        <span>{info?.nickname}</span>
      </VideoWrap>
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

    NewUserPeerConnection.onaddtrack = (event) => {
      handleAddStream(userid, event.stream);
    };

    NewUserPeerConnection.onicecandidate = (event) => {
      socket.emit("ice", event.candidate, myuserid, {
        roomtitle,
        channelName,
      });
    };

    setRtcPeerConnectionMap((e) => e.set(userid, NewUserPeerConnection));

    return NewUserPeerConnection;
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
        const MyPeerConnection = await createRTCPeerConnection(answerid);

        const myData = createData(MyPeerConnection, answerid);

        myData.onmessage = (message) => {
          const data = JSON.parse(message.data);
          console.log("1", data);
          setChatText((e) => [...e, data]);
        };

        const offer = await MyPeerConnection.createOffer();

        MyPeerConnection.setLocalDescription(offer);

        socket.emit("offer", offer, myuserid, answerid);
      });

      socket.on("offer", async (offer, offerid, answerid) => {
        const MyPeerConnection = await createRTCPeerConnection(offerid);

        MyPeerConnection.ondatachannel = (e) => {
          const myData = createAnswerData(e.channel, offerid);
          myData.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log("2", data);

            setChatText((e) => [...e, data]);
          };
        };
        console.log(chatText);
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
    console.log("socket on");
    socket.on("requestrooms", (roomsinfo) => {
      console.log("requestrooms", roomsinfo);
      setRoomsInfo(roomsinfo);
    });

    socket.on("updaterooms", (roomsinfo) => {
      console.log("updaterooms", roomsinfo);
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
      <Controlbox>
        <span
          onClick={() => {
            setvideoDisplay((e) => !e);
          }}
        >
          비디오토글
        </span>
      </Controlbox>
      <VideosWrap toggle={videoDisplay}>
        <VideosList videocount={AllStreams.length}>{StreamList}</VideosList>
      </VideosWrap>
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
  padding: 24px;
  color: white;
`;
const VideosWrap = styled.div`
  top: ${(props) => (props.toggle ? "72px" : "-70%")};
  transition: all 0.5s;
  right: 0;
  width: calc(100% - 480px);
  height: calc((100% - 72px) / 2);
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 24px;
  color: white;
  background: #131a28;
  z-index: 9;
  justify-content: center;
  align-items: center;
  video {
    border-radius: 30px;
  }
`;
const VideoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const VideosList = styled.div`
  width: ${(props) => {
    const videocount = props.videocount;
    return `calc(100% /${videocount})`;
  }};
  display: flex;
  flex-direction: row;
  padding: 24px;
  color: white;
  justify-content: center;
  align-items: center;
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
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
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

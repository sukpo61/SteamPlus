import React, { useEffect, useState } from "react";
import { getFriend, LayoutButton } from "../../recoil/atom";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import socket from "../../socket";
import useInput from "../../hooks/useInput";
import { friendAllState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { FriendSearchProps } from "./FriendSearch";
import PulseLoader from "react-spinners/PulseLoader";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";

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
  loginModalOpenRecoil,
  localStreamRecoil,
  micStateRecoil,
  videoStateRecoil,
  isAllMutedRecoil,
  isVolumePercent,
  isMicVolumePercent,
  hasDeviceRecoil,
  RoomUserDataRecoil,
} from "../../recoil/atom";

import TeamChat from "../../pages/TeamChat";
import { useLocation } from "react-router";

import { MdExitToApp } from "react-icons/md";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { MdVideocam } from "react-icons/md";
import { AiOutlineBorder } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { MdLockOutline, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

function VoiceTalk({ myId, handleLoginModalOpen }) {
  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;

  const layoutMenu = useRecoilValue(LayoutButton);

  const [createDisplay, setCreateDisplay] = useState("hide");

  const [roomsInfo, setRoomsInfo] = useState([]);

  const [roomsresult, setRoomsResult] = useState([]);

  const myuserid = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");

  const [usercount, setUserCount] = useState(2);

  const [checked, setChecked] = useState(false);

  const [settingon, setSettingOn] = useState(false);

  const [RtcPeerConnectionMap, setRtcPeerConnectionMap] = useState(new Map());

  const [password, setPassword] = useState("");

  const [pwsubmit, setPwSubmit] = useState(false);

  const [pwroominfo, setPwRoomInfo] = useState("");

  const [isValid, setIsValid] = useState(true);

  const [audioContext, setAudioContext] = useState(null);

  const [gainNode, setGainNode] = useState(null);

  const [volumepercent, setVolumePercent] = useRecoilState(isVolumePercent);

  const [micvolumepercent, setMicVolumePercent] =
    useRecoilState(isMicVolumePercent);

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

  const [loginModalOpen, setLoginModalOpen] =
    useRecoilState(loginModalOpenRecoil);

  const [getFriendAuth, setGetFriendAuth] = useRecoilState(getFriend);

  const [localStream, setLocalStream] = useRecoilState(localStreamRecoil);

  const [micstate, setMicState] = useRecoilState(micStateRecoil);

  const [videostate, setVideoState] = useRecoilState(videoStateRecoil);

  const [isallmuted, setIsAllMuted] = useRecoilState(isAllMutedRecoil);

  const [hasDevice, sethasDevice] = useRecoilState(hasDeviceRecoil);

  const [roomUserData, setRoomUserData] = useRecoilState(RoomUserDataRecoil);

  const {
    value: roomtitle,
    setinputValue: setRoomTitle,
    reset: resetTitle,
  } = useInput("");

  const {
    value: sbpassword,
    setinputValue: setSbPassword,
    reset: resetSbPassword,
  } = useInput("");

  const {
    value: searchvalue,
    setinputValue: setSearchValue,
    reset: resetSearchValue,
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

  async function checkMedia(roomtitle) {
    let videoStream;
    let audioStream;

    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log("devices", devices);

    const hasCam = devices.some((device) => {
      return device.kind === "videoinput";
    });
    const hasMic = devices.some((device) => {
      return device.kind === "audioinput";
    });
    if (hasMic) {
      audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }
    if (false) {
      videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
    } else {
      const img = new Image();
      img.src = "/img/emptyvideo.png";
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, 640, 480);

      // canvas 요소를 사용하여 비디오 스트림 생성하기
      const stream = canvas.captureStream();
      const videoTrack = stream.getVideoTracks()[0];

      // 가상 비디오 스트림을 추가한 MediaStream 생성하기
      videoStream = new MediaStream();
      videoStream.addTrack(videoTrack);
    }

    setRoomUserData((e) =>
      e.set(myId, {
        cam: hasCam,
        mic: micstate,
      })
    );

    socket.emit(
      "updateroomuserdata",
      roomtitle,
      roomUserData.set(myId, {
        cam: hasCam,
        mic: micstate,
      })
    );

    const myStream = new MediaStream([
      ...audioStream.getAudioTracks(),
      ...videoStream.getVideoTracks(),
    ]);
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = micstate;
    });
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = true;
    });

    setLocalStream(myStream);
    handleAddStream(myuserid, myStream);
  }

  useEffect(() => {
    if (roomUserData.size !== 0) {
    }
  }, [roomUserData]);

  async function getMedia() {
    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = micstate;
      });
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
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
    setvideoDisplay(true);
    setCurrentRoom(NewData.roomtitle);
    await checkMedia(NewData);
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

      localStream.getTracks().forEach((track) => track.stop());

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
    setCreateDisplay("hide");
    setPassword("");
    setChecked(false);
    setIsValid(true);
  };

  const RoomCancel = () => {
    setCreateDisplay("hide");
    resetTitle();
    setChecked(false);
    setIsValid(true);
  };

  const SubmitPassword = () => {
    if (sbpassword === pwroominfo.password) {
      handleJoin(pwroominfo);
      setCreateDisplay("hide");
      setPwRoomInfo("");
      resetSbPassword();
    } else {
      setFontColor("#F05656");
      // window.alert("틀림");
    }
  };
  const SubmitCancle = () => {
    setCreateDisplay("hide");
    setPwRoomInfo("");
    resetSbPassword();
  };

  //친구 추가
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState([]);

  const postMutation = useMutation(
    (friendAdd) => axios.post(`${DATABASE_ID}/friend`, friendAdd),
    {
      onSuccess: (friendAdd) => {
        // 쿼리 무효화
        queryClient.invalidateQueries(["friend"]);
        queryClient.invalidateQueries(["friendsearch"]);
        setTimeout(() => {
          const newLoading = isLoading.filter((id) => {
            return id !== friendAdd.friendId;
          });
          setIsLoading(newLoading);
        }, 2000);
      },
    }
  );
  const FriendAdd = async (event, friendId, friendNickName) => {
    event.stopPropagation();
    setIsLoading([...isLoading, friendId]);

    let friendAdd = {
      id: uuidv4(),
      myId: myuserid,
      friendId: friendId,
      myNickName: myNickName,
      friendNickName: friendNickName,
    };
    postMutation.mutate(friendAdd);
    socket.emit("friendMount", friendId);
  };

  const alreadyFriend = friendAllRecoil?.filter((i) => {
    for (let t = 0; t < getFriendAuth.length; t++) {
      if (
        getFriendAuth[t].friendId === i.id &&
        getFriendAuth[t].myId === myuserid
      ) {
        return true;
      }
    }
    return false;
  });

  const Roomjoin = (room) => {
    console.log("roomrecept");
    if (!myuserid) {
      setLoginModalOpen(true);
      return;
    }
    socket.emit("checkusers");
    if (currentRoom === room.roomtitle) {
      return;
    }
    if (room.userinfo?.length >= room.usercount) {
      window.alert("방 인원이 다찼어요.");
      return;
    }
    if (!room.password) {
      setCurrentRoom(room.roomtitle);
      handleJoin({
        roomtitle: room.roomtitle,
        channelId: room.channelId,
        usercount: room.usercount,
        password: room.password,
      });
    } else {
      setPwSubmit(true);
      setCreateDisplay("pwsubmit");
      setPwRoomInfo({
        roomtitle: room.roomtitle,
        channelId: room.channelId,
        usercount: room.usercount,
        password: room.password,
      });
    }
  };

  const RoomList = roomsresult.map((room) => {
    return (
      <RoomWrap
        key={room.roomtitle}
        currentRoom={currentRoom}
        name={room.roomtitle}
        onClick={() => {
          Roomjoin(room);
        }}
      >
        <RoomTitleWrap>
          <RoomTitle>
            <span># {room.roomtitle}</span>
            {room.password && (
              <div>
                <MdLockOutline></MdLockOutline>
              </div>
            )}
          </RoomTitle>
          <UserCountWrap>
            <CurrentUser>{room.userinfo.length}</CurrentUser>
            <TotalUser>
              <span>{room.usercount}</span>
            </TotalUser>
          </UserCountWrap>
        </RoomTitleWrap>
        <RoomUserList>
          {room.userinfo.map((user) => {
            const info = friendAllRecoil.find((e) => e.id === user.userid);
            return (
              <RoomUserWrap key={info?.id}>
                <img src={info?.profileimg}></img>
                <span>{info?.nickname}</span>
                {/* 친구는 예외 처리 */}
                {/* {console.log(alreadyFriend)} */}
                {!myuserid ||
                info?.id === myuserid ||
                alreadyFriend?.find((i) => {
                  if (i.id === info?.id) {
                    return true;
                  } else {
                    return false;
                  }
                }) ? (
                  ""
                ) : (
                  <FriendAddButton
                    onClick={(event) => {
                      FriendAdd(event, user?.userid, info?.nickname);
                    }}
                  >
                    {isLoading.find((id) => {
                      if (user?.userid === id) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                      ? ""
                      : "+"}
                  </FriendAddButton>
                )}
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
      console.log("event", event);
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

  const VolumeonChange = (e) => {
    setVolumePercent(e.target.value);
  };

  const MicVolumeonChange = (event) => {};

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

        console.log("offer", offer);

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
        console.log("answered");
        RtcPeerConnectionMap.get(answerid).setRemoteDescription(answer);
        console.log("answer", RtcPeerConnectionMap.get(answerid));
      });

      socket.on("ice", (ice, targetid) => {
        setTimeout(() => {
          RtcPeerConnectionMap.get(targetid).addIceCandidate(ice);
        }, 100);
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
      Roomjoin(friendroominfo);
    }
  }, [friendroominfo]);

  useEffect(() => {
    if (!searchvalue) {
      setRoomsResult(roomsInfo);
    } else {
      setRoomsResult(
        roomsInfo.filter((room) =>
          room.name?.toLowerCase().includes(searchvalue.toLowerCase())
        )
      );
    }
  }, [searchvalue]);

  useEffect(() => {
    if (roomsInfo) {
      setRoomsResult(roomsInfo);
    }
  }, [roomsInfo]);

  const [fontColor, setFontColor] = useState("white");

  useEffect(() => {
    setFontColor("white");
  }, [sbpassword]);

  //스팀으로 이동하기
  const gotoSteam = () => {
    // navigate();
    window.open(`https://store.steampowered.com/app/${channelId}`, "_blank");
  };
  return (
    <VoiceTalkDiv layoutMenu={layoutMenu}>
      <VoiceTalkWrap>
        <VoiceTalkTop>
          <VoiceTalkTopbar>
            <ChannelTitle>
              <SteamGamesTitle>{channelName}</SteamGamesTitle>
              {/* 스팀로고 클릭시 해당 게임의 스팀홈페이지로 이동 */}
              <img src="/img/steam_link.png" onClick={gotoSteam}></img>
            </ChannelTitle>
            <CreateRoom
              onClick={() => {
                if (myuserid) {
                  if (channelId !== "") {
                    setPwSubmit(false);
                    setCreateDisplay("roomcreate");
                  }
                } else {
                  // setLoginModalOpen(true);
                  handleLoginModalOpen();
                }
              }}
            >
              + 채팅
            </CreateRoom>
          </VoiceTalkTopbar>
          <RoomTitleInputWrap>
            <RoomTitleInput
              className="search"
              type="text"
              placeholder="채팅방 검색"
              value={searchvalue}
              onChange={setSearchValue}
            ></RoomTitleInput>
            {/* <SearchButtonWrap>
              <BiSearchAlt2></BiSearchAlt2>
            </SearchButtonWrap> */}
          </RoomTitleInputWrap>
        </VoiceTalkTop>
        <RoomtoggleForm displaystate={createDisplay} fontColor={fontColor}>
          {pwsubmit ? (
            <SubbmitPasswordWrap
              style={{
                boxShadow: `${
                  fontColor === "white" ? "" : "0px 0px 10px 0px #F05656"
                }`,
              }}
            >
              {/* <div> */}
              <SubmitPwInput
                className="title"
                type="password"
                placeholder="4자리 숫자 비밀번호"
                value={sbpassword}
                onChange={setSbPassword}
                minLength={4}
                maxLength={4}
                style={{ color: fontColor }} // 비번 틀렸을 때 css //Color: validA ? "white" : "red"
              />
              <TitleCancle onClick={SubmitCancle}>취소</TitleCancle>
              <TitleConfirm onClick={SubmitPassword}>제출</TitleConfirm>
              {/* </div> */}
            </SubbmitPasswordWrap>
          ) : (
            <CreateRoomWrap>
              <CreateTitleInput
                className="title"
                type="text"
                placeholder="채팅방 이름을 입력하세요"
                value={roomtitle}
                onChange={setRoomTitle}
              ></CreateTitleInput>
              <SetPasswordWrap>
                <PasswordCheck checked={checked}>
                  <Checkbox
                    style={{
                      color: checked ? "#00B8C8" : "#777d87",
                      marginLeft: -3,
                      padding: 0,
                    }}
                    checked={checked}
                    onChange={PasswordChange}
                  ></Checkbox>
                  <span>비밀번호 설정</span>
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
                <UserCount>방 인원수</UserCount>
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
          )}

          <RoomListWrap>{RoomList}</RoomListWrap>
        </RoomtoggleForm>
      </VoiceTalkWrap>
      <Controlbox settingon={settingon}>
        <ControlButtons>
          <div>
            <div
              onClick={() => {
                setMicState((e) => !e);
                if (localStream) {
                  localStream.getAudioTracks().forEach((track) => {
                    track.enabled = !micstate;
                  });
                }
              }}
            >
              {micstate ? (
                <BsFillMicFill></BsFillMicFill>
              ) : (
                <BsFillMicMuteFill></BsFillMicMuteFill>
              )}
            </div>
            <div
              onClick={() => {
                setIsAllMuted((e) => !e);
              }}
            >
              {isallmuted ? (
                <MdVolumeOff></MdVolumeOff>
              ) : (
                <MdVolumeUp></MdVolumeUp>
              )}
            </div>
          </div>
          <div>
            <MdSettings
              onClick={() => {
                setSettingOn((e) => !e);
              }}
            ></MdSettings>
          </div>
        </ControlButtons>
        <ControlSlider>
          <SliderWrap>
            <div>음량</div>
            <Box width={300}>
              <Slider
                size="small"
                defaultValue={50}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={VolumeonChange}
              />
            </Box>
          </SliderWrap>
        </ControlSlider>
        <ControlRooms>
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
              if (myuserid) {
                handleLeave(currentRoom);
              } else {
                handleLoginModalOpen();
              }
            }}
          >
            <span>#{currentRoom}</span>
            <MdExitToApp size={24} color="#F05656"></MdExitToApp>
          </ExitRoom>
        </ControlRooms>
      </Controlbox>
    </VoiceTalkDiv>
  );
}

export default VoiceTalk;

const SteamGamesTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const VoiceTalkDiv = styled.div`
  overflow: hidden;
  display: ${(props) => (props.layoutMenu === "voicetalk" ? "block" : "none")};
`;

const VoiceTalkWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  color: white;
`;
const UserCountWrap = styled.div`
  position: relative;
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
  position: absolute;
  right: -4px;
  display: flex;
  flex-direction: row;
  width: 32px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background-color: #263245;
  color: white;
  transform: skew(-15deg);
  span {
    transform: skew(15deg);
    margin-right: 4px;
  }
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
  position: relative;
  cursor: pointer;
  bottom: ${(props) => (props.location !== "Teamchat" ? "196px" : "0px")};
  background: #192030;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  z-index: -1;
`;

const ExitRoom = styled.div`
  position: relative;
  color: white;
  cursor: pointer;
  bottom: ${(props) => (props.currentRoom ? "196px" : "0px")};
  background: #192030;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  padding: 0 20px;
  z-index: -1;

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
  top: ${({ displaystate }) => {
    if (displaystate === "hide") {
      return "-224px";
    }
    if (displaystate === "roomcreate") {
      return "0px";
    }
    if (displaystate === "pwsubmit") {
      return "-136px";
    }
  }};
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
  transition: 0.3s ease;
  cursor: ${(props) => (props.name === props.currentRoom ? "" : "pointer")};
  &:hover {
    background: ${(props) =>
      props.name === props.currentRoom ? "#404b5e" : "#3c4657"};
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
  /* &:hover {
  }
  div {
    cursor: pointer;
  }
  span {
    cursor: pointer;
  } */
`;
const RoomTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  div {
    margin-left: 8px;
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
  margin-bottom: -6px;
`;
const TitleConfirm = styled.button`
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
`;
const TitleCancle = styled.button`
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
`;

const PasswordNotCorrect = styled.p`
  position: absolute;
  font-size: 8px;
  color: red;
  top: 65px;
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
const SubbmitPasswordWrap = styled.div`
  position: relative;
  margin-top: 144px; //136px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 24px;
  color: white;
  padding: 20px 24px;
  height: 80px;
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
  color: ${({ checked }) => (checked ? "white" : "#777d87")};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
  }
`;
const UserCount = styled.div`
  margin-right: 20px;
  /* color: #d4d4d4; */
  display: flex;
  flex-direction: row;
  align-items: center;

  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const CreateTitleInput = styled.input`
  width: 304px;
  height: 40px;
  border-radius: 10px;
  background: #263245;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: 0;
  text-indent: 10px;

  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.03em;
`;

const SubmitPwInput = styled.input`
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
  width: 172px;
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
  width: 172px;
  height: 40px;
  border-radius: 10px;
  background: #263245;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: 0;
  text-indent: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  outline: 0px none transparent;
`;

const Controlbox = styled.div`
  font-size: 24px;
  position: absolute;
  bottom: ${(props) => (props.settingon ? "-60px" : "-130px")};
  background-color: #131a28;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0 20px;
  margin-bottom: 12px;
  transition: all 0.3s;
`;
const ControlButtons = styled.div`
  font-size: 24px;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  div {
    cursor: pointer;
    display: flex;
    gap: 12px;
  }
`;
const ControlRooms = styled.div`
  font-size: 16px;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  color: white;
`;
const ControlSlider = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: white;
`;
const SliderWrap = styled.div`
  font-size: 12px;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
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
const RoomTitleInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;
const SearchButtonWrap = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 8px;
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

const FriendAddButton = styled.button`
  font-size: 24px;
  color: #fff;
  margin-left: auto;
`;

import React from "react";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import {
  isAllMutedRecoil,
  videoStateRecoil,
  isVolumePercent,
  hasDeviceRecoil,
} from "../../recoil/atom";
import { useEffect } from "react";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const UserVideo = ({ data, info, myId }: any) => {
  const [isallmuted, setIsAllMuted] = useRecoilState(isAllMutedRecoil);
  const [videostate, setVideoState] = useRecoilState(videoStateRecoil);
  const [hasDevice, sethasDevice] = useRecoilState(hasDeviceRecoil);

  const [volumepercent, setVolumePercent] = useRecoilState(isVolumePercent);

  const [muted, setMuted] = useState(false);

  const videoRef: any = useRef(null);

  const videoComponent = useMemo(() => {
    if (data.userid === myId) {
      console.log("stream", data.stream.getVideoTracks()[0]);
      if (hasDevice && data.stream.getVideoTracks()[0]?.enabled) {
        return <Streamvideo ref={videoRef} autoPlay playsInline muted={true} />;
      } else {
        return <img src="/img/emptyvideo.png"></img>;
      }
    } else {
      return (
        <Streamvideo ref={videoRef} autoPlay playsInline muted={isallmuted} />
      );
    }
  }, [isallmuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = data.stream;
    }
  }, [data.stream, videostate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volumepercent / 100;
    }
  }, [volumepercent]);

  // console.log(data.stream.getVideoTracks()[0].kind);
  // !data.stream.getVideoTracks()[0]?.enabled
  // !data.stream.getAudioTracks()[0].enabled

  return (
    <VideoWrap key={data.userid}>
      {videoComponent}
      <Usernickname>
        <span>{info?.nickname}</span>
      </Usernickname>
      {true && (
        <Micoff>
          <BsFillMicMuteFill size={20}></BsFillMicMuteFill>
        </Micoff>
      )}
    </VideoWrap>
  );
};

export default UserVideo;

const VideoWrap = styled.div<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    height: 100%;
  }
`;

const Streamvideo = styled.video<any>`
  border-radius: 10px;
  width: 90%;
  height: 100%;
`;

const Usernickname = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: rgba(8, 12, 22, 0.6);
  border-radius: 8px;
  padding: 4px 8px;
  bottom: 8px;
  left: 8%;
`;

const Micoff = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(8, 12, 22, 0.6);
  border-radius: 15px;
  width: 30px;
  height: 30px;
  bottom: 8px;
  right: 8%;
`;

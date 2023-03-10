import React from "react";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import {
  isAllMutedRecoil,
  videoStateRecoil,
  isVolumePercent,
} from "../../recoil/atom";
import { useEffect } from "react";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const UserVideo = ({ data, info, myId }: any) => {
  const [isallmuted, setIsAllMuted] = useRecoilState(isAllMutedRecoil);
  const [videostate, setVideoState] = useRecoilState(videoStateRecoil);
  const [volumepercent, setVolumePercent] = useRecoilState(isVolumePercent);

  const [muted, setMuted] = useState(false);

  const videoRef: any = useRef(null);

  const videoComponent = useMemo(() => {
    if (data.userid === myId) {
      return <Streamvideo ref={videoRef} autoPlay playsInline muted={true} />;
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

  return (
    <VideoWrap key={data.userid}>
      {!data.stream.getVideoTracks()[0].enabled ? (
        <img src="/img/emptyvideo.png"></img>
      ) : (
        videoComponent
      )}
      <Usernickname>
        <span>{info?.nickname}</span>
      </Usernickname>
      {!data.stream.getAudioTracks()[0].enabled && (
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

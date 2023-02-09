import React from "react";
import { voicetalkbutton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function VoiceTalk() {
  const voicetalkBoolean = useRecoilValue(voicetalkbutton);

  return (
    <VoiceTalkDiv voicetalkBoolean={voicetalkBoolean}>VoiceTalk</VoiceTalkDiv>
  );
}

export default VoiceTalk;
const VoiceTalkDiv = styled.div<{ voicetalkBoolean: Boolean }>`
  width: 400px;
  height: 100%;
  background: blue;
  position: fixed;
  left: ${(props) => (props.voicetalkBoolean ? "100px" : "-500px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  border-top-right-radius: 30px;
`;

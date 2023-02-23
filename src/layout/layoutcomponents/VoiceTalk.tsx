import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function VoiceTalk() {
  console.log("1234");
  const layoutMenu = useRecoilValue(LayoutButton);

  return <VoiceTalkDiv layoutMenu={layoutMenu}>VoiceTalk</VoiceTalkDiv>;
}

export default VoiceTalk;
const VoiceTalkDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "voicetalk" ? "block" : "none")};
`;

import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function Profile() {
  // profile 클릭 state
  const layoutMenu = useRecoilValue(LayoutButton);

  return <ProfileDiv layoutMenu={layoutMenu}>Profile</ProfileDiv>;
}

export default Profile;
const ProfileDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "profile" ? "block" : "none")};
`;

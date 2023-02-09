import React from "react";
import { profilebutton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function Profile() {
  // profile 클릭 state
  const profileBoolean = useRecoilValue(profilebutton);

  return <ProfileDiv profileBoolean={profileBoolean}>Profile</ProfileDiv>;
}

export default Profile;
const ProfileDiv = styled.div<{ profileBoolean: Boolean }>`
  width: 400px;
  height: 100%;
  background: blue;
  position: fixed;
  left: ${(props) => (props.profileBoolean ? "100px" : "-500px")};
  top: 0;
  bottom: 0;
  transition: 0.5s ease-in-out;
  border-top-right-radius: 30px;
`;

import React, { useRef, useState } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function Profile() {
  // profile 클릭 state
  const layoutMenu = useRecoilValue(LayoutButton);
  const ProfileImgUrl = localStorage.getItem("profileimg");
  const ProfileNicName = localStorage.getItem("nickName");
  const ProfileGameTitle = localStorage.getItem("gameextrainfo");

  //로그아웃
  const logout = () => {
    localStorage.getItem("gameid");
    localStorage.removeItem("gameid");
    localStorage.getItem("profileimg");
    localStorage.removeItem("profileimg");
    localStorage.getItem("nickName");
    localStorage.removeItem("nickName");
    localStorage.getItem("gameextrainfo");
    localStorage.removeItem("gameextrainfo");
    localStorage.getItem("steamid");
    localStorage.removeItem("steamid");
    // navigate("/mypage");
  };

  const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/login/&openid.realm=http://localhost:3000/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;

  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  return (
    <>
      <ProfileDiv layoutMenu={layoutMenu}>
        <ProfileImgBox>
          {ProfileNicName === null ? (
            <ProfileImg src={require("../../img/img1.png")} />
          ) : (
            <ProfileImg src={`${ProfileImgUrl}`} />
          )}
        </ProfileImgBox>
        {ProfileNicName === null ? (
          <ProfileInfoBox>
            <ProfileNickName>비회원</ProfileNickName>
          </ProfileInfoBox>
        ) : (
          <ProfileInfoBox>
            <ProfileNickName>{ProfileNicName}</ProfileNickName>
            <ProfileFriends>친구 몇마리</ProfileFriends>
            <ProfileLogout onClick={logout}>로그아웃</ProfileLogout>
          </ProfileInfoBox>
        )}

        <ProfileBox>
          {ProfileNicName === null ? (
            <>
              <ProfileGameComments>
                <div> 스팀 연동 정보가 없어요</div>
                <br></br>
                <div> 로그인 하여 Steam+의 </div>
                <div> 다양한 서비스를 경험해보세요</div>
                <br></br>
              </ProfileGameComments>
              <ProfileGameLogin onClick={SteamLogin}>
                <ProfileGameImg src={require("../../img/img.png")} />
                Steam 계정으로 로그인
              </ProfileGameLogin>
            </>
          ) : (
            <ProfileGameTitles>
              {ProfileGameTitle === "undefined"
                ? "현재진행중인 게임이 없습니다."
                : ProfileGameTitle + " " + "게임중 입니다."}
            </ProfileGameTitles>
          )}
        </ProfileBox>
      </ProfileDiv>
    </>
  );
}

export default Profile;

const ProfileLogout = styled.span`
  font-size: 13px;
  cursor: pointer;
`;
const ProfileDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) => (props.layoutMenu === "profile" ? "block" : "none")};
`;
const ProfileImgBox = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px auto 0;
`;
const ProfileImg = styled.img`
  width: 173px;
  height: 173px;
`;
const ProfileInfoBox = styled.div`
  color: white;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProfileNickName = styled.div`
  font-size: 24px;
`;
const ProfileFriends = styled.div`
  margin-top: 10px;
  font-size: 15px;
`;
const ProfileBox = styled.div`
  width: 352px;
  height: 559px;
  background-color: #192030;
  margin-left: 24px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileGameTitles = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileGameComments = styled.div`
  color: gray;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileGameLogin = styled.span`
  cursor: pointer;
  color: white;
  width: 224px;
  height: 50px;
  font-size: 16px;
  background: linear-gradient(#12f8d8, #00b8c8, #007db2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileGameImg = styled.img`
  background-color: white;
  border-radius: 60px;
  margin-right: 10px;
`;

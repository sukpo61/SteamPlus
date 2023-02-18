import React, { useRef, useState } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

function Profile() {
  // profile 클릭 state
  const layoutMenu = useRecoilValue(LayoutButton);
  //로컬 프로필이미지
  const ProfileImgUrl = localStorage.getItem("profileimg");
  //로컬 닉네임
  const ProfileNicName = localStorage.getItem("nickName");
  //로컬 게임정보
  const ProfileGameTitle = localStorage.getItem("gameextrainfo");
  //로컬 로그인정보
  const ProfileLogin = localStorage.getItem("login");
  //로컬 스팀아이디
  const ProfleSteamId = localStorage.getItem("steamid");

  //로그인버튼
  const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/login/&openid.realm=http://localhost:3000/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  ///////////////////////////
  const navigate = useNavigate();
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const serverUrl = "http://localhost:3001/auth/";
  const [online, setOnline] = useState(true);
  ///////////////////////////
  const userDataGet = async () => {
    const result = await axios.get(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
      {
        params: {
          key: APIKEY,
          //스팀로그인
          steamids: steamId,
        },
      }
    );
    //로컬스토리지에 로그인정보 저장하기
    localStorage.setItem("login", online.toString());
    localStorage.setItem("gameid", result?.data.response.players[0].gameid);
    localStorage.setItem("steamid", result.config.params.steamids);
    localStorage.setItem(
      "profileimg",
      result?.data.response.players[0].avatarfull
    );
    localStorage.setItem(
      "nickName",
      result?.data.response.players[0].personaname +
        " " +
        "#" +
        result.config.params.steamids.slice(13, 18)
    );
    localStorage.setItem(
      "gameextrainfo",
      result?.data.response.players[0].gameextrainfo
    );

    //steam에서 변경된사항이 있을때 put을 통해 dbjson을 업데이트해줌
    const userinfo = {
      id: result.config.params.steamids,
      profileimg: result?.data.response.players[0].avatarfull,
      nickname:
        result?.data.response.players[0].personaname +
        " " +
        "#" +
        result.config.params.steamids.slice(13, 18),
      gameid: result?.data.response.players[0].gameid,
      gameextrainfo: result?.data.response.players[0].gameextrainfo,
      login: online,
    };
    axios.put(`http://localhost:3001/auth/${steamId}`, userinfo);
    axios.post(serverUrl, userinfo);
    navigate("/");
    return result;
  };
  const { data } = useQuery("userData", userDataGet);

  //로그아웃 버튼
  const logout = async () => {
    const item = () =>
      axios
        .get(`http://localhost:3001/auth/${ProfleSteamId}`)
        .then((response) => {
          const i = response.data;

          axios.put(`http://localhost:3001/auth/${ProfleSteamId}`, {
            ...i,
            login: false,
          });
          //새로고침
          window.location.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    item();

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
  };

  // 온라인 오프라인 토글버튼
  const onLineToogle = async () => {
    const onlineOnOff = ProfileLogin === "true" ? "false" : "true";
    localStorage.setItem("login", onlineOnOff);
    setOnline(!online);
    console.log(ProfleSteamId);

    const item = () =>
      axios
        .get(`http://localhost:3001/auth/${ProfleSteamId}`)
        .then((response) => {
          const i = response.data;

          axios.put(`http://localhost:3001/auth/${ProfleSteamId}`, {
            ...i,
            login: !online,
          });
        })
        .catch((error) => {
          console.log(error);
        });

    item();
    // axios.post(serverUrl, online);
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
            <ProfileNickName>
              {ProfileNicName} {online ? <ChannelOn /> : <ChannelOff />}
            </ProfileNickName>

            <ProfileFriends>친구 몇마리</ProfileFriends>
            <ChangeToggle onClick={onLineToogle}>
              {online ? "온라인" : "오프라인"}
            </ChangeToggle>

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
const ChangeToggle = styled.span`
  color: white;
  cursor: pointer;
`;
const ChannelOff = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: red;
`;
const ChannelOn = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #23de79;
`;
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
  height: 459px;
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

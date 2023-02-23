import React, { useEffect, useState } from "react";
import { LayoutButton } from "../../recoil/atom";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import RecentGameData from "../../components/RecentGameData";

function Profile() {
  // profile 클릭 state
  const layoutMenu = useRecoilValue(LayoutButton);
  //로컬 프로필이미지
  const ProfileImgUrl = sessionStorage.getItem("profileimg");
  //로컬 닉네임
  const ProfileNicName = sessionStorage.getItem("nickName");
  //로컬 게임정보
  const ProfileGameTitle = sessionStorage.getItem("gameextrainfo");
  //로컬 로그인정보
  const ProfileLogin = sessionStorage.getItem("login");
  //로컬 스팀아이디
  const ProfleSteamId = sessionStorage.getItem("steamid");

  // 어스아이디
  const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/login/&openid.realm=http://localhost:3000/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  ///////////////////////////
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const serverUrl = "http://localhost:3001/auth/";
  const [online, setOnline] = useState(true);

  //로그인
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
    //세션스토리지에 로그인정보 저장하기
    sessionStorage.setItem("login", online.toString());
    sessionStorage.setItem("gameid", result?.data.response.players[0].gameid);
    sessionStorage.setItem("steamid", result.config.params.steamids);
    sessionStorage.setItem(
      "profileimg",
      result?.data.response.players[0].avatarfull
    );
    sessionStorage.setItem(
      "nickName",
      result?.data.response.players[0].personaname +
        " " +
        "#" +
        result.config.params.steamids.slice(13, 18)
    );
    sessionStorage.setItem(
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
      lastLogin: new Date(),
    };

    axios.put(`http://localhost:3001/auth/${steamId}`, userinfo);
    axios.post(serverUrl, userinfo);

    window.location.replace("/");
    return userinfo;
  };
  const { data } = useQuery("userData", userDataGet);

  //유저 db정보 가져오기
  const getLoginData = async () => {
    const result = await axios.get(
      `http://localhost:3001/auth/${ProfleSteamId}`
    );

    return result;
  };

  const { data: loginInformation } = useQuery("loginInformation", getLoginData);

  //최근 게임활동 정보가져오기
  const getRecentGameData = async () => {
    const recentGame = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${APIKEY}&steamid=${ProfleSteamId}&format=json`
    );
    // sessionStorage.setItem("recentGame", recentGame.data.response.games);
    return recentGame;
  };

  const { data: recentGame } = useQuery("getRecentGameData", getRecentGameData);
  const GameData = recentGame?.data.response.games.slice(0, 3);

  //유저 최신정보 & 타임스탬프
  const timeStamp = async () => {
    const result = await axios.get(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
      {
        params: {
          key: APIKEY,
          //스팀로그인
          steamids: ProfleSteamId,
        },
      }
    );

    sessionStorage.setItem("gameid", result?.data.response.players[0].gameid);
    sessionStorage.setItem("steamid", result.config.params.steamids);
    sessionStorage.setItem(
      "profileimg",
      result?.data.response.players[0].avatarfull
    );
    sessionStorage.setItem(
      "nickName",
      result?.data.response.players[0].personaname +
        " " +
        "#" +
        result.config.params.steamids.slice(13, 18)
    );
    sessionStorage.setItem(
      "gameextrainfo",
      result?.data.response.players[0].gameextrainfo
    );
    await axios.put(`http://localhost:3001/auth/${ProfleSteamId}`, {
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
      lastLogin: new Date(),
    });
  };
  //유저 최신정보 & 타임스탬프 새로고침 할 떄 마다.
  window.onload = timeStamp;

  //로그아웃 버튼
  const logout = async () => {
    await axios.put(`http://localhost:3001/auth/${ProfleSteamId}`, {
      ...loginInformation?.data,
      login: false,
    });
    window.location.replace("/");
    sessionStorage.clear();
  };

  // 온라인 오프라인 토글버튼
  const onLineToogle = async () => {
    const onlineOnOff = ProfileLogin === "true" ? "false" : "true";
    sessionStorage.setItem("login", onlineOnOff);
    setOnline(!online);
    await axios.put(`http://localhost:3001/auth/${ProfleSteamId}`, {
      ...loginInformation?.data,
      login: !online,
    });
  };

  useEffect(() => {
    let polling = setInterval(() => {
      timeStamp();
    }, 30000);

    return () => {
      clearInterval(polling);
    };
  }, []);

  return (
    <>
      <ProfileDiv layoutMenu={layoutMenu}>
        {ProfileNicName === null ? (
          ""
        ) : (
          <>
            <ProfileLogout onClick={logout}>로그아웃</ProfileLogout>
            <ProfileImgBox>
              {" "}
              <ProfileImg src={`${ProfileImgUrl}`} />{" "}
            </ProfileImgBox>
          </>
        )}

        {ProfileNicName === null ? (
          ""
        ) : (
          <ProfileInfoBox>
            <ProfileNickName>{ProfileNicName}</ProfileNickName>

            {/* <ProfileFriends>친구 몇마리</ProfileFriends> */}
            <ChangeToggle onClick={onLineToogle}>
              {online ? <ChannelOn /> : <ChannelOff />}
              {online ? "온라인" : "오프라인"}
            </ChangeToggle>
          </ProfileInfoBox>
        )}

        <ProfileBox ProfileNicName={ProfileNicName}>
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
            <>
              <RecentGame> 최근 활동한 게임</RecentGame>
              {GameData?.map((gameData: any) => {
                return <RecentGameData gameData={gameData} />;
              })}
            </>
          )}
        </ProfileBox>
      </ProfileDiv>
    </>
  );
}

export default Profile;

const moveUpAndDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-400px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ScrollContainer = styled.div`
  width: 800px;
  height: 200px;
  overflow: hidden;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${moveUpAndDown} 7s linear infinite;
`;

const ScrollItem = styled.div`
  height: 100px;
  background-color: #ccc;
  margin-bottom: 20px;
`;
const ChangeToggle = styled.span`
  display: flex;
  font-size: 14px;
  justify-content: center;
  margin: 15px 0;
  color: white;
  cursor: pointer;
`;
const ChannelOff = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: red;
  margin-right: 5px;
`;
const ChannelOn = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #23de79;
  margin-right: 5px;
`;
const ProfileLogout = styled.span`
  color: #ccc;
  font-size: 13px;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;
const ProfileDiv = styled.div<{ layoutMenu: String }>`
  padding-top: 20px;
  height: 100%;

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
  margin: 0px auto 0;
`;
const ProfileImg = styled.img`
  width: 173px;
  height: 173px;
  background-color: green;
`;
const ProfileInfoBox = styled.div`
  color: white;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const ProfileNickName = styled.div`
  font-size: 20px;
`;

const ProfileBox = styled.div<{ ProfileNicName: String | null }>`
  width: 352px;
  height: ${(props) => (props.ProfileNicName === null ? "950px" : "650px")};
  background-color: #192030;
  margin: ${(props) => (props.ProfileNicName === null ? "" : "20px auto 0")};
  position: ${(props) => (props.ProfileNicName !== null ? "" : "absolute")};
  top: ${(props) => (props.ProfileNicName !== null ? "" : "50%")};
  left: ${(props) => (props.ProfileNicName !== null ? "" : "50%")};
  transform: ${(props) =>
    props.ProfileNicName !== null ? "" : "translate(-50%, -50%);"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const RecentGame = styled.div`
  margin-top: 35px;
  margin-bottom: 20px;
  color: white;
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

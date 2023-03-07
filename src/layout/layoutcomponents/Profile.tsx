import React, { useEffect, useState } from "react";
import { LayoutButton, friendAllState } from "../../recoil/atom";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import RecentGameData from "../../components/RecentGameData";
import { useRecoilState } from "recoil";
interface UserInfo {
  id: string;
  profileimg: string;
  nickname: string;
  gameid: string;
  gameextrainfo: string;
  login: boolean;
  lastLogin: Date;
}
function Profile() {
  const FRONTEND_URL: any = process.env.REACT_APP_FRONTEND_URL;
  const PROXY_ID: any = process.env.REACT_APP_PROXY_ID;
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

  const [friendAllRecoil, setFriendAllRecoil] =
    useRecoilState<any>(friendAllState);

  // 어스아이디
  const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${FRONTEND_URL}/login/&openid.realm=${FRONTEND_URL}/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  ///////////////////////////
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";

  const [online, setOnline] = useState<boolean>(true);
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;
  const serverUrl = `${DATABASE_ID}/auth`;

  //로그인
  const userDataGet = async () => {
    const result = await axios.get(
      `${PROXY_ID}/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`,
      {
        params: {
          key: APIKEY,
          //스팀로그인ㅇ
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
        result?.config.params.steamids.slice(13, 18)
    );
    sessionStorage.setItem(
      "gameextrainfo",
      result?.data.response.players[0].gameextrainfo
    );
    console.log("result", result?.data);

    //steam에서 변경된사항이 있을때 put을 통해 dbjson을 업데이트해줌
    const userinfo: UserInfo = {
      id: result.config.params.steamids,
      profileimg: result?.data.response.players[0].avatarfull,
      nickname:
        result?.data.response.players[0].personaname +
        " " +
        "#" +
        result?.config.params.steamids.slice(13, 18),
      gameid: result?.data.response.players[0].gameid,
      gameextrainfo: result?.data.response.players[0].gameextrainfo,
      login: online,
      lastLogin: new Date(),
    };

    if (
      !friendAllRecoil
        .map((e: any) => e.id)
        .includes(result.config.params.steamids)
    ) {
      await axios.post(serverUrl, userinfo);
      window.location.replace("/");
    } else {
      await axios.put(`${DATABASE_ID}/auth/${steamId}`, userinfo);
      window.location.replace("/");
    }
  };

  const { data } = useQuery("userData", userDataGet);

  //유저 db정보 가져오기
  const getLoginData = async () => {
    const result = await axios.get(`${DATABASE_ID}/auth/${ProfleSteamId}`);
    return result;
  };

  const { data: loginInformation } = useQuery("loginInformation", getLoginData);

  //최근 게임활동 정보가져오기
  const getRecentGameData = async () => {
    const recentGame = await axios.get(
      `${PROXY_ID}/http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${APIKEY}&steamid=${ProfleSteamId}&format=json`
    );
    console.log("recentGame", recentGame);

    return recentGame;
  };

  const { data: recentGame } = useQuery("getRecentGameData", getRecentGameData);
  const GameData = recentGame?.data.response.games;

  //유저 최신정보 & 타임스탬프
  const timeStamp = async () => {
    const result = await axios.get(
      `${PROXY_ID}/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`,
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
    await axios.put(`${DATABASE_ID}/auth/${ProfleSteamId}`, {
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
    await axios.put(`${DATABASE_ID}/auth/${ProfleSteamId}`, {
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
    await axios.put(`${DATABASE_ID}/auth/${ProfleSteamId}`, {
      ...loginInformation?.data,
      login: !online,
    });
  };

  useEffect(() => {
    console.log("friendAllRecoil", friendAllRecoil);
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
        {/* 로그인을 안했다면*/}
        {ProfileNicName === null ? (
          ""
        ) : (
          <>
            <ProfileImgBox>
              <ProfileImg src={`${ProfileImgUrl}`} />
            </ProfileImgBox>
            <ProfileLogout onClick={logout}>로그아웃</ProfileLogout>
          </>
        )}
        {/* 로그인을 안했다면*/}
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
          {/* 로그인을 안했다면*/}
          {ProfileNicName === null ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </div>
          ) : (
            <>
              {/* 최근홢동한게임이 없다면 */}
              {GameData === undefined ? (
                <>
                  <RecentGame>
                    <div>최근 활동한 게임이 없습니다.</div>
                  </RecentGame>
                  {GameData?.slice(0, 3).map((gameData: any) => {
                    return <RecentGameData gameData={gameData} />;
                  })}
                </>
              ) : (
                <>
                  <RecentGame> 최근 활동한 게임</RecentGame>
                  {GameData?.slice(0, 3).map((gameData: any) => {
                    return <RecentGameData gameData={gameData} />;
                  })}
                </>
              )}
            </>
          )}
        </ProfileBox>
      </ProfileDiv>
    </>
  );
}

export default Profile;

const ChangeToggle = styled.span`
  display: flex;
  font-size: 14px;
  justify-content: center;
  margin-top: 12px;
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
const ProfileLogout = styled.p`
  color: #d4d4d4;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;
const ProfileDiv = styled.div<{ layoutMenu: String }>`
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
  position: relative;
  left: 115px;
  top: 68px;
  /* margin: 68px auto 0; */
`;
const ProfileImg = styled.img`
  width: 173px;
  height: 173px;
  background-color: green;
`;
const ProfileInfoBox = styled.div`
  margin-top: 110px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const ProfileNickName = styled.p`
  font-size: 24px;
`;

const ProfileBox = styled.div<{ ProfileNicName: String | null }>`
  width: 352px;
  /* height: ${(props) =>
    props.ProfileNicName === null ? "550px" : "550px"}; */
  /* background-color: #192030; */
  margin: ${(props) => (props.ProfileNicName === null ? "" : "0px auto 0")};
  position: ${(props) => (props.ProfileNicName !== null ? "" : "absolute")};
  top: ${(props) => (props.ProfileNicName !== null ? "" : "50%")};
  left: ${(props) => (props.ProfileNicName !== null ? "" : "50%")};
  transform: ${(props) =>
    props.ProfileNicName !== null ? "" : "translate(-50%, -50%);"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* background-color: red; */
  padding-top: 40px;
`;

const RecentGame = styled.p`
  color: #d4d4d4;
  font-size: 14px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ProfileGameComments = styled.div`
  color: gray;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

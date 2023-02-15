import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/&openid.realm=http://localhost:3000&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
const LoginPage: any = () => {
  const navigate = useNavigate();
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const serverUrl = "http://localhost:3001/auth/";

  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  //useMutation get 하고 dbjson에 post 하기
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
    const userinfo = {
      id: result.config.params.steamids,
      profileimg: result?.data.response.players[0].avatarfull,
      nickname:
        result?.data.response.players[0].personaname +
        "#" +
        result.config.params.steamids.slice(13, 18),
    };

    axios.post(serverUrl, userinfo);
    // alert("로그인되었습니다.");
    return result;
  };
  //steam userData
  const { data } = useQuery("userData", userDataGet);
  const userID = data?.data.response.players[0].steamid;

  //dbjson에 유저정보 삭제하기 핸들러
  const userDeleteMutation = useMutation(() =>
    // axios.delete( `http://localhost:3001/auth/${userID}` )
    axios.delete(`${serverUrl}${userID}`)
  );
  const deleteHandeler = () => {
    userDeleteMutation.mutate();
    alert("회원탈퇴 되었습니다");
    navigate(`/`);
  };
  useEffect(() => {
    if (steamId) {
      userDataGet();
    }
  }, []);

  return (
    <div>
      <button onClick={SteamLogin}>Login with Steam</button>
      <button onClick={deleteHandeler}>회원탈퇴하기</button>
    </div>
  );
};

export default LoginPage;

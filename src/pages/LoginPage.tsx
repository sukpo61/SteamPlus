import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "react-query";

//스팀 로그인 페이지 변수
interface steam {
  id: any;
  profileimg: any;
  nickname: any;
}
const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/&openid.realm=http://localhost:3000&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
const LoginPage: any = () => {
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];

  const [error, setError] = useState(null);
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";

  const [userinfo, setUserinfo] = useState<steam>({
    id: "",
    profileimg: "",
    nickname: "",
  });

  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };

  const userData = async () => {
    axios
      .get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/", {
        params: {
          key: APIKEY,
          //스팀로그인
          steamids: steamId,
        },
      })
      .then((response) => {
        // console.log("userstate", response);
        setUserinfo({
          id: response.config.params.steamids,
          profileimg: response?.data.response.players[0].avatarfull,
          nickname: response?.data.response.players[0].personaname,
        });
        console.log("data", userinfo);
      })
      .catch((error) => setError(error));
  };

  // setSteamids(testId);

  useEffect(() => {
    if (steamId) {
      userData();
    }
  }, []);

  const axiosInstance = axios.create({
    baseURL: STEAM_OPENID_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (
    <div>
      <button onClick={SteamLogin}>Login with Steam</button>
    </div>
  );
};

export default LoginPage;

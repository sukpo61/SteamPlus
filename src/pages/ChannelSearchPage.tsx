import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loginedrecoil } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";

//스팀 로그인 페이지 변수
const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3001/&openid.realm=http://localhost:3001&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;

const ChannelSearchPage: any = () => {
  const params: any = new URLSearchParams(window.location.search);
  const steamId = params.get("openid.claimed_id")?.split("/")[5];
  console.log(steamId);

  const [error, setError] = useState(null);
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";

  const [userinfo, setUserinfo] = useState({
    id: "",
    profileimg: "",
    nickname: "",
  });

  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };

  // const [steamids, setSteamids] = useState<any>("76561199476963056");
  // const [test, setTest] = useState<any>();
  // ___76561199478670991,
  // __76561199476963056;
  //steam id를 slice로 잘라서 아이디 고유번호로 쓸거
  // const hashtag = steamids.slice(13, 17);
  // nickName이랑 고유번호를 붙여놓음
  // const userNicName = nickName + "#" + hashtag;

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
        console.log("userstate", response);

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

  return (
    <div>
      <button onClick={SteamLogin}>Login with Steam</button>
    </div>
  );
};

export default ChannelSearchPage;

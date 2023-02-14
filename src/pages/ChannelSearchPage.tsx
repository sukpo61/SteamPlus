import React, { useState, useEffect } from "react";
import axios from "axios";

//스팀 로그인 페이지 변수
const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/&openid.realm=http://localhost:3000&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
const ChannelSearchPage: any = () => {
  const [error, setError] = useState<any>(null);
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };
  // https://cors-anywhere.herokuapp.com/
  // steam nickName
  const [nickName, setNickName] = useState();
  // steam profileImg URL
  const [profileImg, setProfileImg] = useState();
  //steam id
  const [tag, setTag] = useState("76561199476963056");
  //steam id를 slice로 잘라서 아이디 고유번호로 쓸거
  const hashtag = tag.slice(4, 8);
  // nickName이랑 고유번호를 붙여놓음
  const userNicName = nickName + "#" + hashtag;
  useEffect(() => {
    //검색
    // axios
    //   .get(
    //     "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/storesearch",
    //     {
    //       params: {
    //         cc: "us",
    //         l: "en",
    //         term: "dead",
    //         //limit : 20
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("searchresult", response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //유저정보
    //cors 에러 헤결 https://cors-anywhere.herokuapp.com 들어가서 request 누르기
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
        {
          params: {
            key: APIKEY,
            //스팀로그인
            steamids: "76561199476963056",
          },
        }
      )

      .then((response) => {
        console.log("userstate", response);
        setNickName(response?.data.response.players[0].personaname);
        setProfileImg(response?.data.response.players[0].avatarfull);
      })

      .catch((error) => setError(error));

    // 게임정보
    // axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
    //     {
    //       params: {
    //         appids: "250900",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("gamedetail", response);
    //   })
    //   .catch((error) => {
    //     setError("Could not retrieve header image");
    //   });
  }, []);
  // console.log(
  //   "닉네임",
  //   nickName,
  //   "프로필이미지",
  //   profileImg,
  //   "해쉬태그",
  //   hashtag
  // );

  console.log(userNicName);

  return (
    <div>
      <button onClick={SteamLogin}>Login with Steam</button>
    </div>
  );
};

export default ChannelSearchPage;

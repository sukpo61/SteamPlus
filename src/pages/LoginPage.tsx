// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
// const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/login/&openid.realm=http://localhost:3000/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
// const LoginPage: any = () => {
//   const navigate = useNavigate();
//   const params: any = new URLSearchParams(window.location.search);
//   const steamId = params.get("openid.claimed_id")?.split("/")[5];
//   const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
//   const serverUrl = "http://localhost:3001/auth/";
//   const [online, setOnline] = useState("true");
//   const SteamLogin = () => {
//     window.location.href = STEAM_OPENID_ENDPOINT;
//   };

//   //useMutation get 하고 dbjson에 post 하기
//   const userDataGet = async () => {
//     const result = await axios.get(
//       "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
//       {
//         params: {
//           key: APIKEY,
//           //스팀로그인
//           steamids: steamId,
//         },
//       }
//     );
//     //로컬스토리지에 로그인정보 저장하기
//     localStorage.setItem("login", online);
//     localStorage.setItem("gameid", result?.data.response.players[0].gameid);
//     localStorage.setItem("steamid", result.config.params.steamids);
//     localStorage.setItem(
//       "profileimg",
//       result?.data.response.players[0].avatarfull
//     );
//     localStorage.setItem(
//       "nickName",
//       result?.data.response.players[0].personaname +
//         " " +
//         "#" +
//         result.config.params.steamids.slice(13, 18)
//     );
//     localStorage.setItem(
//       "gameextrainfo",
//       result?.data.response.players[0].gameextrainfo
//     );

//     //steam에서 변경된사항이 있을때 put을 통해 dbjson을 업데이트해줌
//     const userinfo = {
//       id: result.config.params.steamids,
//       profileimg: result?.data.response.players[0].avatarfull,
//       nickname:
//         result?.data.response.players[0].personaname +
//         " " +
//         "#" +
//         result.config.params.steamids.slice(13, 18),
//       gameid: result?.data.response.players[0].gameid,
//       gameextrainfo: result?.data.response.players[0].gameextrainfo,
//       login: online,
//     };
//     axios.put(`http://localhost:3001/auth/${steamId}`, userinfo);
//     axios.post(serverUrl, userinfo);
//     navigate("/");
//     return result;
//   };

//   //steam userData
//   const { data } = useQuery("userData", userDataGet);
//   const userID = data?.data.response.players[0].steamid;

//   //dbjson에 유저정보 삭제하기 핸들러
//   const userDeleteMutation = useMutation(() =>
//     axios.delete(`${serverUrl}${userID}`)
//   );
//   const deleteHandeler = () => {
//     userDeleteMutation.mutate();
//     alert("회원탈퇴 되었습니다");
//     navigate(`/`);
//   };
//   const goto = () => {
//     navigate("/mypage");
//   };
//   useEffect(() => {
//     if (steamId) {
//       userDataGet();
//     }
//   }, []);

//   return (
//     <div style={{ background: "white" }}>
//       <button onClick={SteamLogin}>Login with Steam</button>
//       <button onClick={deleteHandeler}>회원탈퇴하기</button>
//       <button onClick={goto}>클릭</button>
//     </div>
//   );
// };

// export default LoginPage;
import React from "react";

function LoginPage() {
  return <div>LoginPage</div>;
}

export default LoginPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";

interface Game {
  [key: string]: string | number | boolean | any;
  appid: number;
  name: string;
}

const ChannelSearchPage: any = () => {
  const navigate = useNavigate();

  const [searchGames, setSearchGames] = useState<Game[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("dead");

  //검색
  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/storesearch",
        {
          params: {
            cc: "us",
            l: "en",
            term: "dead",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // 유저 정보 api
  //   axios
  //     .get(
  //       "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
  //       {
  //         params: {
  //           key: "234E0113F33D5C7C4D4D5292C6774550",
  //           steamids: "76561198374391933",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => setError(error));
  // }, []);

  return (
    // <div>
    //   <input
    //     type="text"
    //     value={searchInput}
    //     onChange={(e) => setSearchInput(e.target.value)}
    //   />
    //   {searchGames.map((game: Game) => (
    //     <div key={`${game.appid}`}>
    //       <div>{`${game.name}`}</div>
    //     </div>
    //   ))}
    // </div>
    <div
      style={{
        marginLeft: 100,
        backgroundColor: "#192030",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: 1080,
      }}
    >
      <SearchPageHeader>
        <SteamPlusLogo />
        <GameSearchInputArea>
          <GameSearchInput />
          <BiSearchAlt2 className="searchIcon" />
        </GameSearchInputArea>
      </SearchPageHeader>
      <SearchCount>
        '{}블라블라' 검색 결과 {}n 개
      </SearchCount>
      <GameSearchList>
        <GameChannelBlock />
        <GameChannelBlock />
        <GameChannelBlock />
      </GameSearchList>
    </div>
  );
};

const SearchPageHeader = styled.div`
  background-color: #404b5e;
  /* position: absolute; */
  width: 1820px;
  height: 120px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px 24px 20px 24px;
`;

const SteamPlusLogo = styled.div`
  width: 70px;
  height: 68px;
  background: #a7a9ac;
  border-radius: 20px;
`;
const GameSearchInputArea = styled.div`
  width: 632px;
  height: 68px;
  background: #192030;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .searchIcon {
    width: 48px;
    height: 48px;
    left: 568px;
    top: 12px;
    color: #777d87;
  }
`;

const GameSearchInput = styled.input`
  width: 520px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.03em;

  background: none;
  color: #d4d4d4;
  border-style: none;
`;

const SearchCount = styled.div`
  margin-top: 24px;
  margin-bottom: 60px;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #a7a9ac;
  margin-left: 114px;
`;
const GameSearchList = styled.div`
  width: 890px; // 홈에서 사이즈 조절 필요
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 114px;
`;

export default ChannelSearchPage;

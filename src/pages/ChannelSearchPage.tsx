import React, { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useRecoilState, atom } from "recoil";

interface Game {
  [key: string]: string | number | boolean | any;
  appid: number;
  name: string;
  id: string;
}

// const searchResultsState = atom({
//   key: "searchResultsState",
//   default: [],
// });

const ChannelSearchPage: any = () => {
  const [searchGames, setSearchGames] = useState<Game[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);

  // https://cors-anywhere.herokuapp.com/

  // 게임정보
  //   axios
  //     .get(
  //       `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
  //       {
  //         params: {
  //           appids: "250900",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("gamedetail", response);
  //     })
  //     .catch((error) => {
  //       setError("Could not retrieve header image");
  //     });
  // }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const SubmitSearch = (Value: any) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/storesearch",
        {
          params: {
            cc: "us",
            l: "en",
            term: Value,
            //limit : 20
          },
        }
      )
      .then((response) => {
        response.data.items.map((game: any) => {
          getGameCategory(game);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGameCategory = (gameinfo: any) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails",
        { params: { appids: gameinfo.id, filters: "categories" } }
      )
      .then((res) => {
        console.log("appid", res);

        setSearchResult((e: any) => [
          ...e,
          {
            image: gameinfo.tiny_image,
            name: gameinfo.name,
            cate: res.data[gameinfo.id].data.categories
              .map((cate: any) => cate.description)
              .slice(0, 2)
              .toString(),
          },
        ]);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // const handleOnKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleOnClick(); // Enter 입력이 되면 클릭 이벤트 실행
  //   }
  // };

  return (
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
          <GameSearchInput
            type="text"
            value={searchValue}
            onChange={handleSearch}
            // handleSearch
          />
          <BiSearchAlt2
            className="searchIcon"
            onClick={() => {
              SubmitSearch(searchValue);
            }}
          />
        </GameSearchInputArea>
      </SearchPageHeader>
      <SearchCount>
        '{`${searchValue}`}' 검색 결과 {}n 개
      </SearchCount>
      <GameSearchList>
        {searchResult.map((game: any) => {
          return (
            <GameChannelBlockView key={game.id}>
              <GameChannelBlock game={game} />
            </GameChannelBlockView>
          );
        })}
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
    cursor: pointer;
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
  width: 890px; // MianPage SearchPage에서 사이즈 조절 필요
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 114px;
`;

const GameChannelBlockView = styled.div``;

export default ChannelSearchPage;

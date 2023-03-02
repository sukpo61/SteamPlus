import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";

import { useQuery, useQueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useRecoilState, atom } from "recoil";

const ChannelSearchPage: any = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([null]); // 검색어 없을때 예외처리
  const [termResult, setTermResult] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTermResult = () => {
    if (searchValue.length < 2) {
      alert("두 글자 이상 입력해 주세요");
    }
    setTermResult(searchValue);
    // getGameSummary(searchValue, offset);
    // queryClient.invalidateQueries("gameSummaryData")
  };

  const getGameSummary = async () => {
    console.log("termResult", termResult);

    const gameSummary = await axios.get(
      `https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${termResult}&pagesize=20`
    ); // 게임 Id만 가져오기!!!

    const gameList = [];

    for (let i = 0; i < gameSummary?.data.items.length; i++) {
      const gameCategoryData2 = await axios.get(
        `https://store.steampowered.com/api/appdetails/?appids=${gameSummary?.data.items[i].id}`
      );
      //썸네일, 제목, 장르
      gameList.push(
        gameCategoryData2?.data[gameSummary?.data.items[i].id].data
      );
    }
    const filterList = gameList.filter((game) => game.type === "game");
    console.log("dlc", filterList);
    return filterList; // filterDLC는 getGameSummary 안에서만 사용 가능!!!!
  };

  const {
    data: gameSummaryData, // 게임id
  } = useQuery(["gameSummaryData", termResult], getGameSummary);

  console.log("gameSummaryData", gameSummaryData);

  return (
    <div
      style={{
        backgroundColor: "#192030",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // minHeight: 1080,
      }}
    >
      <SearchPageHeader>
        <SteamPlusLogo />
        <GameSearchInputArea>
          <GameSearchInput
            type="text"
            value={searchValue}
            onChange={handleSearch}
          />
          <BiSearchAlt2
            className="searchIcon"
            onClick={() => {
              // getGameSummary(); //searchValue, offset
              handleTermResult();
              // handleResultList();
            }}
          />
        </GameSearchInputArea>
      </SearchPageHeader>
      {termResult === "" ? (
        <BeforeSearch>참여하고 싶은 게임 채널을 검색해보세요!</BeforeSearch>
      ) : (
        <div>
          <SearchCount>
            '{`${termResult}`}' 검색 결과는 {gameSummaryData?.length ?? "0"}
            개입니다
          </SearchCount>
          <GameSearchList>
            {gameSummaryData?.map((game: any) => {
              // console.log("game", game.genre);
              return (
                <GameChannelBlockView key={game?.id}>
                  <GameChannelBlock game={game} />
                </GameChannelBlockView>
              );
            })}
          </GameSearchList>
        </div>
      )}
    </div>
  );
};
// ?.filter((game: any) => game?.type === !"dlc")

//data.pages.map(page=>page.results).flat()

const SearchNone = styled.div`
  color: white;
  font-size: 2rem;
`;

const SearchPageHeader = styled.div`
  background-color: #404b5e;
  /* position: absolute; */
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 56px;
`;

const SteamPlusLogo = styled.div`
  width: 40px;
  height: 40px;
  background: #a7a9ac;
  border-radius: 10px;
`;
const GameSearchInputArea = styled.div`
  width: 632px;
  height: 40px;
  background: #192030;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 9px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .searchIcon {
    width: 24px;
    height: 24px;
    color: #777d87;
    cursor: pointer;
  }
`;

const GameSearchInput = styled.input`
  width: 520px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.03em;
  background: none;
  color: #d4d4d4;
  border-style: none;
`;

const BeforeSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 330px;

  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  letter-spacing: -0.03em;

  color: #777d87;
`;

const SearchCount = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
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
  gap: 10px;
  margin-left: 114px;
`;

const GameChannelBlockView = styled.div``;

export default ChannelSearchPage;

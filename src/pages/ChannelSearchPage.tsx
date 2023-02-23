import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
// import {getGameSummary, getGameCategory} from "../../api"

import { useQuery, useQueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useRecoilState, atom } from "recoil";

const ChannelSearchPage: any = () => {
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([null]); // 검색어 없을때 예외처리
  const [termResult, setTermResult] = useState("");

  // const queryClient = useQueryClient()
  // https://cors-anywhere.herokuapp.com/

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleTermResult = () => {
    setTermResult(searchValue);
    setSearchResult([]);
    // getGameSummary(searchValue, offset);
    // queryClient.invalidateQueries("gameSummaryData")
  };

  // const lastGameRef = useRef<any>(null);
  // const [offset, setOffset] = useState<any>(0);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll); // addEventListener 이벤트 추가
  //   return () => window.removeEventListener("scroll", handleScroll); // removeEventListener 이벤트 제거
  // }, []);

  // const handleScroll = useCallback(() => {
  //   if (
  //     window.innerHeight + window.pageYOffset >= //영역의 높이 + 컨텐츠를 얼마나 스크롤했는지
  //     lastGameRef.current.getBoundingClientRect().bottom //getBoundingClientRect = dom의 위치
  //   ) {
  //     setOffset(offset + 10);
  //     getGameSummary(searchValue); //searchValue, offset
  //   }
  // }, [offset, searchValue]);

  // 무한스크롤 try

  // const handleScroll = () => {
  //   const scrollTop = // 화면의 처음부터 ~ 현재 화면에 보이는 부분 + 현재 스크롤 위치
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;

  //   const scrollHeight = // 전체 화면 길이
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;

  //   const clientHeight = // 현재 화면에서 보이는 height
  //     document.documentElement.clientHeight || window.innerHeight;

  //   const scrolledToBottom =
  //     Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  //   if (scrolledToBottom) {
  //     setOffset((prev: any) => prev + 10);
  //     console.log("searchvalue", searchValue);
  //     getGameSummary(searchValue, offset + 10); // 이부분 수정
  //   }
  // };

  //디바운싱

  // 2200780

  // searchValue: any, offset: number

  const getGameSummary = async () => {
    if (searchValue === "") {
      return;
    } else if (termResult.length < 2) {
      alert("나가");
      setTermResult("");
      setSearchValue("");
      return;
    }
    const gameSummary = await axios.get(
      `https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${termResult}`
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
    return gameList;
  };
  const { data: gameSummaryData } = useQuery(
    ["gameSummaryData", termResult],
    getGameSummary
  );
  //검색할때마다 매번 searchValue로 리셋, 새로운 정보를 받아올떄마다 querykey가 바껴야함
  //특정 list를 불러올 때 정적쿼리키를 쓰는게 좋을때가 많음
  //만약 string으로된 키값만 사용한다면 리렌더링될때 불필요한 서버요청을 안하게됨(캐시메모리에 잇는걸 가져다 써서)
  //queryfunction재실행시 캐시메모리에 있는걸 가져다씀

  //!!!!!캐시메모리!!!!!!

  return (
    <div
      style={{
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
          />
          <BiSearchAlt2
            className="searchIcon"
            onClick={() => {
              // getGameSummary(); //searchValue, offset
              handleTermResult();
            }}
          />
        </GameSearchInputArea>
      </SearchPageHeader>
      <SearchCount>
        '{`${termResult}`}' 검색 결과 {}n 개
      </SearchCount>
      <GameSearchList>
        {gameSummaryData?.map((game: any) => {
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
  gap: 10px;
  margin-left: 114px;
`;

const GameChannelBlockView = styled.div``;

export default ChannelSearchPage;

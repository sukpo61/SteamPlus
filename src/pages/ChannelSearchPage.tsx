import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import { useQuery, useQueryClient } from "react-query";
import { QueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useRecoilState, atom } from "recoil";

const ChannelSearchPage: any = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([null]); // 검색어 없을때 예외처리
  const [termResult, setTermResult] = useState("");
  const [filteredCount, setFilteredCount] = useState<number>(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTermResult = () => {
    if (searchValue.length < 2) {
      alert("두 글자 이상 입력해 주세요");
    } else {
      setTermResult(searchValue);
    }
    // setSearchResult([]);

    // getGameSummary(searchValue, offset);
    // ueryClient.invalidateQueries("gameSummaryData")
  };

  const handleSearchClick = () => {
    if (searchValue === "") {
      return;
    } else if (searchValue.length < 2) {
      // searchValue : 새로고침 후 첫검색때 console에 출처 모를 리스트가 찍힘
      // termResult : 새로고침 후 처음 검색한 검색어는 검색창에서 리셋되고, 두번째 검색어부터 console 찍힘
      // setTermResult("");
      // setSearchValue("");
      // setFilteredCount(0);
      return;
    }

    //   if (searchValue.length < 2) {
    //     return false;
    //   }
    getGameSummary();
  };
  //

  // useEffect(() => {
  //   console.log(searchValue);
  // }, [searchValue]);

  //https://github.com/Revadike/InternalSteamWebAPI
  // steam 공식 github!!!!!!!!!!!!!!!!!

  // const lastGameRef = useRef<any>(null);
  // const [offset, setOffset] = useState<any>(0);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll); // addEventListener 이벤트 추가
  //   return () => window.removeEventListener("scroll", handleScroll); // removeEventListener 이벤트 제거
  // }, []);

  // 킵

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

  // searchValue: any, offset: number

  // npx json-server --watch db.json --port 3001
  // https://cors-anywhere.herokuapp.com/

  const getGameSummary = async () => {
    console.log("termResult", termResult);

    const gameSummary = await axios.get(
      `https://store.steampowered.com/api/storesearch/?cc=us&l=en&term="${termResult}"` // &pagesize=20
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
    console.log("game", filterList);
    setFilteredCount(filterList.length);
    return filterList;
  };

  // useInView = react-intersection-observer 라이브러리
  // 리스트 끝까지 내렸을때 inview가 true가 됨(성민준님 추정)

  const {
    data: gameSummaryData, // 게임id
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["gameSummaryData", termResult], getGameSummary, {
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.page <= lastPage?.total_pages) {
        return lastPage?.page + 1;
      }
    },
  });

  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  // console.log("gameSummaryData", gameSummaryData);

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
              // handleSearchClick(); //
              // getGameSummary(); //searchValue, offset
              handleTermResult();
              // handleResultList();
            }}
          />
        </GameSearchInputArea>
      </SearchPageHeader>
      <SearchCount>
        '{`${termResult}`}' 검색 결과는 {filteredCount}개입니다
      </SearchCount>
      <GameSearchList>
        {gameSummaryData?.pages
          // .map((page: any) => page?.results)
          .flat()
          .map((game: any) => {
            if (game === undefined) {
              return <div></div>;
            }
            // console.log("game", game);
            return (
              <GameChannelBlockView key={game?.id}>
                <GameChannelBlock game={game} />
              </GameChannelBlockView>
            );
          })}
      </GameSearchList>
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

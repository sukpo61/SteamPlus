import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";

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
    if (searchValue.length <= 1) {
      alert("두 글자 이상 입력해 주세요");
      setTermResult(termResult);
    } else {
      setSearchResult([]);
      setTermResult(searchValue);
    }
    // getGameSummary(searchValue, offset);
    // queryClient.invalidateQueries("gameSummaryData")
  };

  // const handleResultList = () => {
  //   setSearchResult([]);
  // };

  // 리액트 인피니티 스크롤러
  //  https://velog.io/@blee94/React-Pagination-Infinite-Scroll-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98%EA%B3%BC-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%97%90-%EB%8C%80%ED%95%B4-ARABOZA

  //https://github.com/Revadike/InternalSteamWebAPI
  // steam 공식 github!!!!!!!!!!!!!!!!!

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

  //디바운싱 적용하기!
  // 홈 -> 검색 -> 홈 -> 검색 이동하면 검색리스트가 유지되게 하는건????
  // length 로 총 갯수 표현...하던가

  //db업데이트는 비효율적
  //브라우저 내에서 처리할 수 있게

  // 2200780

  // searchValue: any, offset: number

  const getGameSummary = async () => {
    if (searchValue === "") {
      return;
    }
    const gameSummary = await axios.get(
      `https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${termResult}&pagesize=20`
    ); // 게임 Id만 가져오기!!!

    const gameList = [];

    for (let i = 0; i < gameSummary?.data.items.length; i++) {
      const gameCategoryData2 = await axios.get(
        `https://store.steampowered.com/api/appdetails/?appids=${gameSummary?.data.items[i].id}`
      );

      // console.log("api2", gameCategoryData2);
      //썸네일, 제목, 장르
      gameList.push(
        gameCategoryData2?.data[gameSummary?.data.items[i].id].data
      );
    }
    const filterList = gameList.filter((game) => game.type === "game");
    console.log("dlc", filterList);
    return filterList; // filterDLC는 getGameSummary 안에서만 사용 가능!!!!
  };

  // useInView = react-intersection-observer 라이브러리
  // 리스트 끝까지 내렸을때 inview가 true가 됨(성민준님 추정)

  const {
    data: gameSummaryData, // 게임id
  } = useQuery(["gameSummaryData", termResult], getGameSummary);

  // console.log("gameSummaryData", gameSummaryData);

  //검색할때마다 매번 searchValue로 리셋, 새로운 정보를 받아올떄마다 querykey가 바껴야함
  //특정 list를 불러올 때 정적쿼리키를 쓰는게 좋을때가 많음
  //만약 string으로된 키값만 사용한다면 리렌더링될때 불필요한 서버요청을 안하게됨(캐시메모리에 잇는걸 가져다 써서)
  //queryfunction재실행시 캐시메모리에 있는걸 가져다씀

  //!!!!!캐시메모리!!!!!!

  // axios
  //   .get(
  //     "https://store.steampowered.com/api/appdetails",
  //     { params: { appids: 2200780 } }
  //   )
  //   .then((res) => {
  //     console.log("appid", res);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // console.log("gameSummaryData", gameSummaryData);

  // 검색어 갯수 제한

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
      <SearchCount>
        '{`${termResult}`}' 검색 결과는 {gameSummaryData?.length ?? "0"}개입니다
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

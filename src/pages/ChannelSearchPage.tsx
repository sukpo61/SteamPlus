import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled, { keyframes } from "styled-components";
import { useInfiniteQuery } from "react-query";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";

import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";

import Footer from "../components/common/Footer";

// import ParticipationRequest from "../layout/ParticipationRequest";

// 게시판 홈 검색

const ChannelSearchPage: any = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([null]); // 검색어 없을때 예외처리
  const [termResult, setTermResult] = useState("");
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTermResult = () => {
    if (searchValue.length < 2) {
      alert("두 글자 이상 입력해 주세요");
    } else {
      setTermResult(searchValue);
    }
  };

  // const handleSearchClick = () => {
  //   if (searchValue === "") {
  //     return;
  //   } else if (searchValue.length < 2) {
  //     // searchValue : 새로고침 후 첫검색때 console에 출처 모를 리스트가 찍힘
  //     // termResult : 새로고침 후 처음 검색한 검색어는 검색창에서 리셋되고, 두번째 검색어부터 console 찍힘
  //     return;
  //   }
  //   getGameSummary();
  // };

  // searchValue: any, offset: number

  // 초반 10개가 로드되고, 그 10개를 filterList에서 제외한 배열이 스크롤이 바닥에 닿을 때마다 추가로 10개씩 뱉어내게 하면..???
  // 근데 가능하긴 한가 이거

  const getGameSummary = async () => {
    setIsLoading(true);

    console.log("termResult", termResult);

    const gameSummary = await axios.get(
      `https://enable-cors.glitch.me/https://store.steampowered.com/api/storesearch/?cc=us&l=en&term="${termResult}"` // &pagesize=20
    ); // 게임 Id만 가져오기!!!

    const gameList = [];

    for (let i = 0; i < gameSummary?.data.items.length; i++) {
      const gameCategoryData2 = await axios.get(
        `https://enable-cors.glitch.me/https://store.steampowered.com/api/appdetails/?appids=${gameSummary?.data.items[i].id}`
      );
      //썸네일, 제목, 장르
      gameList.push(
        gameCategoryData2?.data[gameSummary?.data.items[i].id].data
      );

      console.log("gameCategoryData2", gameCategoryData2);
    }

    const filterList = gameList.filter((game) => game.type === "game");
    console.log("game", filterList);
    setFilteredCount(filterList.length);
    setIsLoading(false);
    return filterList;
  };

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      loadMore();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#192030",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        // minHeight: "100vh",
        // height: "100%",
      }}
    >
      {/* <ParticipationRequest /> */}
      <SearchPageHeader>
        <SteamPlusLogo
          src="/img/SteamPlusLogo2.png"
          onClick={() => {
            navigate(`/`);
          }}
        />
        <GameSearchInputArea>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // 새로고침 방지
              handleTermResult();
            }}
          >
            <GameSearchInput
              type="text"
              value={searchValue}
              onChange={handleSearch}
            />
          </form>
          <BiSearchAlt2
            className="searchIcon"
            onClick={() => {
              handleTermResult();
            }}
          />
        </GameSearchInputArea>
      </SearchPageHeader>

      {isLoading && <Loader />}
      {isLoading ? (
        ""
      ) : termResult === "" ? (
        <BeforeSearch>참여하고 싶은 게임 채널을 검색해보세요!</BeforeSearch>
      ) : (
        <AfterSearch>
          <SearchCount>
            '{`${termResult}`}' 검색 결과는 {filteredCount}
            개입니다
          </SearchCount>
          <GameSearchList>
            {gameSummaryData?.pages
              // .map((page: any) => page?.results)
              .flat()
              .map((game: any) => {
                if (game === undefined) {
                  return <div></div>;
                }
                return (
                  <GameChannelBlockView key={game?.id}>
                    <GameChannelBlock game={game} />
                  </GameChannelBlockView>
                );
              })}
          </GameSearchList>
        </AfterSearch>
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
  position: fixed;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 16px 56px;
  z-index: 999;
`;

const SteamPlusLogo = styled.img`
  width: 115px;
  cursor: pointer;
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
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.03em;
  background: none;
  color: #d4d4d4;
  border-style: none;
`;

// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   // height: "100vh",
//   height: 100%;
//   width: 100vw;
//   height: 100vh;
// `;

const BeforeSearch = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 330px;

  /* width: 100vw; */
  /* height: 100vh; */

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  letter-spacing: -0.03em;

  color: #777d87;
`;

const AfterSearch = styled.div`
  margin-top: 72px;
`;

const SearchCount = styled.p`
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
  margin-bottom: 170px; //92px; // footer
`;

const GameChannelBlockView = styled.div``;

export default ChannelSearchPage;

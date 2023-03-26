import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { log } from "console";
import styled, { keyframes } from "styled-components";
import { useInfiniteQuery } from "react-query";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import GameChannelBlock from "../components/common/GameChannelBlock";
import { useRecoilState } from "recoil";
import { LayoutButton } from "../recoil/atom";

// 게시판 홈 검색

const ChannelSearchPage: any = () => {
  const [searchValue, setSearchValue] = useState(""); // 검색어 없을때 예외처리
  const [termResult, setTermResult] = useState("");
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //레이아웃 종류
  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);

  //검색
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  //검색이되서 입력된단어
  const handleTermResult = () => {
    if (searchValue.length < 2) {
      alert("두 글자 이상 입력해 주세요");
    } else {
      setTermResult(searchValue);
    }
  };
  //게임 검색 실행함수
  const getGameSummary = async () => {
    setIsLoading(true);
    const gameSummary = await axios.get(
      `https://enable-cors.glitch.me/https://store.steampowered.com/api/storesearch/?cc=us&l=en&term="${termResult}"` // &pagesize=20
    );
    const appIds = gameSummary?.data.items.map((item: any) => item.id);
    const appDetailsRequests = appIds.map((appId: any) =>
      axios.get(
        `https://enable-cors.glitch.me/https://store.steampowered.com/api/appdetails/?appids=${appId}`
      )
    );
    const appDetailsResponses = await Promise.all(appDetailsRequests);
    const gameList = appDetailsResponses.reduce((acc, response) => {
      const appId = Object.keys(response?.data)[0];
      const gameData = response?.data[appId]?.data;
      if (gameData?.type === "game") {
        acc.push(gameData);
      }
      return acc;
    }, []);
    setFilteredCount(gameList.length);
    setIsLoading(false);
    return gameList;
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
    <SerachLayout>
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
              placeholder="검색어를 영어로 입력해주세요"
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

      {isLoading && (
        <SearchDiv layoutMenu={layoutMenu}>
          <Loader />
        </SearchDiv>
      )}
      {isLoading ? (
        ""
      ) : termResult === "" ? (
        <SearchDiv layoutMenu={layoutMenu}>
          <BeforeSearch>참여하고 싶은 게임 채널을 검색해보세요!</BeforeSearch>
        </SearchDiv>
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
    </SerachLayout>
  );
};
// ?.filter((game: any) => game?.type === !"dlc")
//data.pages.map(page=>page.results).flat()
const SerachLayout = styled.div`
  background-color: #192030;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const SearchDiv = styled.div<{ layoutMenu: any }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s ease-in-out;
  margin-left: ${(props) => (props.layoutMenu === "close" ? "40px" : "240px")};
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
  ::placeholder {
    color: #777d87; // 검색창 placeholder 색상
  }
`;

const BeforeSearch = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 330px; */

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
  width: 890px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 170px; //92px; // footer
`;

const GameChannelBlockView = styled.div``;

export default ChannelSearchPage;

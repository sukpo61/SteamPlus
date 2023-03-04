import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CommunityBox } from "../components/communitypage/CommunityBox";
import { AiOutlineSearch } from "react-icons/ai";
interface HeaderThProps {
  Width: string;
}
export const Community = () => {
  //css 설정

  //스팀아이디
  const steamID = sessionStorage.getItem("steamid");
  const navigate = useNavigate();
  //db에있는 post get 해와서 useQuery로 만듥기
  const CommunityPostData = async () => {
    const response = await axios.get("http://localhost:3001/post");
    return response;
  };

  useQuery("CommunityPostData", CommunityPostData, {
    onSuccess: (data) => {
      setPostData(data?.data.slice().reverse());
    },
  });

  // const PostData = posts?.data.slice().reverse();

  //Pagination
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const handlePageChange = (page: any) => {
    setPage(page);
  };

  const [PostData, setPostData] = useState<any>();

  // 인풋값의 온체인지
  const [searchText, setSearchText] = useState("");
  // 버튼을 눌렸을때 현재 인풋값을 받아서 바꿔줌
  const [searchTexts, setSearchTexts] = useState("");
  //온체인지 input
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  // 검색 온클릭
  const btn = () => {
    if (searchText === "") {
      alert("검색어를 입력하세요");
      return;
    } else {
      setSearchTexts(searchText);
      setSearchText("");
      // setToggle((e: any) =>
      //   e.filter((post: any) =>
      //     post.title.toLowerCase().includes(searchTexts.toLowerCase())
      //   )
      // );
    }
    return;
  };

  //필터 Data
  // const filteredData = PostData?.filter((post: any) =>
  //   post.title.toLowerCase().includes(searchTexts.toLowerCase())
  // );
  //새로고침
  const replace = () => {
    window.location.replace("Community");
  };
  const addPost = () => {
    if (!steamID) {
      alert("로그인이 필요합니다");
      return;
    } else navigate("/CommunityAddPost");
  };

  //카테고리 필터 걸기
  //카테고리 자유 필터

  const categoryFilter = PostData?.filter(
    (post: any) => post?.category === "자유"
  );
  //카테고리 모집 필터
  const categoryFilter2 = PostData?.filter(
    (post: any) => post?.category === "모집"
  );
  //카테고리 모집 필터
  const categoryFilter3 = PostData?.filter(
    (post: any) => post?.category === "자유" || "모집"
  );
  // 카테고리 state 기본값은 전체다 보이게
  const [toggle, setToggle] = useState(categoryFilter3);
  //카테고리 스타일
  const [categorySt, setCategorySt] = useState("전체");
  useEffect(() => {
    if (PostData) {
      setToggle(categoryFilter3);
    }
  }, [PostData]);

  useEffect(() => {
    if (searchTexts) {
      setToggle((e: any) =>
        e.filter((post: any) =>
          post.title.toLowerCase().includes(searchTexts.toLowerCase())
        )
      );
    }
  }, [searchTexts]);

  return (
    <>
      <CommunityLayout>
        <div
          style={{
            height: "390px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
          <CommunityTitle onClick={replace}> 커뮤니티</CommunityTitle>
          <CommunityComment>
            게임채널에 함께할 구성원을 모집하거나 자유롭게 의견을 나누는
            공간입니다.
          </CommunityComment>
          <Communitycategory categorySt={categorySt}>
            <CommunitySpan
              onClick={() => {
                setToggle(categoryFilter3);
                setCategorySt("전체");
              }}
            >
              전체
            </CommunitySpan>
            <CommunitySpan
              onClick={() => {
                setToggle(categoryFilter);
                setCategorySt("자유");
              }}
            >
              자유
            </CommunitySpan>
            <CommunitySpan
              onClick={() => {
                setToggle(categoryFilter2);
                setCategorySt("모집");
              }}
            >
              모집
            </CommunitySpan>
          </Communitycategory>
        </div>
        <CommentsWrap>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Communitytitle2>게시판</Communitytitle2>
            <AddPostBtn onClick={addPost}>글쓰기</AddPostBtn>
          </div>
          <CommunityeHeader>
            <HeaderTh Width="100px">번호</HeaderTh>
            <HeaderTh Width="110px">카테고리</HeaderTh>
            <HeaderTh Width="540px" style={{ paddingLeft: "50px" }}>
              제목
            </HeaderTh>
            <HeaderTh Width="130px">작성자</HeaderTh>
            <HeaderTh Width="90px">작성시간</HeaderTh>
            <HeaderTh Width="50px">조회수</HeaderTh>
          </CommunityeHeader>
          {/* 게시글 조회하기 */}
          {/*reverse()를 넣어서 데이타의 배열을 거꾸로 보여줌*/}
          {toggle
            ?.slice(items * (page - 1), items * (page - 1) + items)
            .map((post: any, index: any) => {
              return (
                <CommunityBox
                  key={post.id}
                  post={post}
                  index={(page - 1) * 10 + index + 1}
                />
              );
            })}

          <CommunitySerchBar>
            <CommunitySerchinput
              type="text"
              placeholder="게시글검색"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <AiOutlineSearch className="searchIcon" onClick={btn} />
          </CommunitySerchBar>
          {/* 페이지네이션 */}
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={PostData?.length}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
            />
          </PaginationBox>
        </CommentsWrap>
      </CommunityLayout>
    </>
  );
};

const CommunitySpan = styled.span`
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
`;

const CommunitySerchinput = styled.input`
  border: none;
  background: transparent;
  color: #fff;
  width: 90%;
`;
const CommunitySerchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;
  position: relative;
  width: 200px;
  height: 32px;
  background-color: #404b5e;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 20px;
`;
const Communitycategory = styled.div<{ categorySt: string }>`
  display: flex;
  justify-content: center;
  gap: 50px;
  color: #fff;
  border-bottom: 1pxx solid;
  display: flex;
  justify-content: center;
  span:nth-child(1) {
    border-bottom: ${(props) =>
      props.categorySt === "전체" ? "2px solid #00b8c8" : ""};
    color: ${(props) => (props.categorySt === "전체" ? "#00b8c8" : "#fff")};
  }
  span:nth-child(2) {
    border-bottom: ${(props) =>
      props.categorySt === "자유" ? "2px solid #00b8c8" : ""};
    color: ${(props) => (props.categorySt === "자유" ? "#00b8c8" : "#fff")};
  }
  span:nth-child(3) {
    border-bottom: ${(props) =>
      props.categorySt === "모집" ? "2px solid #00b8c8" : ""};
    color: ${(props) => (props.categorySt === "모집" ? "#00b8c8" : "#fff")};
  }
`;
const Communitytitle2 = styled.p`
  color: white;
  font-weight: 400;
  font-size: 20px;
`;
const CommunityComment = styled.div`
  font-size: 13;
  color: #a7a9ac;
  margin-top: 20px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
`;
const CommunityLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
`;
const CommunityTitle = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  margin: 0 auto;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 54px;
  display: flex;
  justify-content: center;
`;

const CommentsWrap = styled.div`
  min-height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CommunityeHeader = styled.div`
  height: 50px;
  border-top: 2px solid #00b8c8;
  border-bottom: 1px solid #a7a9ac;
  display: flex;
  flex-direction: row;
`;
const HeaderTh = styled.th<HeaderThProps>`
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 14px;
  font-weight: 500;
`;

const PaginationBox = styled.div`
  margin-top: 10px;
  .pagination {
    display: flex;
    justify-content: center;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #a5a5a5;
  }
`;
const AddPostBtn = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  line-height: 25px;
  text-align: center;
  width: 58px;
  height: 25px;
  background: #00b8c8;
  border-radius: 8px;
`;

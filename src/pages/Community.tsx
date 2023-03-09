import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CommunityBox } from "../components/communitypage/CommunityBox";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loginModalOpenRecoil } from "../recoil/atom";

interface PostDataProps {
  id: number;
  category: string;
  title: string;
  name: string;
  description: string;
  img: string;
  date: string;
}

export const Community = () => {
  //로그인 모달
  const [loginModalOpen, setLoginModalOpen] =
    useRecoilState<boolean>(loginModalOpenRecoil);

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  //Ref존
  const SerchRef = useRef<HTMLInputElement>(null);
  //스팀아이디
  const steamID = sessionStorage.getItem("steamid");
  const navigate = useNavigate();

  //db에있는 post get 해와서 useQuery로 만듥기
  const CommunityPostData = async () => {
    const response = await axios.get(`${DATABASE_ID}/post`);
    return response;
  };

  useQuery("CommunityPostData", CommunityPostData, {
    onSuccess: (data) => {
      setPostData(data?.data.slice().reverse());
    },
  });

  //Pagination
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<number>(10);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [PostData, setPostData] = useState<any>();

  // 인풋값의 온체인지
  const [searchText, setSearchText] = useState<string>("");
  // 버튼을 눌렸을때 현재 인풋값을 받아서 바꿔줌
  const [searchTexts, setSearchTexts] = useState<string>("");
  //온체인지 input
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  // 검색 온클릭
  const btn = (event: any) => {
    event.preventDefault(); // 기본 동작 막기
    if (searchText === "") {
      alert("검색어를 입력해주세요");
      SerchRef.current!.focus();
      return;
    } else {
      setSearchTexts(searchText);

      return;
    }
  };

  //새로고침
  const replace = () => {
    window.location.replace("Community");
  };
  const addPost = () => {
    if (!steamID) {
      // alert("로그인이 필요합니다");
      handleLoginModalOpen();
      return;
    } else navigate("/CommunityAddPost");
  };

  //카테고리 필터 걸기
  //카테고리 자유 필터
  const categoryFilter = PostData?.filter(
    (post: PostDataProps) => post?.category === "자유"
  );

  //카테고리 모집 필터
  const categoryFilter2 = PostData?.filter(
    (post: PostDataProps) => post?.category === "모집"
  );
  //카테고리 모집 필터
  const categoryFilter3 = PostData?.filter(
    (post: PostDataProps) => post?.category === "자유" || "모집"
  );
  // 카테고리 state 기본값은 전체다 보이게
  const [toggle, setToggle] = useState(categoryFilter3);
  console.log();

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
        e.filter((post: PostDataProps) =>
          post.title.toLowerCase().includes(searchTexts.toLowerCase())
        )
      );
    }
  }, [searchTexts]);

  return (
    <CommunityLayout>
      <CommunityHeader>
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
      </CommunityHeader>
      <CommentsWrap>
        <CommunityAddArea>
          <Communitytitle2>게시판</Communitytitle2>
          <AddPostBtn onClick={addPost}>글쓰기</AddPostBtn>
        </CommunityAddArea>
        <CommunityeHeader>
          <HeaderTh style={{ padding: "0px 16px" }}>번호</HeaderTh>
          <HeaderTh>카테고리</HeaderTh>
          <HeaderTh style={{ padding: "0px 250px 0px 232px" }}>제목</HeaderTh>
          <HeaderTh>작성자</HeaderTh>
          <HeaderTh style={{ padding: "0px 32px 0px 49px" }}>작성시간</HeaderTh>
          <HeaderTh>조회수</HeaderTh>
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
        <CommunityFooter>
          <>
            <CommunitySerchBar onSubmit={btn}>
              <CommunitySerchinput
                ref={SerchRef}
                type="text"
                placeholder="게시글검색"
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <AiOutlineSearch
                style={{ cursor: "pointer" }}
                className="searchIcon"
                onClick={btn}
              />
            </CommunitySerchBar>
          </>
          {/* 페이지네이션 */}
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={toggle?.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </PaginationBox>
        </CommunityFooter>
      </CommentsWrap>
    </CommunityLayout>
  );
};

const CommunityAddArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
const CommunityHeader = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
`;
const CommunityFooter = styled.div`
  margin-bottom: 170px; //92px; // footer
  display: flex;
  margin-top: 20px;
`;
const CommunitySpan = styled.span`
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
`;

const CommunitySerchinput = styled.input`
  border: none;
  background: transparent;
  color: #fff;
  width: 255px;
  padding: 0px 10px;
`;
const CommunitySerchBar = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 280px;
  height: 32px;
  background-color: #404b5e;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const Communitycategory = styled.div<{ categorySt: string }>`
  margin-bottom: 57px;
  display: flex;
  justify-content: center;
  gap: 40px;
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
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
`;
const CommunityLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  height: 100%;
  padding-bottom: 92px;
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
  width: 836px;
`;
const HeaderTh = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 14px;
  font-weight: 500;
`;

const PaginationBox = styled.div`
  width: 300px;
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

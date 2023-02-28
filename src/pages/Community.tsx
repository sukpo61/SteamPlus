import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CommunityBox } from "../components/communitypage/CommunityBox";
interface HeaderThProps {
  Width: string;
}
export const Community = () => {
  const navigate = useNavigate();

  //db에있는 post get 해와서 useQuery로 만듥기
  const CommunityPostData = async () => {
    const response = await axios.get("http://localhost:3001/post");
    return response;
  };
  const { data: posts }: any = useQuery("CommunityPostData", CommunityPostData);
  const PostData = posts?.data;

  //Pagination
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const handlePageChange = (page: any) => {
    setPage(page);
  };

  return (
    <>
      <CommunityLayout>
        <CommunityTitle> Community</CommunityTitle>
        <CommentsWrap>
          <CommunityeHeader>
            <HeaderTh Width="80px">번호</HeaderTh>
            <HeaderTh Width="560px">제목</HeaderTh>
            <HeaderTh Width="130px">작성자</HeaderTh>
            <HeaderTh Width="130px">작성일</HeaderTh>
          </CommunityeHeader>
          {/* 게시글 조회하기 */}
          {/*reverse()를 넣어서 데이타의 배열을 거꾸로 보여줌*/}
          {PostData?.slice(items * (page - 1), items * (page - 1) + items)
            .reverse()
            .map((post: any, index: any) => {
              return (
                <CommunityBox
                  key={post?.id}
                  post={post}
                  index={(page - 1) * 10 + index + 1}
                />
              );
            })}
          {/* 페이지네이션 */}
          <PaginationBox>
            <Pagination
              activePage={page}
              totalItemsCount={PostData?.length}
              itemsCountPerPage={items}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>

          <AddPostBtnWrap>
            <AddPostBtn onClick={() => navigate("/CommunityAddPost")}>
              게시글 등록
            </AddPostBtn>
          </AddPostBtnWrap>
        </CommentsWrap>
      </CommunityLayout>
    </>
  );
};
const CommunityLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
`;
const CommunityTitle = styled.div`
  position: relative;
  margin: 0 auto;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 40px;
  line-height: 54px;
`;

const CommentsWrap = styled.div`
  min-height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CommunityeHeader = styled.div`
  height: 50px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
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
`;
const AddPostBtnWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-bottom: 40px;
`;

const PaginationBox = styled.div`
  margin-top: 10px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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
const AddPostBtn = styled.span``;

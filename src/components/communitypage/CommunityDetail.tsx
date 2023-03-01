import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRef } from "react";
export const CommunityDetail = () => {
  const navigate = useNavigate();

  //db에있는 post get 해와서 useQuery로 만듥기
  const CommunityPostData = async () => {
    const response = await axios.get("http://localhost:3001/post");
    return response;
  };
  const { data }: any = useQuery("CommunityPostData", CommunityPostData);
  const param = useParams();
  const PostData = data?.data;
  const post = PostData?.find((post: any) => post?.id === param?.id);
  const PostTitles = post?.title;
  const PostName = post?.name;
  const PostDate = post?.date;
  const PostContent = post?.content;
  const PostId = post?.id;
  const PostSteamid = post?.steamid;
  const Steamid = sessionStorage.getItem("steamid");

  //삭제 하기
  const PostBoxRef = useRef<any>();
  const handleDelete = async () => {
    //확인 버튼을 누르면 실행될 코드
    if (window.confirm("정말 삭제하겠습니까?")) {
      try {
        await axios.delete(`http://localhost:3001/post/${PostId}`);
        navigate("/Community");
      } catch (error) {
        console.error(error);
      }
    } else {
      // 취소 버튼을 누른 경우 실행될 코드
      console.log("취소 버튼을 눌렀습니다.");
      return;
    }
  };

  return (
    <PostsWrap>
      <PostpageWrap>
        <PostButtonWrap>
          {/* 세션의 저장된 스팀아이디랑 디비의 스팀아이디가 같았을때만 수정 삭제 버튼이 보이게만듬 */}
          {PostSteamid === Steamid ? (
            <PostEditDelBox ref={PostBoxRef}>
              <button onClick={handleDelete}>삭제</button>
              <button
                onClick={() => {
                  navigate(`/CommunityEditPost/${PostId}`);
                }}
              >
                수정
              </button>
            </PostEditDelBox>
          ) : (
            ""
          )}

          <button
            onClick={() => {
              navigate("/Community");
            }}
          >
            목록
          </button>
        </PostButtonWrap>
        <TableHeader>
          <PostTitle>{PostTitles}</PostTitle>
          <PostInfoContainer>
            <span>작성일 : {PostDate}</span>
            <PostInfo></PostInfo>
            <span>작성자 : {PostName}</span>
            <PostInfo></PostInfo>
          </PostInfoContainer>
        </TableHeader>
        <ContentWrap>{PostContent}</ContentWrap>
      </PostpageWrap>
    </PostsWrap>
  );
};
const PostEditDelBox = styled.div`
  color: white;
`;
const PostsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  background-color: gray;
`;
const PostpageWrap = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;
const PostButtonWrap = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;
const TableHeader = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;
const PostTitle = styled.div`
  padding: 16px 20px 0 20px;
  height: 60px;
  display: flex;
  flex-direction: row;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    color: #fff;
  }
`;
const PostInfoContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  padding: 0 20px 16px 20px;
  font-weight: 400;
  font-size: 14px;
  span {
    margin-right: 15px;
    font-style: normal;
    color: #fff;
  }
`;
const PostInfo = styled.div`
  margin-right: 20px;
  font-style: normal;
  color: #a5a5a5;
`;
const ContentWrap = styled.div`
  padding: 30px 20px;
  min-height: 200px;
  white-space: pre-line;
  display: flex;
  gap: 20px;
`;

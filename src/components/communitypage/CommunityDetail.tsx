import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRef } from "react";
import Comment from "./Comment";

export const CommunityDetail = () => {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  const navigate = useNavigate();

  //db에있는 post get 해와서 useQuery로 만듥기
  const CommunityPostData = async () => {
    const response = await axios.get(`${DATABASE_ID}/post`);
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
  const PostCount = post?.count;
  const Steamid = sessionStorage.getItem("steamid");
  console.log("post", post);

  // 현재시간 - PostDate = 몇분이 지났는지
  const newDate: any = new Date();
  const nowDate: any = newDate - PostDate;

  //삭제 하기
  const PostBoxRef = useRef<any>();
  const handleDelete = async () => {
    //확인 버튼을 누르면 실행될 코드
    if (window.confirm("정말 삭제하겠습니까?")) {
      try {
        await axios.delete(`${DATABASE_ID}/post/${PostId}`);
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
  //커뮤니티로 이동
  const gotoCommunity = () => {
    navigate("/Community");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Postslayout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            <CommunityTitle onClick={gotoCommunity}> 커뮤니티</CommunityTitle>
            <CommunityComment>
              게임채널에 함께할 구성원을 모집하거나 자유롭게 의견을 나누는
              공간입니다.
            </CommunityComment>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Communitytitle2>게시글</Communitytitle2>
            <div>
              {PostSteamid === Steamid ? (
                <PostEditDelBox ref={PostBoxRef}>
                  <AddPostBtn
                    onClick={() => {
                      navigate(`/CommunityEditPost/${PostId}`);
                    }}
                  >
                    수정
                  </AddPostBtn>
                  <AddPostBtn onClick={handleDelete}>삭제</AddPostBtn>
                </PostEditDelBox>
              ) : (
                ""
              )}
            </div>
          </div>
          <PostpageWrap>
            <TableHeader />
            <CommunityTable>
              {/* 테이블 크기나누기 */}
              <colgroup>
                <col style={{ width: "7%" }} />
                <col style={{ width: "48%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "5%" }} />
              </colgroup>
              {/* 테이블 나누기 */}
              <tr>
                <td>제목</td>
                <td>{PostTitles}</td>
              </tr>
              <tr>
                <td>닉네임</td> <td> {PostName}</td>
                <td> 작성시간 </td>
                <td>{PostDate}</td>
                <td>조회수</td>
                <td>{PostCount}</td>
              </tr>
            </CommunityTable>
            <PostContents>{PostContent}</PostContents>

            {/* 댓글 */}
            <Comment PostId={PostId} />
          </PostpageWrap>
        </div>
      </Postslayout>
    </div>
  );
};
//테이블 컴포넌트

const CommunityTable = styled.table`
  width: 100%;
  border: 1px solid #777d87;
  border-collapse: collapse;
  border-left: none;
  border-right: none;
  td {
    border: 1px solid #777d87;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }
  //테이블기준 첫번째 녀석꺼만 조절
  td:first-child {
    border-left: 0;
  }
  //테이블기준 마지막 녀석꺼만 조절
  td:last-child {
    border-right: 0;
  }
  //가로기준 두번재칸만 조절하기
  td:nth-child(2) {
    text-align: left;
    padding-left: 10px;
  }
  .Td {
    min-height: 300px;
  }
`;

const AddPostBtn = styled.span`
  cursor: pointer;
  padding: 4px 8px;
  gap: 10px;
  font-weight: 600;
  font-size: 13px;
  line-height: 25px;
  text-align: center;
  width: 40px;
  height: 26px;
  background: #404b5e;
  border-radius: 8px;
  margin-right: 10px;
  &:hover {
    background: #00b8c8;
  }
`;
const Communitytitle2 = styled.div`
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

const PostEditDelBox = styled.div`
  color: white;
`;
const Postslayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
`;
const PostpageWrap = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableHeader = styled.div`
  width: 1020px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #00b8c8;
`;
const PostContents = styled.div`
  padding: 0px 10px;
  min-height: 180px;
  color: #fff;
  font-size: 14px;
  padding-top: 20px;
  word-break: break-all;
  width: 980px;
  padding-bottom: 40px;
  border-bottom: 1px solid #777d87;
`;

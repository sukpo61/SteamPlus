import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
//수정하기
export const CommunityEditPost = () => {
  const navigate = useNavigate();
  const CommunityPostData = async () => {
    const response = await axios.get("http://localhost:3001/post");
    return response;
  };
  const { data }: any = useQuery("CommunityPostData", CommunityPostData);
  const param = useParams();
  const PostData = data?.data;
  const post = PostData?.find((post: any) => post?.id === param?.id);
  const [postTitles, setPostTitles] = useState(post?.title);
  const [postContent, setPostContent] = useState(post?.content);
  const PostName = post?.name;
  const PostDate = post?.date;
  const PostId = post?.id;

  //타이틀 체인지
  const handleTitleChange = (event: any) => {
    setPostTitles(event.target.value);
  };
  //컨텐츠 체인지
  const handleContentChange = (event: any) => {
    setPostContent(event.target.value);
  };
  //체인지 핸들러
  const handleEditPost = async () => {
    if (window.confirm("정말 수정하시겠습니까?")) {
      const editedPost = { ...post, title: postTitles, content: postContent };
      await axios.put(`http://localhost:3001/post/${PostId}`, editedPost);
      navigate(`/Community/${PostId}`);
    } else {
      return;
    }
  };

  return (
    <>
      <ButtonWrap>
        <button
          onClick={() => {
            navigate(`/Community/${PostId}`);
          }}
        >
          취소
        </button>
        <button onClick={handleEditPost}>완료</button>
      </ButtonWrap>
      <PostEditDelBox>
        <TableHeader>
          <input value={postTitles} onChange={handleTitleChange} />
          <PostInfoContainer>
            <span>작성일 : {PostDate}</span>
            <PostInfo></PostInfo>
            <span>작성자 : {PostName}</span>
            <PostInfo></PostInfo>
          </PostInfoContainer>
        </TableHeader>
        <input value={postContent} onChange={handleContentChange} />
      </PostEditDelBox>
    </>
  );
};
const ButtonWrap = styled.div`
  background-color: white;
`;
const PostEditDelBox = styled.div`
  color: white;
`;

const TableHeader = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
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

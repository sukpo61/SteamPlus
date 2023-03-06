import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";
import moment from "moment";
interface TableTdProps {
  Width: string;
  Color: string;
}
export const CommunityBox = ({ post, index }: any) => {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  const navigate = useNavigate();
  const Name = post?.name;
  const Title = post?.title;
  const Category = post?.category;
  const PodstID = post?.id;
  const PostViewCount = post?.count;

  //작성시간 몇분전인지 확인 monents.js 사용함
  const getDayMinuteCounter = (Date: any) => {
    if (!Date) {
      return "";
    }
    const today = moment();
    //포스트 작성한시간
    const postingDate = moment(post?.date);
    const dayDiff = postingDate.diff(today, "days");
    const hourDiff = postingDate.diff(today, "hours");
    const minutesDiff = postingDate.diff(today, "minutes");

    if (dayDiff === 0 && hourDiff === 0 && minutesDiff === 0) {
      // 작성한지 1분도 안지났을때
      return "방금전";
    }
    if (dayDiff === 0 && hourDiff === 0) {
      // 작성한지 1시간도 안지났을때
      const minutes = Math.ceil(-minutesDiff);
      return minutes + "분 전"; // '분' 로 표시
    }
    if (dayDiff === 0 && hourDiff <= 24) {
      // 작성한지 1시간은 넘었지만 하루는 안지났을때,
      const hour = Math.ceil(-hourDiff);
      return hour + "시간 전"; // '시간'으로 표시
    }
    return -dayDiff + "일 전"; // '일'로 표시
  };
  //만들어준 함수를 변수에 할당하여서 사용함
  const dayMinuteCounter = getDayMinuteCounter(new Date("2023-03-02T12:00:00"));

  // new 태그 달아주기
  const newPosts = (Date: any) => {
    if (!Date) {
      return "";
    }
    const today = moment();
    //포스트 작성한시간
    const postingDate = moment(post?.date);
    const minutesDiff = postingDate.diff(today, "minutes");
    // 작성한지 10분이 안된 포스트에는 N이 보이게해줌
    if (minutesDiff > -11) {
      return "N";
    }
  };
  const newPost = newPosts(new Date("2023-03-02T12:00:00"));

  //게시글 조회수
  const queryClient = useQueryClient();
  //게시글 조회수
  const EditMutation = useMutation(
    (editComment: any) =>
      axios.put(`${DATABASE_ID}/post/${post.id}`, editComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("CommunityPostData");
      },
    }
  );
  //게시글 조회수
  const handleEditPost = () => {
    const countPost = { ...post, count: post.count + 1 };
    EditMutation.mutate(countPost);
    navigate(`/Community/${post.id}`);
    return;
  };

  //댓글수 카운트
  const getComment = async () => {
    const response = await axios.get(`${DATABASE_ID}/comment`);
    return response;
  };
  const { data }: any = useQuery("comment", getComment);
  const comment = data?.data.filter((item: any) => {
    return item?.postId === PodstID;
  });
  const CommentCt = comment?.length;

  return (
    <CommentWrap>
      <TableTd Width="100px" Color="fff">
        {index}
      </TableTd>
      <TableTd Width="110px" Color="fff">
        {Category}
      </TableTd>
      <TableContentTd Width="540px" Color="fff" style={{ paddingLeft: "30px" }}>
        <span onClick={handleEditPost}>{Title}</span>
        {/* 누적댓글수 */}
        <PostCount>[{CommentCt}]</PostCount>
        {/* 포스트 작성한지 10분이 지날때면 스타일을 주기 */}
        {newPost ? <PostNew>{newPost}</PostNew> : ""}
      </TableContentTd>
      <TableTd Width="130px" Color="#A7A9AC">
        {Name}
      </TableTd>
      <TableTd Width="90px" Color="#A7A9AC">
        {dayMinuteCounter}
      </TableTd>
      <TableTd Width="50px" Color="#A7A9AC">
        {PostViewCount}
      </TableTd>
    </CommentWrap>
  );
};
const PostCount = styled.div`
  font-size: 11px;
  color: #00b8c8;
  margin-left: 8px;
`;
const PostNew = styled.div`
  font-size: 11px;
  margin-left: 5px;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  background-color: #f05656;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  line-height: 10px;
  text-align: center;
  margin-bottom: 1px;
`;
const CommentWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #eee;
`;

const TableTd = styled.td<TableTdProps>`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 13px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const TableContentTd = styled.td<TableTdProps>`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 400;
  font-size: 13px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

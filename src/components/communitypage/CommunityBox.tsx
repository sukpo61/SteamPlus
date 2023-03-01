import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
export const CommunityBox = ({ post, index }: any) => {
  const navigate = useNavigate();
  const Name = post?.name;
  const Title = post?.title;
  const Date = post?.date;

  return (
    <CommentWrap>
      <TableTd Width="80px">{index}</TableTd>
      <TableTd Width="560px" Position="flex-start">
        <span
          onClick={() => {
            navigate(`/Community/${post.id}`);
          }}
        >
          {Title}
        </span>
      </TableTd>
      <TableTd Width="130px">{Name}</TableTd>
      <TableTd Width="130px">{Date}</TableTd>
    </CommentWrap>
  );
};
const CommentWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #eee;
`;
const TableTd = styled.div<any>`
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.Position};
  height: 50px;
  font-weight: 400;
  font-size: 14px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

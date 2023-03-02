import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
interface TableTdProps {
  Width: string;
  Color: string;
}
export const CommunityBox = ({ post, index }: any) => {
  const navigate = useNavigate();
  const Name = post?.name;
  const Title = post?.title;
  const Date = post?.date;
  const Time = post.time;

  return (
    <CommentWrap>
      <TableTd Width="80px" Color="fff">
        {index}
      </TableTd>
      <TableTd Width="80px" Color="fff">
        전체
      </TableTd>
      <TableTd Width="560px" Color="fff">
        <span
          onClick={() => {
            navigate(`/Community/${post.id}`);
          }}
        >
          {Title}
        </span>
      </TableTd>
      <TableTd Width="130px" Color="#A7A9AC">
        {Name}
      </TableTd>
      <TableTd Width="130px" Color="#A7A9AC">
        {Date}
      </TableTd>
    </CommentWrap>
  );
};
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

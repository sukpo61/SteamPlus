import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
export const CommunityAddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("steamid");
  const userName = sessionStorage.getItem("nickName");

  interface PostData {
    id: any;
    steamid: any;
    name: any;
    title: any;
    content: any;
    date: any;
  }

  //날짜만들기
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = `${year}.${month}.${day}`;

  //db에있는 post get 해와서 useQuery로 만듥기

  // useMutation 적용한 addPost
  const addPostMutation = useMutation(
    (newPost: PostData) => axios.post("http://localhost:3001/post", newPost),
    {
      onSuccess: () => {
        alert("등록완료");
        setTitle("");
        setContent("");
        navigate(`/Community/`);
      },
    }
  );

  const AddPostHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === "" || content === "") {
      window.alert("제목 및 내용을 입력하십시오");
      return;
    }
    let newPost: PostData = {
      id: uuidv4(),
      steamid: userId!,
      name: userName!,
      title,
      content,
      date: date,
    };
    addPostMutation.mutate(newPost);
  };

  return (
    <CommunityPostLayout>
      <AddWrap>
        <ReserTitle>
          <span>게시글 등록</span>
        </ReserTitle>
        <Form onSubmit={AddPostHandler}>
          <TitleInput
            className="title"
            placeholder="제목을 입력하세요"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <ContentInput
            placeholder="내용을 입력하세요"
            // type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <PostButtonWrap>
            <AddBtn type="submit">등록</AddBtn>
            <AddBtn
              onClick={() => {
                navigate("/Community");
              }}
            >
              취소
            </AddBtn>
          </PostButtonWrap>
        </Form>
      </AddWrap>
    </CommunityPostLayout>
  );
};
const CommunityPostLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
`;
const AddWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ReserTitle = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #fff;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    color: #fff;
  }
`;
const TitleInput = styled.input`
  border: 1px solid #eee;
  margin-top: 20px;
  height: 25px;
  outline: none;
  padding: 0 10px;
`;
const ContentInput = styled.textarea`
  border: 1px solid #eee;
  margin-top: 20px;
  height: 300px;
  outline: none;
  padding: 10px 10px;
`;
const PostButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  margin-top: 15px;
`;
const AddBtn = styled.button`
  color: white;
`;

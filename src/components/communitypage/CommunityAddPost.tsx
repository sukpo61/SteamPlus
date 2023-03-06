import axios from "axios";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useRadioGroup } from "@mui/material/RadioGroup";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  createMuiTheme,
} from "@mui/material";
export const CommunityAddPost = () => {
  const [category, setCategory] = useState("카테고리를 선택하세요");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("steamid");
  const userName = sessionStorage.getItem("nickName");

  //Ref존
  const TitleRef = useRef<any>();
  const ContentRef = useRef<any>();

  interface PostData {
    id: any;
    steamid: any;
    name: any;
    title: any;
    content: any;
    date: any;
    count: number;
    category: any;
  }

  //날짜만들기
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const month2 = month < 10 ? `0${month}` : month;
  const day = newDate.getDate();
  const day2 = day < 10 ? `0${day}` : month;
  const Hour = newDate.getHours();

  const Minute = newDate.getMinutes();
  const dates = `${year}.${month2}.${day2} ${Hour}:${Minute}`;

  // useMutation 적용한 addPost
  const addPostMutation = useMutation(
    (newPost: PostData) => axios.post("http://localhost:3001/post", newPost),
    {
      onSuccess: () => {
        setTitle("");
        setContent("");
        // navigate(`/Community/`);
      },
    }
  );

  //post 등록 핸들러
  const AddPostHandler = (event: any) => {
    if (title === "") {
      window.alert("제목을 입력해주세요");
      TitleRef.current!.focus();
      event.preventDefault();
      return;
    } else if (content === "") {
      window.alert("내용을 입력해주세요");
      ContentRef.current!.focus();
      event.preventDefault();
      return;
    } else if (category === "카테고리를 선택하세요") {
      window.alert("카테고리를 선택하세요");
      event.preventDefault();
      return;
    } else if (window.confirm("정말 등록하시겠습니까?")) {
      let newPost: PostData = {
        id: uuidv4(),
        steamid: userId!,
        name: userName!,
        title,
        content,
        date: dates,
        count: 1,
        category,
      };
      addPostMutation.mutate(newPost);
      //등록하면 등록한 자신의 post를 볼수있게
      navigate(`/Community/${newPost.id}`);
    } else {
      //취소버튼 클릭시 새로고침을 방지해서 작성한 타이틀과 컨텐츠를 유지시켜줌
      event.preventDefault();
    }
  };

  //커뮤니티로 이동
  const gotoCommunity = () => {
    navigate("/Community");
  };
  //수정온체인지
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
    const newTitle = event.target.value;
    if (newTitle.length <= 30) {
      setTitle(newTitle);
    } else {
      alert("제목은 30자 이하로 입력해주세요.");
      TitleRef.current!.focus();
      return;
    }
  };
  //카테고리 선택
  const handleOption1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  return (
    <CommunityPostLayout>
      <CommunityHeader>
        <CommunityTitle onClick={gotoCommunity}> 커뮤니티</CommunityTitle>
        <CommunityComment>
          게임채널에 함께할 구성원을 모집하거나 자유롭게 의견을 나누는
          공간입니다.
        </CommunityComment>
      </CommunityHeader>
      <CommunityBody>
        <Communitytitle2>게시글 작성</Communitytitle2>
        <TableHeader />
        <AddWrap>
          <FormControl>
            <FormLabel
              style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}
            >
              카테고리
            </FormLabel>
            <RadioGroup row value={category} onChange={handleOption1Change}>
              <FormControlLabel
                value="자유"
                label="자유"
                control={<Radio sx={{ color: "#777D87" }} />}
              />
              <FormControlLabel
                value="모집"
                control={<Radio sx={{ color: "#777D87" }} />}
                label="모집"
              />
            </RadioGroup>
          </FormControl>

          <p>제목</p>
          <Form onSubmit={AddPostHandler}>
            <TitleInput
              ref={TitleRef}
              placeholder="제목을 입력하세요"
              maxLength={30}
              value={title}
              onChange={handleTitleChange}
            />
            <p>내용</p>
            <ContentInput
              ref={ContentRef}
              placeholder="내용을 입력하세요"
              // type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />

            <PostButtonWrap>
              <AddBtn
                onClick={() => {
                  navigate("/Community");
                }}
              >
                취소
              </AddBtn>
              <AddBtn>등록</AddBtn>
            </PostButtonWrap>
          </Form>
        </AddWrap>
      </CommunityBody>
    </CommunityPostLayout>
  );
};
const CommunityBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommunityHeader = styled.div`
  height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Select = styled.select`
  border-radius: 10px;
`;
const Option = styled.option``;
const TableHeader = styled.div`
  width: 836px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #00b8c8;
  margin: 20px 0px;
`;
const Communitytitle2 = styled.div`
  color: whitr;
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
const CommunityPostLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 100%;
`;
const AddWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  border: none;
  background: transparent;
  background-color: #404b5e;
  width: 100%;
  height: 30px;
  padding: 10px 12px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 15px 0px;
  color: #fff;
`;
const ContentInput = styled.textarea`
  color: #fff;
  border: none;
  background: transparent;
  background-color: #404b5e;
  width: 100%;
  padding: 10px 12px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 10px;
  min-height: 150px;
  height: 100%;
`;
const PostButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 15px;
`;
const AddBtn = styled.button`
  color: white;
  font-weight: 600;
  font-size: 13px;
  line-height: 25px;
  text-align: center;
  width: 40px;
  height: 25px;
  background: #404b5e;
  border-radius: 8px;
  margin-right: 10px;
  &:hover {
    background: #00b8c8;
  }
`;

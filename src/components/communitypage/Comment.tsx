import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
interface CommentProps {
  PostId: string; // define type for PostId
}

interface CommentItem {
  id: string;
  postId: string;
  myId: string | null;
  name: string | null;
  date: string;
  profileImg: string;
  contents: string;
}

function Comment({ PostId }: CommentProps) {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  //Ref존
  const CommentRef = useRef<HTMLInputElement>(null);
  const CommentsRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const myId = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");
  const ProfileImgUrl: any = sessionStorage.getItem("profileimg");

  const [commentInput, setCommentInput] = useState<string>("");
  const [editOn, setEditOn] = useState<string>("");
  const [editInput, setEditInput] = useState<string>("");
  //날짜만들기
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const month2 = month < 10 ? `0${month}` : month;
  const day = newDate.getDate();
  const day2 = day < 10 ? `0${day}` : day;
  const Hour = newDate.getHours();
  const Minute = newDate.getMinutes();
  const date = `${year}.${month2}.${day2} ${Hour}:${Minute}`;

  //스팀아이디
  const steamID = sessionStorage.getItem("steamid");
  const getComment = async () => {
    const response = await axios.get(`${DATABASE_ID}/comment`);
    return response;
  };
  const { data } = useQuery("comment", getComment);
  const comment = data?.data.slice().reverse();
  const commentFilter = comment?.filter((i: CommentItem) => {
    return i.postId === PostId;
  });

  //댓글등록
  const postMutation = useMutation(
    (newComment: object) => axios.post(`${DATABASE_ID}/comment`, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );
  //댓글등록 onChange
  const CommentInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };
  //댓글등록 핸들러
  const CommentFormonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!steamID) {
      alert("로그인이 필요합니다");
      return;
    }
    if (commentInput === "") {
      alert("댓글을 입력하세요");
      CommentRef.current!.focus();
      return;
    }
    const newComment: CommentItem = {
      id: uuidv4(),
      postId: PostId,
      myId: myId,
      name: myNickName,
      date: date,
      profileImg: ProfileImgUrl,
      contents: commentInput,
    };
    postMutation.mutate(newComment);
    setCommentInput("");
  };
  //댓글삭제
  const DeleteMutation = useMutation(
    (id) => axios.delete(`${DATABASE_ID}/comment/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );
  const DeleteOnClick = (id: any) => {
    if (window.confirm("정말 삭제하겠습니까?")) {
      DeleteMutation.mutate(id);
      return;
    } else {
      // 취소 버튼을 누른 경우 실행될 코드
      console.log("취소 버튼을 눌렀습니다.");
      return;
    }
  };
  //댓글수정
  const EditMutation = useMutation(
    (editComment: any) =>
      axios.put(`${DATABASE_ID}/comment/${editComment.id}`, editComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );

  const EditInputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInput(e.target.value);
  };

  const EditCommentButton = (id: string) => {
    if (editInput === "") {
      alert("수정된 댓글을 입력해주세요");
      CommentsRef.current!.focus();
      return;
    } else {
      const editComment = {
        ...comment.find((i: any) => i.id === id),
        date: date + " " + "수정",
        contents: editInput,
      };
      EditMutation.mutate(editComment);
      setEditInput("");
      setEditOn("");
    }
  };
  // 댓글카운트
  const postid = comment?.map((id: any) => id?.postId);
  const commentId = postid?.filter((id: any) => {
    return id === PostId;
  });
  const CommentCount = commentId?.length;

  return (
    <CommentWrap>
      <div
        style={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <h1 style={{ padding: "15px 3px 15px 10px" }}>댓글</h1>
        <p style={{ fontSize: "13px" }}>[{CommentCount}]</p>
      </div>
      {/* 댓글 입력칸 */}
      <CommentForm onSubmit={CommentFormonSubmit}>
        <CommentInput
          ref={CommentRef}
          placeholder="댓글을 입력하세요"
          value={commentInput}
          onChange={CommentInputOnChange}
          maxLength={100}
        />

        <CommentFormButton>등록</CommentFormButton>
      </CommentForm>
      {/* 댓글 창 */}

      {commentFilter?.map((i: CommentItem) => {
        return (
          <CommentContents>
            <div style={{ display: "flex" }}>
              <>
                <CommentImg src={i.profileImg} />
              </>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <CommentName>{i.name}</CommentName>
                {editOn === i.id ? (
                  <EditInput
                    defaultValue={i.contents}
                    onChange={EditInputOnChange}
                    ref={CommentsRef}
                    maxLength={100}
                  />
                ) : (
                  <CommentText>{i.contents}</CommentText>
                )}
                <CommentDate>{i.date}</CommentDate>
              </div>
            </div>

            <div style={{ marginLeft: "auto" }}>
              {editOn === i.id ? (
                <>
                  <CommentEdit onClick={() => EditCommentButton(i.id)}>
                    완료
                  </CommentEdit>
                  <CommentDelete onClick={() => setEditOn("")}>
                    취소
                  </CommentDelete>
                </>
              ) : (
                <>
                  {i.myId === myId ? (
                    <>
                      <CommentEdit
                        onClick={() => {
                          setEditOn(i.id);
                        }}
                      >
                        수정
                      </CommentEdit>
                      <CommentDelete onClick={() => DeleteOnClick(i.id)}>
                        삭제
                      </CommentDelete>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </CommentContents>
        );
      })}
    </CommentWrap>
  );
}

export default Comment;
const CommentWrap = styled.div`
  width: 836px;
  margin: 0 auto;
`;
const CommentForm = styled.form`
  height: 40px;
  margin-bottom: 10px;
`;
const CommentInput = styled.input`
  width: 760px;
  height: 40px;
  background: transparent;
  background-color: #404b5e;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #fff;
  line-height: 40px;
  text-align: start;
  padding-left: 10px;
  border: none;
`;
const CommentFormButton = styled.button`
  margin-left: 12px;
  width: 64px;
  height: 36px;
  background: #00b8c8;
  border-radius: 8px;
  color: #fff;
  &:hover {
    background: #00b8c8;
  }
`;
const CommentContents = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60px;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const CommentImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const CommentName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  font-size: #fff;
`;
const EditInput = styled.textarea`
  color: #fff;
  border: none;
  width: 700px;
  background: transparent;
  background-color: #404b5e;
  padding: 0px 5px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  resize: none;
  text-indent: 3px;
  font-size: 13px;
  min-height: 100px;
  resize: none;
  padding: 10px;
  line-height: 1.5;
  border-radius: 10px;
  outline: 0px none transparent;
`;
const CommentText = styled.p`
  font-size: 13px;
  margin: 10px 0px;
  word-break: break-all;
  font-weight: 400;
  width: 700px;
`;
const CommentDate = styled.p`
  font-size: 11px;
  color: #777d87;
  font-weight: 500;
`;
const CommentEdit = styled.button`
  margin-left: 10px;
  margin-bottom: auto;
  font-size: 12px;
  color: #a7a9ac;
  &:hover {
    color: #00b8c8;
  }
`;
const CommentDelete = styled.button`
  margin-bottom: auto;
  margin-left: 10px;
  font-size: 12px;
  color: #a7a9ac;
  &:hover {
    color: #00b8c8;
  }
`;

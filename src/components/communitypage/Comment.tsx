import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";

function Comment({ PostId }: any) {
  const queryClient = useQueryClient();

  const myId = sessionStorage.getItem("steamid");
  const myNickName = sessionStorage.getItem("nickName");
  const ProfileImgUrl: any = sessionStorage.getItem("profileimg");

  const [commentInput, setCommentInput] = useState<string>("");
  const [editOn, setEditOn] = useState<string>("");
  const [editInput, setEditInput] = useState<string>("");

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = `${year}.${month}.${day}`;

  const getComment = async () => {
    const response = await axios.get("http://localhost:3001/comment");
    return response;
  };
  const { data } = useQuery("comment", getComment);
  const comment = data?.data.slice().reverse();
  const commentFilter = comment?.filter((i: any) => {
    return i.postId === PostId;
  });

  const postMutation = useMutation(
    (newComment: object) =>
      axios.post("http://localhost:3001/comment", newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );

  const DeleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:3001/comment/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );

  const EditMutation = useMutation(
    (editComment: any) =>
      axios.put(`http://localhost:3001/comment/${editComment.id}`, editComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );

  const CommentInputOnChange = (e: any) => {
    setCommentInput(e.target.value);
  };

  const CommentFormonSubmit = (e: any) => {
    e.preventDefault();
    if (commentInput === "") {
      alert("빈칸은 안됨");
      return;
    }

    const newComment = {
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

  const DeleteOnClick = (id: any) => {
    DeleteMutation.mutate(id);
  };

  const EditInputOnChange = (e: any) => {
    setEditInput(e.target.value);
  };

  const EditCommentButton = (id: any) => {
    if (editInput === "") {
      alert("빈칸은 안됨");
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

  return (
    <CommentWrap>
      <h1>댓글</h1>
      {/* 댓글 입력칸 */}
      <CommentForm onSubmit={CommentFormonSubmit}>
        <CommentInput value={commentInput} onChange={CommentInputOnChange} />
        <CommentFormButton>등록</CommentFormButton>
      </CommentForm>
      {/* 댓글 창 */}
      {commentFilter?.map((i: any) => {
        return (
          <CommentContents>
            <CommentImg src={i.profileImg} />
            <CommentName>{i.name}</CommentName>
            {editOn === i.id ? (
              <EditInput
                placeholder={i.contents}
                value={editInput}
                onChange={EditInputOnChange}
              />
            ) : (
              <CommentText>{i.contents}</CommentText>
            )}
            <CommentDate>{i.date}</CommentDate>

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
          </CommentContents>
        );
      })}
    </CommentWrap>
  );
}

export default Comment;
const CommentWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const CommentForm = styled.form`
  margin-top: 20px;
  margin-bottom: 50px;
  width: 100%;
  height: 40px;
`;
const CommentInput = styled.input`
  width: 95%;
  height: 40px;
`;
const CommentFormButton = styled.button`
  width: 5%;
  height: 40px;
  background-color: #000;
  color: #fff;
`;
const CommentContents = styled.div`
  border-top: 1px solid #000;
  display: flex;
  height: 60px;
  align-items: center;
`;
const CommentImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const CommentName = styled.h2`
  margin: 10px 0 auto 10px;
`;
const EditInput = styled.input`
  margin: auto 0 15px 50px;
`;
const CommentText = styled.p`
  margin: auto 0 15px 50px;
`;
const CommentDate = styled.p`
  margin: auto 0 15px auto;
`;
const CommentEdit = styled.button`
  margin-left: 10px;
  margin-bottom: auto;
  font-size: 16px;
  color: blue;
`;
const CommentDelete = styled.button`
  margin-bottom: auto;
  margin-left: 10px;
  font-size: 16px;
  color: blue;
`;

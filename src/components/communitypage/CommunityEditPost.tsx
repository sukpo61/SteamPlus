import axios from "axios";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
//수정하기
export const CommunityEditPost = () => {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;
  const navigate = useNavigate();
  //포스트 가져오기 쿼리
  const CommunityPostData = async () => {
    const response = await axios.get(`${DATABASE_ID}/post`);
    return response;
  };
  const { data }: any = useQuery("CommunityPostData", CommunityPostData);
  const param = useParams();
  const PostData = data?.data;
  const post = PostData?.find((post: any) => post?.id === param?.id);
  const [postTitles, setPostTitles] = useState<string | undefined>(post?.title);
  const [postContent, setPostContent] = useState<string | undefined>(
    post?.content
  );
  const PostId = post?.id;
  const queryClient = useQueryClient();
  //Ref 존
  const TitleRef = useRef<HTMLInputElement>(null);
  const ContentRef = useRef<HTMLTextAreaElement>(null);

  //타이틀 체인지 타이틀을 30자로 제한
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setTitle(event.target.value);
    const newTitle = event.target.value;
    if (newTitle.length <= 30) {
      setPostTitles(newTitle);
    } else {
      alert("제목은 30자 이하로 입력해주세요.");
      const truncatedTitle = newTitle.slice(0, 10000);
      setPostTitles(truncatedTitle);
      TitleRef.current!.focus();
      return;
    }
  };

  //컨텐츠 온체인지 컨텐츠
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContents = event.target.value;
    if (newContents.length <= 10000) {
      setPostContent(newContents);
    } else {
      alert("내용은 10000자 이하로 입력해주세요.");
      const truncatedContents = newContents.slice(0, 10000);
      setPostContent(truncatedContents);
      ContentRef.current!.focus();
    }
  };
  //댓글수정쿼리
  const EditMutation = useMutation(
    (editComment: any) =>
      axios.put(`${DATABASE_ID}/post/${PostId}`, editComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("CommunityPostData");
      },
    }
  );
  //댓글수정버튼
  const handleEditPost = (event: React.FormEvent<HTMLFormElement>) => {
    if (postTitles === "") {
      window.alert("제목을 입력해주세요");
      TitleRef.current!.focus();
      event.preventDefault();
      return;
    } else if (postContent === "") {
      window.alert("내용을 입력해주세요");
      ContentRef.current!.focus();
      event.preventDefault();
      return;
    }
    if (window.confirm("정말 수정하시겠습니까?")) {
      const editedPost = { ...post, title: postTitles, content: postContent };
      EditMutation.mutate(editedPost);
      navigate(`/Community/${PostId}`);
      return;
    } else {
      navigate(`/Community/${PostId}`);
      return;
    }
  };

  //커뮤니티로 이동
  const gotoCommunity = () => {
    navigate("/Community");
  };
  return (
    <>
      <CommunityPostLayout>
        <CommunityHeader>
          <CommunityTitle onClick={gotoCommunity}> 커뮤니티</CommunityTitle>
          <CommunityComment>
            게임채널에 함께할 구성원을 모집하거나 자유롭게 의견을 나누는
            공간입니다.
          </CommunityComment>
        </CommunityHeader>
        <CommunityBody>
          <Communitytitle2>게시글 수정</Communitytitle2>
          <TableHeader />
          <AddWrap>
            <p>제목</p>
            <Form onSubmit={handleEditPost}>
              <TitleInput
                ref={TitleRef}
                placeholder="제목을 입력하세요"
                value={postTitles}
                onChange={handleTitleChange}
                maxLength={30}
              />
              <p>내용</p>
              <ContentInput
                ref={ContentRef}
                placeholder="내용을 입력하세요"
                value={postContent}
                onChange={handleContentChange}
                maxLength={10000}
              />
              <PostButtonWrap>
                <AddBtn
                  onClick={() => {
                    navigate(`/Community/${PostId}`);
                  }}
                >
                  취소
                </AddBtn>
                <AddBtn>완료</AddBtn>
              </PostButtonWrap>
            </Form>
          </AddWrap>
        </CommunityBody>
      </CommunityPostLayout>
    </>
  );
};

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
const CommunityBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommunityHeader = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
`;
const AddWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 170px; // footer
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
  resize: none; // textarea 사이즈조절 방지
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

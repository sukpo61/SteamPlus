import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
interface TableTdProps {
  Color: string;
  Width: string;
}
interface PostProps {
  id: number;
  name: string;
  title: string;
  category: string;
  count: number;
  date: Date;
}
interface CommunityBoxProps {
  post: PostProps;
  index: number;
}

export const CommunityBox = ({ post, index }: CommunityBoxProps) => {
  const DATABASE_ID: any = process.env.REACT_APP_DATABASE_ID;

  const navigate = useNavigate();
  const Name = post?.name;
  // 배틀태그 자른 닉네임
  const SliceName = Name?.slice(0, -5);
  //이름뒤에 배틀태그
  const SliceName2 = Name?.slice(-5);
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
    // 작성한지 30분이 안된 포스트에는 N이 보이게해줌
    if (minutesDiff > -31) {
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
      <TableTd Width="50px" Color="fff">
        {index}
      </TableTd>
      <TableTd Width="60px" Color="fff">
        {Category}
      </TableTd>
      <TableTds Width="450px" Color="fff">
        <span onClick={handleEditPost}>{Title}</span>
        {/* 누적댓글수 */}
        <PostCount>[{CommentCt}]</PostCount>
        {/* 포스트 작성한지 10분이 지날때면 스타일을 주기 */}
        {newPost ? <PostNew>N</PostNew> : ""}
      </TableTds>
      <TableTdName Width="130px" Color="#A7A9AC">
        <p>{SliceName} &nbsp;</p>
        <p> {SliceName2}</p>
      </TableTdName>
      <TableTd Width="80px" Color="#A7A9AC">
        {dayMinuteCounter}
      </TableTd>
      <TableTd Width="65px" Color="#A7A9AC">
        {PostViewCount}
      </TableTd>
    </CommentWrap>
  );
};
const PostCount = styled.div`
  font-size: 11px;
  color: #00b8c8;
  margin-left: 8px;
  margin-top: 2px;
`;
const PostNew = styled.div`
  font-size: 11px;
  margin-left: 5px;
  width: 14px;
  height: 14px;
  background-color: #f05656;
  color: #fff;
  line-height: 14px;
  text-align: center;
  border-radius: 10px;
`;
const CommentWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
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

const TableTds = styled.td<TableTdProps>`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  padding-left: 20px;
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
const TableTdName = styled.td<TableTdProps>`
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
  p:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

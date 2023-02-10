import React from "react";
import { LayoutButton } from "../../recoil/atom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface FriendProps {
  myId: Number;
  friendId: Number;
  myNickName: String;
  friendNickName: String;
}
interface FriendSearchProps {
  id: Number;
  uid: Number;
  nickname: String;
}

function FriendSearch() {
  const myId = 1;

  const [layoutMenu, setLayoutMenu] = useRecoilState<String>(LayoutButton);
  const LayoutButtonOnClick = (i: string) => {
    if (layoutMenu === i) {
      setLayoutMenu("close");
    } else {
      setLayoutMenu(i);
    }
  };

  //friend 가져오기
  const getFriend = async () => {
    const response = await axios.get("http://localhost:3001/friend");
    return response;
  };
  const { data: friendList } = useQuery("friend", getFriend);
  // console.log(friendList?.data);
  // //이미 있는친구면 false

  //친구검색 input
  const [frendSearchInput, setfrendSearchInput] = useState("");
  //친구검색 input
  const frendSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfrendSearchInput(e.target.value);
  };

  //auth 가져오기
  const getFriendSearch = async () => {
    const response = await axios.get("http://localhost:3001/auth");
    return response;
  };
  const { isLoading, isError, data, error } = useQuery(
    "friendsearch",
    getFriendSearch
  );
  if (isLoading) {
    return <p>로딩중임</p>;
  }
  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }

  //auth 가져온후 검색한것만 map
  const friendSearch = data?.data.filter((i: FriendSearchProps) => {
    //특정문자열이 포함되면 true반환
    if (frendSearchInput === "") {
      return;
    } else {
      //자신은 안뜨고 검색한것만
      return i.id !== myId && i.nickname.includes(frendSearchInput);
    }
  });

  //이미 친구인 목록
  // 계정목록과 친구목록을 불러온 후 친구목록중 내 친구목록인 것 구한다.
  //그친구목록의 친구 id가 일치하는 계정 목록을 불러옴
  const alreadyFriend = data?.data.filter((i: FriendSearchProps) => {
    for (let t = 0; t < friendList?.data.length; t++) {
      if (
        friendList?.data[t].friendId === i.id &&
        friendList?.data[t].myId === myId
      ) {
        return;
      } else {
        return i;
      }
    }
  });
  console.log(alreadyFriend);

  // const aaa =  alreadyFriend.filter((item: FriendSearchProps) => {
  //   if (item.id === i.id) {
  //     return;
  //   } else {
  //     return <FriendBoxNameP>+</FriendBoxNameP>;
  //   }
  // })

  // 현재유저의 아이디
  // 상대유저의 아이디
  // 프렌드 콜렉션을 현재 유저 아이디로 필터링걸고.
  // 위의 배열을 "friendId"키의 밸류를 인덱스로 가지는 배열을 만듬.friends [2, 3]
  // 어스을 검색값 기준으로 필터링.
  // [ {
  //   "id": 2,
  //   "uid": 2,
  //   "nickname": "강아지"
  // },
  // {
  //   "id": 5,
  //   "uid": 5,
  //   "nickname": "강아지고양이"
  // }]

  // 검색 배열을 맵핑을 돌리고
  //

  // const friendstate = (e:any) =>{
  //   const friends : any = [2, 3]
  //   return friends.includes(e.id)

  //   //검색배열의 "id" 키 값이  "friendId"키의 밸류를 인덱스로 가지는 배열에 포함이 되면 true, false
  // }

  return (
    <FriendSearchDiv layoutMenu={layoutMenu}>
      {/* 위 제목과 input layoutstring이 바뀔때마다 바뀌게 */}
      <MenuTitleDiv>
        <MenuTitleFlex>
          <FriendMenuDiv onClick={() => LayoutButtonOnClick("friend")}>
            Friend
          </FriendMenuDiv>
          <FriendSearchMenuDiv>Friend Search</FriendSearchMenuDiv>
        </MenuTitleFlex>

        <MenuTitleIform>
          <MenuTitleInput onChange={frendSearchOnChange}></MenuTitleInput>
          {/* <MenuTitleButton>확인</MenuTitleButton> */}
        </MenuTitleIform>
      </MenuTitleDiv>

      {/* 친구 목록 박스 */}
      {friendSearch.map((i: FriendSearchProps) => {
        return (
          <FriendBoxDiv>
            <FriendBoxNameImg></FriendBoxNameImg>
            <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>
            {/* { friendstate(i) ? "표시안함"  : "표시함" } */}

            {alreadyFriend}
          </FriendBoxDiv>
        );
      })}
    </FriendSearchDiv>

    //나중에 자기자신이 검색 되지않게 예외처리 필요

    // <FriendSearchDiv layoutMenu={layoutMenu}>
    //   {/* 검색창쪽 */}
    //   <MenuTitleDiv>
    //     <MenuTitleFlex>
    //       <MenuTitleH2>Dave Diver</MenuTitleH2>
    //       <MenuTitleLink></MenuTitleLink>
    //       <MenuTitleAdd>+</MenuTitleAdd>
    //     </MenuTitleFlex>
    //     {/* input과 확인 */}
    //     {/* <MenuTitleIform> */}
    //     <MenuTitleInput onChange={frendSearchOnChange}></MenuTitleInput>
    //     {/* <MenuTitleButton>확인</MenuTitleButton>
    //     </MenuTitleIform> */}
    //   </MenuTitleDiv>
    //   {/* 친구 목록 박스 */}
    //   {friendSearch.map((i: FriendSearchProps) => {
    //     return (
    //       <FriendBoxDiv>
    //         <FriendBoxNameImg></FriendBoxNameImg>
    //         <FriendBoxNameH2>{i.nickname}</FriendBoxNameH2>

    //         <FriendBoxNameP>+</FriendBoxNameP>
    //       </FriendBoxDiv>
    //     );
    //   })}
    // </FriendSearchDiv>
  );
}

export default FriendSearch;
const FriendSearchDiv = styled.div<{ layoutMenu: String }>`
  display: ${(props) =>
    props.layoutMenu === "friendsearch" ? "block" : "none"};
  margin-top: 150px;
  margin-bottom: 30px;
`;

const MenuTitleDiv = styled.div`
  width: 400px;
  height: 130px;
  background-color: #404b5e;
  position: fixed;
  top: 0;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 30px;
`;
const MenuTitleFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;
const FriendMenuDiv = styled.h2`
  cursor: pointer;
`;
const FriendSearchMenuDiv = styled.h2`
  cursor: pointer;
  background-color: yellow;
`;
const MenuTitleIform = styled.form`
  position: relative;
  margin: 0 auto;
`;
const MenuTitleInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background-color: #192030;
  margin: 0 auto 10px auto;
  color: #fff;
  border: 0;
  box-shadow: 2px 4px 10px 0 #000 inset;
`;
const MenuTitleButton = styled.button`
  position: absolute;
  right: 10px;
  width: 40px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  top: 50%;
  transform: translate(0, -13%);
`;

const FriendBoxDiv = styled.div`
  margin: 30px auto 0;
  width: 350px;
  height: 100px;
  background-color: #263245;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FriendBoxNameImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 30px;
  margin-right: 10px;
  background-color: #ccc;
`;
const FriendBoxNameH2 = styled.h2`
  color: #fff;
`;
const FriendBoxNameP = styled.p`
  color: #fff;
  margin-left: auto;
  margin-right: 30px;
  font-size: 32px;
  cursor: pointer;
`;

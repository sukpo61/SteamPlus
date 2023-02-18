import { atom, selector } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

const myId = localStorage.getItem("steamid");
const myNickName = localStorage.getItem("nickName");

export const LayoutButton = atom<String>({
  key: "Layout",
  default: "close",
});

export const getFriend = atom<any>({
  key: "friendAddState",
  default: [],
});

export const friendAllState = atom<FriendSearchProps[]>({
  key: "friendAllState",
  default: [],
});

// export const FriendNoticeAll = atom({
//   key: "FriendNoticeAll",
//   default: "0",
// });

//친구 요청 온 내역 전체
export const newFriendAdd = selector({
  key: "newFriendAdd",
  get: ({ get }) => {
    const friendAddAll = get(getFriend);
    const completed = friendAddAll.filter((i: any) => i.friendId === myId);
    return [completed];
  },
});

// export const BothFriend = selector({
//   key: "BothFriend",
//   get: ({ get }) => {
//     const getFriendAuth = get(getFriend);
//     const friendAdd = get(newFriendAdd);

//     const completed = getFriendAuth?.filter((i: any) => {
//       for (let t = 0; t < friendAdd.length; t++) {
//         if (
//           friendAdd[t].friendId === i.myId &&
//           friendAdd[t].myId === i.friendId
//         ) {
//           return i.myId === myId;
//         } else if (
//           friendAdd[t].friendId === i.myId &&
//           friendAdd[t].myId === i.friendId
//         ) {
//           return i.myId === myId;
//         }
//         return false;
//       }
//     });
//     return [completed];
//   },
// });

export const BothFriend = atom<FriendProps[]>({
  key: "BothFriend",
  default: [],
});

export const Loginedrecoil = atom({
  key: "logined",
  default: false,
});

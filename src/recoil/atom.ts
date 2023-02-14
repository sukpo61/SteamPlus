import { atom, selector } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

const myId = 1;

export const myIds = atom<any>({
  key: "myIds",
  default: 1,
  // default: 2,
  // default: 3,
  // default: 4,
});

export const myNickNames = atom<any>({
  key: "myNickNames",
  default: "고양이",
  // default: "강아지",
  // default: "호랑이",
  // default: "호랑이인간",
});

export const LayoutButton = atom<String>({
  key: "Layout",
  default: "close",
});

export const getFriend = atom<FriendProps[]>({
  key: "friendAddState",
  default: [],
});

export const friendAllState = atom<FriendSearchProps[]>({
  key: "friendAllState",
  default: [],
});

export const newFriendAdd = selector({
  key: "newFriendAdd",
  get: ({ get }) => {
    const friendAddAll = get(getFriend);
    const completed = friendAddAll.filter((i) => i.friendId === myId);
    return [completed];
  },
});

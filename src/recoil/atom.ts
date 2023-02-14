import { atom, selector } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

const myId = 1;

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

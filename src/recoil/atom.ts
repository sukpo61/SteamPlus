import { atom } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

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

import { atom } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";

export const LayoutButton = atom<String>({
  key: "Layout",
  default: "close",
});

export const friendAddState = atom({
  key: "friendAddState",
  default: [],
});

export const friendAllState = atom<FriendProps[]>({
  key: "friendAllState",
  default: [],
});

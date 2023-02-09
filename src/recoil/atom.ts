import { atom } from "recoil";

export const LayoutButton = atom<String>({
  key: "Layout",
  default: "close",
});

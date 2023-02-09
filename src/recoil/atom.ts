import React from "react";
import { atom } from "recoil";

export const profilebutton = atom({
  key: "profile",
  default: false,
});
export const gamesearchbutton = atom({
  key: "gamesearchbutton",
  default: false,
});
export const friendbutton = atom({
  key: "friendbutton",
  default: false,
});
export const friendsearchbutton = atom({
  key: "friendsearchbutton",
  default: false,
});
export const voicetalkbutton = atom({
  key: "voicetalkbutton",
  default: false,
});

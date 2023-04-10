import { atom, selector } from "recoil";
import { FriendProps } from "../layout/layoutcomponents/Friend";
import { FriendSearchProps } from "../layout/layoutcomponents/FriendSearch";

const myId = sessionStorage.getItem("steamid");
const myNickName = sessionStorage.getItem("nickName");

// export const firstTime = atom<boolean>({
//   key: "firstTime",
//   default: true,
// });

export const userAllSocketId = atom<any>({
  key: "userAllSocketId",
  default: [],
});

export const friendChatNotice = atom<any>({
  key: "friendChatNotice",
  default: [],
});

export const friendChat = atom<any>({
  key: "friendChat",
  default: [],
});

export const LayoutButton = atom<String>({
  key: "Layout",
  default: "close",
});

export const AboutPagesState = atom<String>({
  key: "AboutPages",
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

export const DataChannelMapRecoil = atom<any>({
  key: "DataChannelMapRecoil",
  default: new Map(),
});
export const chatTextRecoil = atom<any>({
  key: "chatTextRecoil",
  default: [],
});
export const AllStreamsRecoil = atom<any>({
  key: "AllStreamsRecoil",
  default: [],
});
export const videoDisplayRecoil = atom<any>({
  key: "videoDisplayRecoil",
  default: false,
});
export const channelNameRecoil = atom<any>({
  key: "channelNameRecoil",
  default: "",
});
export const currentRoomRecoil = atom<any>({
  key: "currentRoomRecoil",
  default: "",
});
export const currentGameIdRecoil = atom<any>({
  key: "currentGameIdRecoil",
  default: "",
});
export const videoRoomExitRecoil = atom<any>({
  key: "videoRoomExitRecoil",
  default: false,
});
export const friendroominfoRecoil = atom<any>({
  key: "friendroominfoRecoil",
  default: "",
});
export const activechannelsRecoil = atom<any>({
  key: "activechannelsRecoil",
  default: "",
});
export const activechannelsinfoRecoil = atom<any>({
  key: "activechannelsinfoRecoil",
  default: [],
});
export const countRecoil = atom<any>({
  key: "count",
  default: 0,
});
export const recommandGameRecoil = atom<any>({
  key: "recommandGameRecoil",
  default: [],
});
export const loginModalOpenRecoil = atom<any>({
  key: "loginModalOpenRecoil",
  default: false,
});
export const localStreamRecoil = atom<any>({
  key: "localStreamRecoil",
  default: null,
});
export const micStateRecoil = atom<any>({
  key: "micStateRecoil",
  default: true,
});
export const videoStateRecoil = atom<any>({
  key: "videoStateRecoil",
  default: false,
});
export const isAllMutedRecoil = atom<any>({
  key: "isAllMutedRecoil",
  default: false,
});
export const isVolumePercent = atom<any>({
  key: "isVolumePercent",
  default: 50,
});
export const isMicVolumePercent = atom<any>({
  key: "isMicVolumePercent",
  default: 50,
});
export const hasDeviceRecoil = atom<any>({
  key: "hasDevice",
  default: true,
});
export const RoomUserDataRecoil = atom<any>({
  key: "RoomUserDataRecoil",
  default: new Map(),
});

// export const FriendNoticeAll = atom({
//   key: "FriendNoticeAll",
//   default: "0",
// });

//친구 요청 온 내역 전체d
export const newFriendAdd = selector({
  key: "newFriendAdd",
  get: ({ get }) => {
    const friendAddAll = get(getFriend);
    const completed = friendAddAll.filter((i: any) => i.friendId === myId);
    return [completed];
  },
});
export const popularchannelsRecoil = selector({
  key: "popularchannels",
  get: ({ get }) => {
    const activechannels = get(activechannelsinfoRecoil);

    const activechannelsarray = [...activechannels];

    const sortedArr = activechannelsarray?.sort(
      (a: any, b: any) => b.usercount - a.usercount
    );

    return sortedArr;
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

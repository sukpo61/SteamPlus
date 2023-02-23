import { io } from "socket.io-client";

const userid = sessionStorage.getItem("steamid");

console.log(userid);

export const userinfo = {
  id: userid,
};
// const socket = io("https://ten-papayas-greet-183-109-20-88.loca.lt/");
const socket = io("http://localhost:4500");

socket.on("connect", () => {
  console.log("Connected to server!");
});

if (userid) {
  socket.emit("userid", userinfo.id);
}

export default socket;

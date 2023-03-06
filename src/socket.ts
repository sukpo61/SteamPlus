import { io } from "socket.io-client";

const userid = sessionStorage.getItem("steamid");

console.log(userid);

export const userinfo = {
  id: userid,
};

const socket = io("https://guttural-flashy-narwhal.glitch.me");
// const socket = io("http://localhost:4500");

socket.on("connect", () => {
  console.log("Connected to server!");
});

if (userid) {
  socket.emit("userid", userinfo.id);
}

export default socket;

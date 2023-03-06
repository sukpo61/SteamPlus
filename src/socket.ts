import { io } from "socket.io-client";

const BACKEND_ID: any = process.env.REACT_APP_BACKEND_ID;

const userid = sessionStorage.getItem("steamid");

console.log(BACKEND_ID);

export const userinfo = {
  id: userid,
};

const socket = io(BACKEND_ID);
// const socket = io("http://localhost:4500");

socket.on("connect", () => {
  console.log("Connected to server!");
});

if (userid) {
  socket.emit("userid", userinfo.id);
}

export default socket;

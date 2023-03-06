import { io } from "socket.io-client";

const userid = sessionStorage.getItem("steamid");

console.log(userid);

export const userinfo = {
  id: userid,
};

// const socket = io("https://full-bees-try-183-109-20-88.loca.lt");
const socket = io("https://guttural-flashy-narwhal.glitch.me");

socket.on("connect", () => {
  console.log("Connected to server!");
});

if (userid) {
  socket.emit("userid", userinfo.id);
}

export default socket;

{
  /* {room.name === currentRoom ? (
          <Usercount>
            <Usercircle></Usercircle>
            <span>{room.userinfo.length}</span>
          </Usercount>
        ) : (
          <RoomUserList>
            {room.userinfo.map((user: any) => {
              const info = friendAllRecoil.find(
                (e: any) => e.id === user.userid
              );

              return (
                <RoomUserWrap key={info?.id}>
                  <img src={info?.profileimg}></img>
                  <span>{info?.nickname}</span>
                </RoomUserWrap>
              );
            })}
          </RoomUserList>
        )} 
          width: ${(props) =>
    props.videoratio() ? null : `calc(100% / ${props.videocount})`};
    */
}

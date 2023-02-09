import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../Firebase";
import { log } from "console";
// import { authser } from "../../../Firebase";

function Signup() {
  const navigate = useNavigate();
  //닉네임인풋
  const [nicName, setNicName] = useState("");
  const nicNameRef = useRef<HTMLInputElement>(null);
  const nicNameOnChange = (event: any) => {
    setNicName(event.target.value);
  };
  //아이디 인풋
  const [userId, setUserId] = useState("");
  const userIdRef = useRef<HTMLInputElement>(null);
  const userIdOnChange = (event: any) => {
    setUserId(event.target.value);
  };
  //패스워드 인풋
  const [userFw, setUserFw] = useState("");
  const userFwRef = useRef<HTMLInputElement>(null);
  const userFwOnChange = (event: any) => {
    setUserFw(event.target.value);
  };
  // 메인화면 이동버튼
  const gotoBack = () => {
    navigate("/");
  };
  // 로그인화면 이동버튼
  const gotoLogin = () => {
    navigate("/Login");
  };
  const addUser = (event: any) => {
    event.preventDefault();
    if (!nicName) {
      alert("닉네임 입력해주세요");
      nicNameRef.current!.focus();
    } else if (!userId) {
      alert("아이디를 입력해주세요");
      userIdRef.current!.focus();
    } else if (!userFw) {
      alert("패스워드를 입력해주세요");
      userFwRef.current!.focus();
    }
    createUserWithEmailAndPassword(authService, userId, userFw)
      .then((userCredential) => {
        // const user = userCredential.user;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
    alert("회원가입 되었습니다");
    gotoLogin();
    return;
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={addUser}>
        <section>
          닉네임 :{" "}
          <input value={nicName} onChange={nicNameOnChange} ref={nicNameRef} />
          이메일 :{" "}
          <input value={userId} onChange={userIdOnChange} ref={userIdRef} />
          비밀번호 :{" "}
          <input value={userFw} onChange={userFwOnChange} ref={userFwRef} />
          <button>확인</button>
        </section>
      </form>
      <button onClick={gotoBack}>메인화면</button>
      <button onClick={gotoLogin}>로그인하러</button>
    </>
  );
}

export default Signup;

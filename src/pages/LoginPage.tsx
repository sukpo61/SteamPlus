import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../Firebase";

const Login = () => {
  // 메인화면 이동버튼
  const gotoBack = () => {
    navigate("/");
  };
  // 회원가입 이동버튼
  const navigate = useNavigate();
  const gotoSignup = () => {
    navigate("/");
  };
  //아이디 인풋
  const [userId, setUserId] = useState("");
  const userIdRef = useRef<HTMLInputElement>(null);
  const userIdOnChange = (event: any) => {
    setUserId(event.target.value);
  };
  //패스워드 인풋
  const [userPw, setUserPw] = useState("");
  const userFwRef = useRef<HTMLInputElement>(null);
  const userFwOnChange = (event: any) => {
    setUserPw(event.target.value);
  };

  const loginUser = () => {
    if (!userId) {
      alert("아이디를 입력하세요");
    } else if (!userPw) {
      alert("비밀번호를 입력하세요");
    } else {
      alert("로그인완료");
      signInWithEmailAndPassword(authService, userId, userPw)
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    }
  };
  console.log(authService.currentUser);
  return (
    <>
      <h1>Login</h1>
      아이디 :<input value={userId} ref={userIdRef} onChange={userIdOnChange} />
      비밀번호 :
      <input value={userPw} ref={userFwRef} onChange={userFwOnChange} />
      <button onClick={loginUser}>확인</button>
      <button onClick={gotoSignup}>회원가입</button>
    </>
  );
};

export default Login;

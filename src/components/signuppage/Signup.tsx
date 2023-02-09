import React, { useRef, useState } from "react";

function Signup() {
  //닉네임인풋
  const [nicName, setNicName] = useState();
  const nicNameRef = useRef<HTMLInputElement>(null);
  const nicNameOnChange = (event: any) => {
    setNicName(event.target.value);
  };
  //아이디 인풋
  const [userId, setUserId] = useState();
  const userIdRef = useRef<HTMLInputElement>(null);
  const userIdOnChange = (event: any) => {
    setUserId(event.target.value);
  };
  //패스워드 인풋
  const [userFw, setUserFw] = useState();
  const userFwRef = useRef<HTMLInputElement>(null);
  const userFwOnChange = (event: any) => {
    setUserFw(event.target.value);
  };

  return (
    <>
      <h1>회원가입</h1>
      <form>
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
    </>
  );
}

export default Signup;

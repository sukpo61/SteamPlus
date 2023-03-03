import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({ setLoginModalOpen }: Props) {
  const STEAM_OPENID_ENDPOINT = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=http://localhost:3000/login/&openid.realm=http://localhost:3000/login&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
  const SteamLogin = () => {
    window.location.href = STEAM_OPENID_ENDPOINT;
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <ModalArea>
      <ModalWindow>
        <ModalIntro>
          로그인하여 Steam+의
          <br />
          다양한 서비스를 경험해보세요
        </ModalIntro>
        <LoginBtn>
          <LoginBtnSteamLogo src="/img/SteamLogo.png" />
          <LoginBtnText onClick={SteamLogin}>
            Steam 계정으로 로그인
          </LoginBtnText>
        </LoginBtn>
      </ModalWindow>
      <ModalClose onClick={handleLoginModalClose}>닫기</ModalClose>
    </ModalArea>
  );
}

const ModalArea = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  /* left: 50%; */
  /* transform: translate(-50%, 0); */
  margin-left: 120px;
  z-index: 9999;
`;

const ModalWindow = styled.div`
  width: 240px;
  height: 120px;
  left: 800px;
  top: 28px;
  margin-top: 32px;

  background: rgba(38, 50, 69, 0.8);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ModalClose = styled.button`
  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 12px;
  color: white;
  width: 50px;
  padding: 10px;
`;

const ModalIntro = styled.div`
  height: 32px;
  left: 47px;
  top: 20px;

  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

const LoginBtn = styled.button`
  width: 200px;
  height: 40px;
  left: 20px;
  top: 60px;
  background: linear-gradient(
    90deg,
    #12f8d8 -15.62%,
    #09bec6 40.41%,
    #007db2 107.07%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

const LoginBtnSteamLogo = styled.img`
  width: 24px;
`;

const LoginBtnText = styled.div`
  height: 17px;
  left: 48px;
  top: 11px;

  font-family: "Inter";
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

export default LoginModal;

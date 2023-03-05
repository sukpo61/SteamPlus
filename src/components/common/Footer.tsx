import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

function Footer() {
  return (
    <>
      <div style={{ minHeight: "100vh", zIndex: "999" }}>
        <Outlet />
      </div>
      {/* <MainBody></MainBody> */}

      <FooterArea>
        <FooterLogo src="/img/SteamPlusLogo2.png" />
        <MemberInfo>
          <Position style={{ width: 44 }}>개발자</Position>
          <Member style={{ width: 176 }}>고현석 손유진 신정근 차상현</Member>
          <Position style={{ width: 56 }}>디자이너</Position>
          <Member style={{ width: 44 }}>이채은</Member>
        </MemberInfo>
      </FooterArea>
    </>
  );
}

//

// const MainBody = styled.div`
//   position: relative;
//   min-height: 100%;
//   padding-bottom: 52px;
// `;

const FooterArea = styled.div`
  background-color: #263245;
  color: white;
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -52px;
  gap: 20px;
`;

const FooterLogo = styled.img`
  width: auto;
  height: 24px;
  /* position: absolute; */
  margin-left: 16px;
  margin-right: 16px;
`;

const MemberInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
`;

const Position = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.03em;
  color: #d4d4d4;
`;

const Member = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.03em;
  color: #a7a9ac;
`;

export default Footer;

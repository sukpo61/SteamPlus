import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const location = window.location.href;

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>

      <FooterArea location={location}>
        <Copyright>
          <FooterLogo
            src="/img/SteamPlusLogo2.png"
            onClick={() => navigate(`/landing`)}
          />
          <CopyrightText>ⓒ 2023. SteamPlus All Rights Reserved.</CopyrightText>
        </Copyright>
        <MemberInfo>
          <PositionGroup>
            <Position style={{ width: 42 }}>개발자</Position>
            <DeveloperMember>
              <MemArray>
                <Member
                  onClick={() => {
                    window.open("https://github.com/sukpo61");
                  }}
                >
                  고현석
                </Member>
                <Member
                  onClick={() => {
                    window.open("https://github.com/freedobby77");
                  }}
                >
                  손유진
                </Member>
              </MemArray>
              <MemArray>
                <Member
                  onClick={() => {
                    window.open("https://prdg.tistory.com/");
                  }}
                >
                  신정근
                </Member>
                <Member
                  onClick={() => {
                    window.open("https://github.com/mr-chacha");
                  }}
                >
                  차상현
                </Member>
              </MemArray>
            </DeveloperMember>
          </PositionGroup>
          <PositionGroup>
            <Position style={{ width: 56 }}>디자이너</Position>
            <Member
              onClick={() => {
                window.open("https://www.behance.net/ce9bc424");
              }}
            >
              이채은
            </Member>
          </PositionGroup>
        </MemberInfo>
      </FooterArea>
    </>
  );
}

const FooterArea = styled.div<{ location: any }>`
  /* position: static;
  bottom: 100px; */
  background-color: #263245;
  width: 100%;
  height: 100px; //52px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) =>
    props.location === "https://steam-plus-theta.vercel.app/" ? "0" : "-100px"};
  gap: 420px;
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FooterLogo = styled.img`
  width: 80px;
  cursor: pointer;
`;

const CopyrightText = styled.p`
  width: 260px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  font-style: normal;
  letter-spacing: -0.03em;
  color: #a7a9ac;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
`;

const PositionGroup = styled.div`
  display: flex;
  gap: 16px;
`;
const DeveloperMember = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MemArray = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Position = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.03em;
  color: #d4d4d4;
`;

const Member = styled.p`
  width: 42px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.03em;
  color: #a7a9ac;
  cursor: pointer;
`;

export default Footer;

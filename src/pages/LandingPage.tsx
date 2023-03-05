import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <LandingHeader></LandingHeader>
      <LandingImg1Area>
        <LandingImg1Gradient />
        <LandingImg1 src="/img/LandingImg1-1.png" />
        <SteamPlusIntro>
          <SteamPlusWhite src="/img/SteamPlusLogo2.png" />
          <IntroText>
            여러분의 게임을 더욱 즐겁게 만들어줄 SteamPlus를 소개합니다!
          </IntroText>
        </SteamPlusIntro>
      </LandingImg1Area>
      <IntroTextArea1>
        <SteamplusColabo src="/img/SteamplusColabo.png" />
        <IntroAboutChat>
          SteamPlus는 Steam 게임 기반의 웹서비스로, Steam 유저들이 실시간으로
          <br />
          함께 게임을 즐길 수 있는 화상음성채팅 기능을 제공하고 있습니다.
        </IntroAboutChat>
        <IntroTextWithBtn>
          Steam 게임을 더욱 효율적으로 즐길 수 있는 SteamPlus와 함께 게임
          동료들을 만나보세요!
        </IntroTextWithBtn>
        <SteamPlusBtn onClick={() => navigate(`/`)}>
          <ButtonLogo src="/img/LogoWhite.png" />
          <ButtonText>Steamplus 시작하기</ButtonText>
        </SteamPlusBtn>
      </IntroTextArea1>

      <LandingImgWrap>
        <LandingImg2 src="/img/LandingImg2.png" />
        <LandingImg3 src="/img/LandingImg3.png" />
      </LandingImgWrap>

      <LandingBottomGradient>
        <LogoOpacity src="/img/LogoNoPlusIntroImg.png" />
        <IntroAboutFriendWrap>
          <IntroAboutFriend>
            SteamPlus를 통해 원하는 게임을 같이 즐길 수 있는 다른 사용자들을
            쉽게 만나볼 수 있습니다.
          </IntroAboutFriend>
          <IntroAboutFriend>
            또한 함께 게임을 즐긴 사용자를 새로운 친구로 추가하여 이후에도
            함께할 수 있습니다.
          </IntroAboutFriend>
          <IntroAboutFriend>
            Steam 유저의 게임 정보를 가져와 같은 게임을 즐기는 사용자들을 찾을
            수도 있습니다.
          </IntroAboutFriend>
        </IntroAboutFriendWrap>
      </LandingBottomGradient>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #192030;
`;

const LandingHeader = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: 72px;
  top: -100px;
  background: #080c16;
`;

const LandingImg1Gradient = styled.div`
  position: absolute;
  width: 1289px;
  height: 445px;
  background: linear-gradient(90deg, rgba(18, 3, 81, 0) 0%, #06001d 100%);
  transform: rotate(-180deg);
  z-index: 99;
`;

const LandingImg1Area = styled.div`
  position: relative;
  width: 1840px;
  height: 445px;
  overflow: hidden;
`;
const LandingImg1 = styled.img`
  position: absolute;
  top: -228px;
  width: 1872px;
  height: auto;
`;

const SteamPlusIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: absolute;
  margin-top: 251px;
  margin-left: 346px;
  z-index: 100;
`;

const SteamPlusWhite = styled.img`
  width: 282px;
  height: 99px;
`;

const IntroText = styled.p`
  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const IntroTextArea1 = styled.div`
  padding-top: 65px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 1840px;
  height: 700px;
  background: #232c42;
`;

const SteamplusColabo = styled.img`
  height: 296px;
  width: auto;
  margin-bottom: 36px;
`;

const IntroAboutChat = styled.p`
  /* width: 480px; */
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 68px;
`;

const IntroTextWithBtn = styled.p`
  height: 27px;
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.03em;
  text-align: center;
  color: #ffffff;
`;

const SteamPlusBtn = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 260px;
  height: 60px;

  background: linear-gradient(
    92.36deg,
    #002fa8 -12.66%,
    #007db2 32.6%,
    #09bec6 80.26%,
    #12f8d8 125.98%
  );
  border-radius: 10px;
  cursor: pointer;
`;

const ButtonLogo = styled.img`
  width: 36px;
  height: auto;
`;

const ButtonText = styled.p`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const LandingImgWrap = styled.div`
  margin-top: 105px;
  display: flex;
  flex-direction: row;
  margin-bottom: 118px;
`;

const LandingImg2 = styled.img`
  width: 485px;
  height: 323px;
`;

const LandingImg3 = styled.img`
  margin-top: 174px;
  width: 484px;
  height: 323px;
`;

const LogoOpacity = styled.img`
  position: absolute;
  height: 324px;
  /* width: auto; */
`;

const IntroAboutFriendWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 736px;
  gap: 24px;

  margin-top: 103px;
  z-index: 999;
`;
const IntroAboutFriend = styled.p`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.03em;

  color: #ffffff;
`;
const LandingBottomGradient = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 1840px;
  height: 442px;
  background: linear-gradient(
    rgba(18, 3, 81, 0) 0%,
    rgba(0, 184, 200, 0.2) 100%
  );
`;

export default LandingPage;

import React, { useEffect } from "react";
import AOS from "aos";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true }); // once:true 한번 실행된건 재실행x
  });
  // react-scroll-delay-action
  // 1237404145

  //lazy load
  return (
    <MainContainer>
      <LandingHeader></LandingHeader>
      <LandingImg1Area>
        <LandingImg1Gradient />
        <LandingImg1
          src="/img/LandingImg1-2.png"
          data-aos="fade-up"
          data-aos-duration="2000"
        />
        <SteamPlusIntro>
          <SteamPlusWhite
            src="/img/SteamPlusLogo2.png"
            data-aos="fade-right"
            data-aos-duration="2000"
          />
          <IntroText data-aos="fade-right" data-aos-duration="2000">
            여러분의 게임을 더욱 즐겁게 만들어줄 SteamPlus를 소개합니다!
          </IntroText>
        </SteamPlusIntro>
      </LandingImg1Area>
      <IntroTextArea1>
        <SteamplusCollabo
          src="/img/SteamplusColabo.png"
          data-aos="fade-up"
          data-aos-duration="1000"
        />
        {/* <CollaboWrap data-aos="zoom-in">
          <CollaboSteam src="/img/CollaboSteam.png" data-aos="fade-right" />
          <CollaboRing src="/img/CollaboRing.png" data-aos="zoom-out" />
          <CollaboSteamPlus
            src="/img/CollaboSteamPlus.png"
            data-aos="fade-left"
          />
        </CollaboWrap> */}
        <IntroAboutChat data-aos="fade-up" data-aos-duration="1000">
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
        <LandingImg2 src="/img/LandingImg2.png" data-aos="fade-down" />
        <LandingImg3 src="/img/LandingImg3.png" data-aos="fade-up" />
      </LandingImgWrap>

      <LandingBottomGradient>
        <LogoOpacity src="/img/LogoNoPlusIntroImg.png" />
        <IntroAboutFriendWrap>
          <IntroAboutFriend
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-offset="20"
          >
            SteamPlus를 통해 원하는 게임을 같이 즐길 수 있는 다른 사용자들을
            쉽게 만나볼 수 있습니다.
          </IntroAboutFriend>
          <IntroAboutFriend
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0"
          >
            또한 함께 게임을 즐긴 사용자를 새로운 친구로 추가하여 이후에도
            함께할 수 있습니다.
          </IntroAboutFriend>
          <IntroAboutFriend
            data-aos="fade-down"
            data-aos-duration="2000"
            data-aos-offset="20"
          >
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
  background-color: #192030;
`;

const LandingHeader = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: 72px;
  top: -100px;
  background-color: #080c16;
`;

const LandingAnimation = keyframes`
0% {
    opacity:0%;
  }
  100% {
    opacity: 100%;
  }`;

const LandingImg1Area = styled.div`
  position: relative;
  /* width: 1840px; */
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  /* justify-content: center; */
  width: 100%;
  height: 445px;
  /* height: 21%; */
  overflow: hidden;
`;

const LandingImg1Gradient = styled.div`
  position: absolute;
  /* width: 1289px; */
  width: 70%;
  height: 445px;
  background: linear-gradient(90deg, rgba(18, 3, 81, 0) 0%, #06001d 100%);
  transform: rotate(-180deg);
  z-index: 99;
`;

const LandingImg1 = styled.img`
  position: absolute;
  /* top: -228px; */
  /* width: 1872px; */
  top: 0;
  left: 0;
  transform: translate(0, 0); // translateY(6%); // 24% */
  object-fit: cover;
  width: 100%;
  /* min-width: 1200px; */
  height: 100%;

  animation: ${LandingAnimation} 1s ease-in-out;
`;

const SteamPlusIntro = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: 400px;
  transform: translateX(-50%);
  /* left: 30%; */
  top: 250px;
  left: 50%;
  z-index: 100;
`;

const SteamPlusWhite = styled.img`
  width: 282px;
  height: 99px;

  animation: ${LandingAnimation} 0.5s ease-in-out;
`;

const IntroText = styled.p`
  width: 560px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.03em;
  color: #ffffff;

  animation: ${LandingAnimation} 0.5s ease-in-out;
`;

const IntroTextArea1 = styled.div`
  padding-top: 65px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* width: 1840px; */
  width: 100%;
  height: 700px;
  background: #232c42;
`;

const SteamplusCollabo = styled.img`
  height: 296px;
  width: auto;
  margin-bottom: 36px;
`;

// const CollaboWrap = styled.div`
//   margin-bottom: 36px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   /* position: relative; */
// `;

// const CollaboSteam = styled.img`
//   /* position: absolute; */
//   height: 110px;
//   transform: translateX(75%);
// `;
// const CollaboRing = styled.img`
//   height: 295px;
// `;
// const CollaboSteamPlus = styled.img`
//   /* position: absolute; */
//   height: 110px;
//   transform: translateX(-75%);
// `;

const IntroAboutChat = styled.p`
  /* width: 480px; */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 68px;
  width: 520px;
`;

const IntroTextWithBtn = styled.p`
  height: 27px;
  width: 800px;
  font-style: normal;
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
  font-style: normal;
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
  font-style: normal;
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

  /* width: 1840px; */
  width: 100%;
  height: 442px;
  background: linear-gradient(
    rgba(18, 3, 81, 0) 0%,
    rgba(0, 184, 200, 0.2) 100%
  );
`;

export default LandingPage;

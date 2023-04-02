import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AboutPagesState } from "../../recoil/atom";
import { BiExit } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import About1 from "./img/about1.jpg/";

const PrevArrow = ({ onClick }: any) => (
  <ArrowButton onClick={onClick} style={{ right: 90 }}>
    <FaChevronLeft className="arrows" />
  </ArrowButton>
);

const NextArrow = ({ onClick }: any) => (
  <ArrowButton onClick={onClick} style={{ right: 50 }}>
    <FaChevronRight className="arrows" />
  </ArrowButton>
);

function AboutPages() {
  //설명페이지 온오프
  const [aboutPagesOnOff, setAboutPagesOnOff] =
    useRecoilState<String>(AboutPagesState);

  //slider세팅
  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  //slider on일때 스크롤 없애기
  useEffect(() => {
    if (aboutPagesOnOff === "aboutPages") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [aboutPagesOnOff]);

  return (
    <AboutPagesDiv aboutPagesOnOff={aboutPagesOnOff}>
      <p
        className="exitIcon"
        onClick={() => {
          setAboutPagesOnOff("close");
        }}
      >
        X
      </p>
      <Slider {...sliderSettings}>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout1.webp"></AboutPagesSlider>
        </InnerSlider>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout2.webp"></AboutPagesSlider>
        </InnerSlider>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout3.webp"></AboutPagesSlider>
        </InnerSlider>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout4.webp"></AboutPagesSlider>
        </InnerSlider>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout5.webp"></AboutPagesSlider>
        </InnerSlider>
        <InnerSlider>
          <AboutPagesSlider src="./img/steamPlusAbout6.webp"></AboutPagesSlider>
        </InnerSlider>
      </Slider>
    </AboutPagesDiv>
  );
}

export default AboutPages;

const AboutPagesDiv = styled.div<{ aboutPagesOnOff: any }>`
  display: ${(props) =>
    props.aboutPagesOnOff === "aboutPages" ? "block" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999999999999999999999999;

  .exitIcon {
    position: fixed;
    top: 30px;
    right: 40px;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
    z-index: 99999999999999999999999999;
  }
  .slick-dots {
    bottom: 5%;
  }
  .slick-dots li button:before {
    color: #fff;
  }
`;
const InnerSlider = styled.div`
  width: 100%;
  height: 100vh;
  display: flex !important;
  align-items: center;
  justify-content: center;
`;
const AboutPagesSlider = styled.img`
  width: 80%;
  max-height: 80vh;
  object-fit: contain;
  margin: auto;
`;

const ArrowButton = styled.button`
  position: absolute;
  bottom: 50px;
  cursor: pointer;
  z-index: 99;
  .arrows {
    font-size: 24px;
    color: #fff;
  }
`;

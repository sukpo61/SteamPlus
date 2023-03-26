import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
  ${reset} // styled-reset이라는 패키지를 설치해야한다. 몇가지만 reset해 줄 경우 사용하지 않아도 무방하다.
  /* 나중에 배경화면 전역 사용가능 */
   /* Set font for Hangul characters */

  body{
    background-color:#192030;
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
    cursor:default;
  }
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;

export default GlobalStyles;

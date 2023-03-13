# steamPlus 링크 https://steam-plus-theta.vercel.app/

![1234](https://user-images.githubusercontent.com/116047764/224586337-350a3cf1-abc1-464e-acbc-3fe5134789dc.png)

![123](https://user-images.githubusercontent.com/116047764/224586342-3c373968-0385-42b4-b380-0cc4d9388ec4.png)

## 🏡 아키텍쳐

![12345](https://user-images.githubusercontent.com/116047764/224586419-ba9b63b4-f84f-4805-a45a-227aea379096.png)

## 🎲기술적 의사 결정

| 사용기술 | 기술 설명 |
| --- | --- |
| recoil | 리코일은 매우 간단한 코드로 상태를 관리할 수 있습니다. 리덕스와 비교해 상태를 업데이트하기 위해 액션 타입, 액션 생성자, 리듀서를 작성할 필요가 없으며, 상태 업데이트 로직을 작성할 때도 상태 객체 자체를 직접 수정할 수 있었습니다. |
| socket.io | Socket.io는 다양한 이벤트를 지원하여 클라이언트에서 서버로 데이터를 전송하고 서버에서 클라이언트로 데이터를 전송할 수 있습니다. 이러한 특징으로 인해, Socket.io는 실시간 채팅기능을 구현하는 데 매우 유용합니다. |
| WebRTC | WebRTC는 브라우저에서 P2P(peer-to-peer) 통신을 가능하게 하는 기술입니다. 이 기술은 별도 플러그인 없 브라우저 내장 기능으로 제공되며, 브라우저 간에 영상 및 음성 데이터를 실시간으로 전송할 수 있습니다. |
| json-server, glitch | db.json 파일을 사용하면 데이터베이스 서버를 구축하지 않아도 되고 Glitch에서는 개발자가 손쉽게 프로젝트를 공유하고, 팀원과 함께 작업할 수 있기 때문에 개발 프로세스가 편리해집니다. |

## 🔧 트러블 슈팅

- **WebRTC n 대 n 실시간 화상채팅 관련**
    
    ❓문제파악
    
    문제원인 소캣 io 와 webrtc 로 화상통화를 할 때 로컬환경에서는 문제가 없으나 배포시 간헐적으로 연결이 되지 않는 이슈.
    
    ❗원인분석
    
    서버 상황에 따라 Caller가 일부 ICECandidate를 Offer보다 먼저 발송하게됨.
    
    ✔️문제해결
    
    아이스 캔디데이트를 받는 소캣 on 부분에 setTimeout으로 지연시간을 주어 해결.
    

- **친구 기능 관련 랜더링 문제**
    
    ❓문제파악
    
    친구요청과 같은관련 이벤트시 발신, 수신자의 랜더가 바로 일어나지 않음
    
    ❗원인분석
    
    쿼리가 남아있어서 이벤트가 일어나기 전 데이터가 남아있음. 
    
    ✔️문제해결
    
    sender : useMutation안의 onSuccess에 refetchQueries혹은 invalidateQueries를 사용
    
    caller : socket.io를 사용해 이벤트를 클릭하면 해당 친구 아이디로 상대 클라이언트 소캣을 추적하여 랜더가 일어나게 함.
    

## 📘 주요 기능
![steamPlusAbout1](https://user-images.githubusercontent.com/116047764/224586153-02c73544-f8ec-425a-bb61-de2a78c8d450.jpg)

![steamPlusAbout2](https://user-images.githubusercontent.com/116047764/224586191-a4559ac3-ee87-40d4-ace3-39bd41afcf86.jpg)

![steamPlusAbout3](https://user-images.githubusercontent.com/116047764/224586194-271b52b5-a200-422a-9d6f-68b3112d8d8e.jpg)

![steamPlusAbout4](https://user-images.githubusercontent.com/116047764/224586240-cbd09128-0af8-411a-9c78-969267fb984d.jpg)

![steamPlusAbout5](https://user-images.githubusercontent.com/116047764/224586243-91d18e0d-a3cc-46fc-9f30-c58b15a53d4f.jpg)

![steamPlusAbout6](https://user-images.githubusercontent.com/116047764/224586246-1e1c37a5-c475-4474-854c-0ba3d7bbc37d.jpg)

## 😀 팀원 소개

| 이름 | 담당 | 개인 주소 | 메일 주소 |
| --- | --- | --- | --- |
| 고현석 | 팀장 | https://github.com/sukpo61 | sukpo6010@gmail.com |
| 신정근 | 부팀장 | https://prdg.tistory.com/ | sjk990515@naver.com |
| 손유진 | 부디자이너 | https://github.com/freedobby77 | y09urt77@gmail.com |
| 차상현 | 미드필더 | https://github.com/mr-chacha | hoitchac@gmail.com |
| 이채은  | 디자이너 |  | eun9077@gmail.com |

| 이름 | 담당 |
| --- | --- |
| 고현석 | socket.io 백앤드 서버 구축,실시간 팀 텍스트, 화상채팅기능. 방생성, 설정기능, 메인페이지 활성화된 채널 기능 |
| 신정근 | 메뉴기능, 친구 요청,수락, 거절,삭제, 유저 검색, 실시간 1대1 채팅 socket.io, 커뮤니티 댓글CRUD,컨텍스트메뉴 |
| 손유진 | 부디자이너, 검색기능, 랜딩페이지 |
| 차상현 | 미드필더, 커뮤니티 게시글 CRUD, 스팀로그인 |
| 이채은  | 디자이너 |

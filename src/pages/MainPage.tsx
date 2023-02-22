import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import { PoularChannel } from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
import { useQuery } from "react-query";
function MainPage() {
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const GameId: any = sessionStorage.getItem("gameid");

  const GameIds: any =
    GameId === "undefined" ? 990080 : sessionStorage.getItem("gameid");
  //게임이미지 불러오기
  const Gamedata = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          // appids: GameId,
          appids: GameIds, // 해당 게임의 id값
        },
      }
    );

    return {
      gametitle: response.data[GameIds].data.name,
      gameCategories: response.data[GameIds].data.genres[0].description,
      gameCategories2: response.data[GameIds].data.genres[1].description,
      gameCategories3: response.data[GameIds].data.genres[2].description,
      gameMainImg: response.data[GameIds].data.screenshots[1].path_full,
      gameSubimg: response.data[GameIds].data.header_image,
    };
    // return response
  };

  const { data }: any = useQuery("Gamedata", Gamedata);
  // console.log("data2", data);
  // 새로고침시 업데이트하기

  return (
    <MainLayout>
      {/* 메인게임 이미지 */}
      <CurrentGame game={data} />

      {/* 인기채널 */}
      <PoularChannel game={data} />
      {/* 현재활성화된 채널 */}
      <ActivateChannel game={data} />
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default MainPage;

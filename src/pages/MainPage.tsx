import axios from "axios";
import styled from "styled-components";
import { ActivateChannel } from "../components/ActivateChannel";
import { PoularChannel } from "../components/PoularChannel";
import { CurrentGame } from "../components/CurrentGame";
import { useQuery } from "react-query";
function MainPage() {
  //게임이미지 불러오기
  const Gamedata = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
      {
        params: {
          // appids: GameId,
          appids: 990080, // 해당 게임의 id값
        },
      }
    );
    return {
      gametitle: response.data[990080].data.name,
      gameCategories: response.data[990080].data.genres[0].description,
      gameCategories2: response.data[990080].data.genres[1].description,
      gameCategories3: response.data[990080].data.genres[2].description,
      gameMainImg: response.data[990080].data.screenshots[1].path_full,
      gameSubimg: response.data[990080].data.header_image,
    };
    // return response
  };

  const { data } = useQuery("Gamedata", Gamedata);
  // console.log("data2", data);

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

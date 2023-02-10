import React, { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";

interface Game {
  [key: string]: string | number | boolean | any;
  appid: number;
  name: string;
}

const ChannelSearchPage: any = () => {
  const [searchGames, setSearchGames] = useState<Game[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("dead");
  const APIKEY = "234E0113F33D5C7C4D4D5292C6774550";
  const STEAM_ACCOUNT_NAME = "sukpo61@naver.com";
  const client_id = "ucj588lq839jowdgqawe2651hbna80";
  const client_secret = "ie8i79maa233egjs88c90el20svaav";
  const token = "1cly6ag9tr1y0q3mvvck9jw1j123sc";
  const gameId = "87173";

  useEffect(() => {
    // axios
    //   .get(
    //     "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/storesearch",
    //     {
    //       params: {
    //         cc: "us",
    //         l: "en",
    //         term: "dead",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("searchresult", response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // axios
    //   .get(
    //     "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
    //     {
    //       params: {
    //         key: APIKEY,
    //         steamids: "76561198374391933",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("userstate", response);
    //   })
    //   .catch((error) => setError(error));

    // axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/`,
    //     {
    //       params: {
    //         key: APIKEY,
    //         vanityurl: "SUKPO61",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("steamid", response);
    //   })
    //   .catch((error) => setError(error));

    // axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails/`,
    //     {
    //       params: {
    //         appids: "250900",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("gamedetail", response);
    //   })
    //   .catch((error) => {
    //     setError("Could not retrieve header image");
    //   });

    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
      )
      .then((response) => {
        console.log("token", response);
      })
      .catch((error) => {
        setError("Could not retrieve header image");
      });

    axios({
      url: "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/screenshots",
      method: "post",
      headers: {
        Accept: "application/json",
        "Client-ID": "ucj588lq839jowdgqawe2651hbna80",
        Authorization: `Bearer eca8nhousl74mt7g1gndeek0dd6b9e`,
      },
      // params: {
      //   fields: "url",
      //   filter: `[games][eq]=${gameId}&[resolution][eq]=720p`,
      // },

      // data: "fields alpha_channel,animated,checksum,game,height,image_id,url,width;",
      data: {
        fields: {
          url: {},
          game: {},
        },
        filter: {
          game: {
            eq: gameId,
          },
          resolution: {
            eq: "720p",
          },
        },
      },
    })
      .then((response) => {
        console.log("image", response);
      })
      .catch((error) => {
        console.log("error", error);

        // setError("Could not retrieve header image");
      });
  }, []);

  return <div>1</div>;
};

export default ChannelSearchPage;

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
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
        {
          params: {
            key: "234E0113F33D5C7C4D4D5292C6774550",
            steamids: "76561198374391933",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchGames.map((game: Game) => (
        <div key={`${game.appid}`}>
          <div>{`${game.name}`}</div>
        </div>
      ))}
    </div>
  );
};

export default ChannelSearchPage;

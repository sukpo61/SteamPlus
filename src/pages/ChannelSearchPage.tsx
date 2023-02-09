import React, { useState, useEffect } from "react";
import axios from "axios";

interface Game {
  [key: string]: string | number | boolean | any;
  appid: number;
  name: string;
}

const ChannelSearchPage: any = () => {
  const SteamSearch = () => {
    const [searchGames, setSearchGames] = useState<Game[]>([]);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const API_KEY = "366F82432C264B4FB1CE15534A050D09";
    const [searchInput, setSearchInput] = useState("");

    const searchSteamGames = async () => {
      // setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ applist: { apps: Game[] } }>(
          `http://api.steampowered.com/ISteamApps/Search/v1/?key=${API_KEY}&query=${searchInput}`
        );
        setSearchGames(response.data.applist.apps);
      } catch (error) {
        setError(error);
      }
      // setLoading(false);
    };

    useEffect(() => {
      searchSteamGames();
    }, [searchInput]);

    // const [inputText, setInputText] = useState("");
    // const BASE_SEARCH_URL = "";
    // const API_KEY = "366F82432C264B4FB1CE15534A050D09";

    // const getSearchGames = async () => {};

    return (
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={searchSteamGames}>Search</button>

        {searchGames.map((game: Game) => (
          <div key={`${game.appid}`}>
            <div>{`${game.name}`}</div>
          </div>
        ))}
        {/* {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.appid}>{game.name}</li>
          ))}
        </ul>
      )} */}
      </div>
    );
  };
};

export default ChannelSearchPage;

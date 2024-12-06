import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

const AnimeContext = createContext();

function AnimeContextProvider({ children }) {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState(undefined);
  const [popularAnimeList, setPopularAnimeList] = useState([]);
  const [favoriteAnimeList, setFavoriteAnimeList] = useState([]);
  const [ratedAnimeList, setRatedAnimeList] = useState([]);
  const [featuredAnimeList, setFeaturedAnimeList] = useState([]);
  const [lists, setLists] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const fetchAnimeById = useCallback(async (animeId, navigate) => {
    try {
      // Ensure that we are passing the right data to the API
      const response = await axios.post("/getAnime.php", { id: animeId });
      // Check if the response data is successful
      if (response.data.success) {
        return response.data.data[0]; // If success, return the first anime
      } else {
        console.error("No data found for anime with ID:", animeId);
        // navigate("/");
      }
    } catch (error) {
      console.error("Error fetching Anime:", error);
      // navigate("/");
    }
  }, []);

  const fetchAnimeList = useCallback(async () => {
    try {
      const response = await axios.post("/getAnime.php");
      if (response.data.success) {
        const fetchedData = response.data.data;
        setAnimeList(fetchedData);
        setLists(fetchedData);
        console.log(fetchedData);
      } else {
        console.error("No Animes found");
      }
    } catch (error) {
      console.error("Error fetching Anime list:", error);
    }
  }, []);

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  useEffect(() => {
    const fetchSortedAnimes = async (sortBy, setter) => {
      try {
        const response = await axios.post("/getAnime.php", { sortBy });
        if (response.data.success) {
          setter(response.data.data.slice(0, 10));
          // console.log(
          //   `Fetched ${sortBy} Anime list:`,
          //   response.data.data.slice(0, 10)
          // );
        } else {
          console.error(`No ${sortBy} Animes found`);
        }
      } catch (error) {
        console.error(`Error fetching ${sortBy} Anime list:`, error);
      }
    };

    fetchAnimeList();

    fetchSortedAnimes("popular", setPopularAnimeList);
    fetchSortedAnimes("favorite", setFavoriteAnimeList);
    fetchSortedAnimes("rated", setRatedAnimeList);
  }, [fetchAnimeList]);

  useEffect(() => {
    if (animeList.length > 0) {
      const getRandomAnimes = () => {
        const randomAnimes = [];
        const tempList = [...animeList];

        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * tempList.length);
          randomAnimes.push(tempList.splice(randomIndex, 1)[0]);
        }

        setFeaturedAnimeList(randomAnimes);
      };

      getRandomAnimes();
    }
  }, [animeList]);

  return (
    <AnimeContext.Provider
      value={{
        animeList,
        setAnimeList,
        anime,
        setAnime,
        popularAnimeList,
        favoriteAnimeList,
        ratedAnimeList,
        featuredAnimeList,
        fetchAnimeById,
        fetchAnimeList,
        lists,
        setLists,
        accessToken,
        userId,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
}

export const useAnimeContext = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error(
      "useAnimeContext must be used within an AnimeContextProvider"
    );
  }
  return context;
};

export default AnimeContextProvider;

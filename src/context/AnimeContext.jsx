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
  const [onlyAnime, setOnlyAnime] = useState([]);
  const [castCollection, setCastCollection] = useState([]);
  const [imageCollection, setImageCollection] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const fetchOnlyAnime = useCallback(async () => {
    try {
      const response = await axios.post("/animeOnly.php");
      if (response.data.success) {
        setOnlyAnime(response.data.data);
      } else {
        console.error("No Animes found");
      }
    } catch (error) {
      console.error("Error fetching only anime list:", error);
    }
  }, []);

  useEffect(() => {
    fetchOnlyAnime();
  }, [fetchOnlyAnime]);

  const fetchAnimeById = useCallback(async (animeId, navigate) => {
    try {
      const response = await axios.post("/getAnime.php", { id: animeId });
      if (response.data.success) {
        console.log("sfdsfd", response.data.data[0]);
        return response.data.data[0];
      } else {
        console.error("No data found for anime with ID:", animeId);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching Anime:", error);
      navigate("/");
    }
  }, []);

  const fetchAnimeByIdCasts = useCallback(async (animeId) => {
    try {
      const response = await axios.post("/getAnime.php", { id: animeId });
      if (response.data.success) {
        const allData = response.data.data;

        const allCasts = allData.map((item) => item.casts).flat();
        setCastCollection(allCasts);
        console.log("All casts fetched:", allCasts);
      } else {
        console.error("No data found for anime with ID:", animeId);
      }
    } catch (error) {
      console.error("Error fetching Anime casts:", error);
    }
  }, []);

  const fetchAnimeByIdImages = useCallback(async (animeId) => {
    try {
      const response = await axios.post("/getAnime.php", { id: animeId });
      if (response.data.success) {
        const allData = response.data.data;

        const allImages = allData.map((item) => item.images).flat();
        setImageCollection(allImages);
        console.log("All images fetched:", allImages);
      } else {
        console.error("No data found for anime with ID:", animeId);
      }
    } catch (error) {
      console.error("Error fetching Anime images:", error);
    }
  }, []);

  const fetchAnimeList = useCallback(async () => {
    try {
      const response = await axios.post("/getAnime.php");
      if (response.data.success) {
        const fetchedData = response.data.data;
        setAnimeList(fetchedData);
        setLists(fetchedData);
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
        const response = await axios.post("/animeOnly.php", { sortBy });
        if (response.data.success) {
          setter(response.data.data.slice(0, 10));
          console.log(
            `Fetched ${sortBy} Anime list:`,
            response.data.data.slice(0, 10)
          );
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
    if (onlyAnime.length > 0) {
      const getRandomAnimes = () => {
        const randomAnimes = [];
        const tempList = [...onlyAnime];

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
        setFeaturedAnimeList,
        fetchAnimeByIdCasts,
        fetchAnimeByIdImages,
        imageCollection,
        fetchAnimeById,
        fetchAnimeList,
        fetchOnlyAnime,
        onlyAnime,
        lists,
        setLists,
        accessToken,
        userId,
        castCollection,
        setOnlyAnime,
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

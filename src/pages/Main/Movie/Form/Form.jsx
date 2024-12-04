import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedAnimeList, setsearchedAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(undefined);
  const [anime, setAnime] = useState(undefined);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [selectedItem, setSelectedItem] = useState(null);
  let { animeId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return searchedAnimeList.slice(startIndex, endIndex);
  };

  const handleSearch = useCallback(() => {
    console.log("searching...");

    setPage(1);

    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const genreAnimationId = 16;

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&original_language=ja&api_key=${apiKey}`,
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        let totalPages = response.data.total_pages;

        if (totalPages > 200) {
          totalPages = 200;
          console.log(totalPages);
        }

        const fetchAllPages = [];
        for (let page = 1; page <= totalPages; page++) {
          await delay(50);

          console.log(page);

          fetchAllPages.push(
            axios({
              method: "get",
              url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&original_language=ja&page=${page}&api_key=${apiKey}`,
              headers: {
                Accept: "application/json",
              },
            })
          );
        }
        Promise.all(fetchAllPages)
          .then((pageResponses) => {
            const allResults = pageResponses.reduce((acc, currentPage) => {
              return acc.concat(currentPage.data.results);
            }, []);
            const filteredResults = allResults.filter((item) => {
              const hasAnimationGenre =
                item.genre_ids && item.genre_ids.includes(genreAnimationId);
              const isJapanese = item.original_language === "ja";
              return hasAnimationGenre && isJapanese;
            });

            setsearchedAnimeList(filteredResults);
            console.log("Filtered Results:", filteredResults);
          })
          .catch((error) => {
            console.log("Error fetching all pages:", error);
            alert("Error fetching all pages");
          });
      })
      .catch((error) => {
        console.log("Error fetching search data:", error);
        alert("Error fetching data");
      });
  }, [query]);

  const handleSelectanime = async (anime) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;

    try {
      // Fetch detailed anime data
      const { data: animeDetails } = await axios.get(
        `https://api.themoviedb.org/3/${anime.media_type}/${anime.id}?api_key=${apiKey}`
      );

      // Fetch videos
      const { data: videoData } = await axios.get(
        `https://api.themoviedb.org/3/${anime.media_type}/${anime.id}/videos?api_key=${apiKey}`
      );
      const videos = videoData.results.map((video) => ({
        id: video.id,
        key: video.key,
        name: video.name,
        type: video.type,
        site: video.site,
      }));

      const { data: creditsData } = await axios.get(
        `https://api.themoviedb.org/3/${anime.media_type}/${anime.id}/credits?api_key=${apiKey}`
      );
      const casts = creditsData.cast.map((cast) => ({
        id: cast.id,
        name: cast.name,
        character: cast.character,
        profile_path: cast.profile_path
          ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
          : null,
      }));

      const { data: imagesData } = await axios.get(
        `https://api.themoviedb.org/3/${anime.media_type}/${anime.id}/images?api_key=${apiKey}`
      );

      const posters = imagesData.posters.map((poster) => ({
        file_path: `https://image.tmdb.org/t/p/original${poster.file_path}`,
        width: poster.width,
        height: poster.height,
      }));
      const backdrops = imagesData.backdrops.map((backdrop) => ({
        file_path: `https://image.tmdb.org/t/p/original${backdrop.file_path}`,
        width: backdrop.width,
        height: backdrop.height,
      }));

      setSelectedAnime({
        id: animeDetails.id,
        adult: animeDetails.adult,
        all_backdrop_path: backdrops || [],
        episode_run_time: animeDetails.episode_run_time || animeDetails.runtime,
        first_air_date:
          animeDetails.first_air_date || animeDetails.release_date,
        genres: animeDetails.genres || [],
        homepage: animeDetails.homepage || "",
        images: imagesData || {},
        origin_country: animeDetails.origin_country || [],
        original_language: animeDetails.original_language,
        original_name:
          animeDetails.original_name || animeDetails.original_title,
        name: animeDetails.name || animeDetails.title,
        overview: animeDetails.overview || "",
        popularity: animeDetails.popularity,
        all_poster_path: posters || [],
        production_companies: animeDetails.production_companies || [],
        seasons: animeDetails.seasons || null,
        status: animeDetails.status || "",
        vote_average: animeDetails.vote_average,
        vote_count: animeDetails.vote_count,
        all_videos: videos || [],
        casts: casts || [],
      });

      console.log("Anime details fetched successfully:", selectedAnime);
    } catch (error) {
      console.error("Error fetching anime details:", error);
      alert("Failed to fetch detailed anime information. Please try again.");
    }
  };

  const handleSave = () => {
    saveToAnime();
  };

  const saveToAnime = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      alert("No access token found. Please log in.");
      return;
    }

    if (!selectedAnime) {
      alert("Please search and select an anime.");
      return;
    }

    if (!selectedAnime.poster_path || !selectedAnime.backdrop_path) {
      alert("Selected anime must have a poster and backdrop.");
      return;
    }

    const data = {
      tmdbId: selectedAnime?.id,
      adult: selectedAnime?.adult,
      backdrop_path: selectedAnime?.backdrop_path || null,
      episode_run_time: selectedAnime?.episode_run_time || null,
      first_air_date: selectedAnime?.first_air_date || null,
      genres: selectedAnime?.genres || null,
      homepage: selectedAnime?.homepage || null,
      origin_country: selectedAnime?.origin_country || null,
      original_language: selectedAnime?.original_language || null,
      original_name: selectedAnime?.original_name || null,
      name: selectedAnime?.name || null,
      overview: selectedAnime?.overview || null,
      popularity: selectedAnime?.popularity || null,
      poster_path: selectedAnime?.poster_path || null,
      production_companies: selectedAnime?.production_companies || null,
      seasons: selectedAnime?.seasons || null,
      status: selectedAnime?.status || null,
      vote_average: selectedAnime?.vote_average || null,
      vote_count: selectedAnime?.vote_count || null,
    };

    axios({
      method: "post",
      url: "/animeCrud.php",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("Response:", response);
        alert("Success");
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving data");
      });
  };

  const handleSelect = (item, type) => {
    setSelectedItem({ ...item, type });
    setSelectedAnime({ ...selectedAnime, [`${type}`]: item });
    console.log(selectedAnime);
  };

  const totalPages = Math.ceil(searchedAnimeList.length / pageSize);

  return (
    <>
      <div className="animeFormCont">
        <h1>{animeId !== undefined ? "Edit " : "Create "} anime</h1>

        {animeId === undefined && (
          <>
            <div className="search-container">
              Search anime:{" "}
              <input
                type="text"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
              <div className="">
                {getCurrentPageItems().map((anime) => (
                  <p key={anime.id} onClick={() => handleSelectanime(anime)}>
                    {anime.name || anime.title}
                  </p>
                ))}
              </div>
            </div>

            {searchedAnimeList.length > 0 && (
              <>
                <div className="pagination">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
                <hr />
              </>
            )}
          </>
        )}

        <div className="container">
          <form>
            {selectedAnime ? (
              <>
                <img
                  src={selectedAnime.backdrop_path}
                  alt={selectedAnime.name}
                  width="300"
                />
                <img
                  className="poster-image"
                  src={`https://image.tmdb.org/t/p/original/${selectedAnime.poster_path}`}
                  alt={selectedAnime.original_title}
                />
              </>
            ) : (
              ""
            )}
            <div className="field">
              Title:
              <input
                type="text"
                disabled={!animeId}
                value={
                  selectedAnime ? selectedAnime.title || selectedAnime.name : ""
                }
                onChange={(e) =>
                  setSelectedAnime({
                    ...selectedAnime,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Overview:
              <textarea
                disabled={!animeId}
                rows={10}
                value={selectedAnime ? selectedAnime.overview : ""}
                onChange={(e) =>
                  setSelectedAnime({
                    ...selectedAnime,
                    overview: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Popularity:
              <input
                type="text"
                disabled={!animeId}
                value={selectedAnime ? selectedAnime.popularity : ""}
                onChange={(e) =>
                  setSelectedAnime({
                    ...selectedAnime,
                    popularity: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Release Date:
              <input
                type="text"
                disabled={!animeId}
                value={
                  selectedAnime
                    ? selectedAnime.release_date || selectedAnime.first_air_date
                    : ""
                }
                onChange={(e) =>
                  setSelectedAnime({
                    ...selectedAnime,
                    release_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Vote Average:
              <input
                type="text"
                disabled={!animeId}
                value={selectedAnime ? selectedAnime.vote_average : ""}
                onChange={(e) =>
                  setSelectedAnime({
                    ...selectedAnime,
                    vote_average: e.target.value,
                  })
                }
              />
            </div>
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>

      <div>
        <h1>{selectedAnime?.name || "Anime Details"}</h1>

        {/* Videos Section */}
        <div>
          <h2>Videos</h2>
          <div className="videos-list">
            {selectedAnime?.videos?.map((video) => (
              <div key={video.id} className="video-item">
                <p>
                  <strong>{video.name}</strong> ({video.type})
                </p>
                <p>Platform: {video.site}</p>
                <button onClick={() => handleSelect(video, "video")}>
                  Select Video
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Posters Section */}
        <div>
          <h2>Posters</h2>
          <div className="posters-list">
            {selectedAnime?.all_poster_path?.map((poster, index) => (
              <div key={index} className="poster-item">
                <img
                  src={poster.file_path}
                  alt={`Poster ${index}`}
                  width="200"
                />
                <button
                  onClick={() => handleSelect(poster.file_path, "poster_path")}
                >
                  Select Poster
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Backdrops Section */}
        <div>
          <h2>Backdrops</h2>
          <div className="backdrops-list">
            {selectedAnime?.all_backdrop_path?.map((backdrop, index) => (
              <div key={index} className="backdrop-item">
                <img
                  src={backdrop.file_path}
                  alt={`Backdrop ${index}`}
                  width="300"
                />
                <button
                  onClick={() =>
                    handleSelect(backdrop.file_path, "backdrop_path")
                  }
                >
                  Select Backdrop
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {animeId !== undefined && selectedAnime && (
        <div>
          <hr />
          <nav>
            <ul className="tabs">
              <li
                onClick={() => {
                  navigate(`/main/animes/form/${animeId}/cast-and-crews`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/animes/form/${animeId}/videos`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/animes/form/${animeId}/photos`);
                }}
              >
                Photos
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      )}
    </>
  );
};

export default Form;

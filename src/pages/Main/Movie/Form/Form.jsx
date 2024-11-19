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
  let { animeId } = useParams();
  const navigate = useNavigate();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return searchedAnimeList.slice(startIndex, endIndex);
  };

const handleSearch = useCallback(() => {

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
      const totalPages = response.data.total_pages;

      const fetchAllPages = [];
      for (let page = 1; page <= totalPages; page++) {
        await delay(50);

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
            const hasAnimationGenre = item.genre_ids && item.genre_ids.includes(genreAnimationId);
            const isJapanese = item.original_language === 'ja';
            return hasAnimationGenre && isJapanese;
          });

          setsearchedAnimeList(filteredResults);
          console.log("Filtered Results:", filteredResults);

          const fetchAdditionalData = filteredResults.map((item) => {
            const { id, media_type } = item;
            const animeDetailsUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`;
            const videoUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`;
            const castUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}&language=en-US`;

            return axios.all([
              axios.get(animeDetailsUrl),
              axios.get(videoUrl),
              axios.get(castUrl),
            ])
            .then(axios.spread((animeDetails, videoDetails, castDetails) => {
              return {
                ...item,
                videoKey: videoDetails.data.results.length > 0 ? videoDetails.data.results[0].key : null,
                cast: castDetails.data.cast,
              };
            }));
          });

          Promise.all(fetchAdditionalData)
            .then((animesWithAdditionalData) => {
              setsearchedAnimeList(animesWithAdditionalData);
              console.log("animes with Additional Data:", animesWithAdditionalData);
            })
            .catch((error) => {
              console.log("Error fetching additional data:", error);
              alert("Error fetching additional data");
            });
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

  const handleSelectanime = (anime) => {
    setSelectedAnime(anime);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
  
    if (!accessToken) {
      alert("No access token found. Please log in.");
      return;
    }
  
    if (!selectedAnime) {
      alert("Please search and select an anime.");
      return;
    }
  
    const data = {
      adult: selectedAnime.adult,
      backdrop_path: `https://image.tmdb.org/t/p/original/${selectedAnime.backdrop_path}`,
      cast: selectedAnime.cast,
      genre_ids: selectedAnime.genre_ids,
      tmdbId: selectedAnime.id,
      media_type: selectedAnime.media_type,
      name: selectedAnime.title || selectedAnime.name,
      original_language: selectedAnime.original_language,
      original_name: selectedAnime.original_name || selectedAnime.original_title,
      overview: selectedAnime.overview,
      popularity: selectedAnime.popularity,
      poster_path: `https://image.tmdb.org/t/p/original/${selectedAnime.poster_path}`,
      release_date: selectedAnime.release_date || selectedAnime.first_air_date,
      videoKey: selectedAnime.videoKey,
      vote_average: selectedAnime.vote_average,
      vote_count: selectedAnime.vote_count,
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
        console.log(response.data); // Check the actual response data
        console.log("Response:", response);
        alert("Success");
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving data");
      });
  };
  

  useEffect(() => {
    if (animeId) {
      axios.get(`/animes/${animeId}`).then((response) => {
        setAnime(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedAnime(tempData);
      });
    }
  }, []);

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
                  <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
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
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/original/${selectedAnime.poster_path}`}
                alt={selectedAnime.original_title}
              />
            ) : (
              ""
            )}
            <div className="field">
              Title:
              <input
                type="text"
                disabled={!animeId}
                value={selectedAnime ? selectedAnime.title || selectedAnime.name : ""}
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
                  setSelectedAnime({ ...selectedAnime, overview: e.target.value })
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
                value={selectedAnime ? selectedAnime.release_date || selectedAnime.first_air_date : ""}
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

      {animeId !== undefined && selectedAnime && (
        <div>
          <hr />
          <nav>
            <ul className='tabs'>
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

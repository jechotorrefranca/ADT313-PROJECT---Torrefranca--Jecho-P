import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./Form.css";



const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  let { movieId } = useParams();
  const navigate = useNavigate();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return searchedMovieList.slice(startIndex, endIndex);
  };

const handleSearch = useCallback(() => {

  setPage(1);

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const genreAnimationId = 16;

  axios({
    method: "get",
    url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&original_language=ja&api_key=${apiKey}`,
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

          setSearchedMovieList(filteredResults);
          console.log("Filtered Results:", filteredResults);

          const fetchAdditionalData = filteredResults.map((item) => {
            const { id, media_type } = item;
            const movieDetailsUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`;
            const videoUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`;
            const castUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}&language=en-US`;

            return axios.all([
              axios.get(movieDetailsUrl),
              axios.get(videoUrl),
              axios.get(castUrl),
            ])
            .then(axios.spread((movieDetails, videoDetails, castDetails) => {
              return {
                ...item,
                videoKey: videoDetails.data.results.length > 0 ? videoDetails.data.results[0].key : null,
                cast: castDetails.data.cast,
              };
            }));
          });

          Promise.all(fetchAdditionalData)
            .then((moviesWithAdditionalData) => {
              setSearchedMovieList(moviesWithAdditionalData);
              console.log("Movies with Additional Data:", moviesWithAdditionalData);
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

  
  
  

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (selectedMovie === undefined) {
      alert("Please search and select a movie.");
    } else {
      const data = {
        tmdbId: selectedMovie.id,
        title: selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert("Success");
          navigate("/main/movies");
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, []);

  const totalPages = Math.ceil(searchedMovieList.length / pageSize);


  return (
    <>
      <div className="movieFormCont">
        <h1>{movieId !== undefined ? "Edit " : "Create "} Movie</h1>

        {movieId === undefined && (
          <>
            <div className="search-container">
              Search Movie:{" "}
              <input
                type="text"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
              <div className="searched-movie">
                {getCurrentPageItems().map((movie) => (
                  <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                    {movie.name || movie.title}
                  </p>
                ))}
              </div>
            </div>

            {searchedMovieList.length > 0 && (
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
            {selectedMovie ? (
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                alt={selectedMovie.original_title}
              />
            ) : (
              ""
            )}
            <div className="field">
              Title:
              <input
                type="text"
                disabled={!movieId}
                value={selectedMovie ? selectedMovie.original_title : ""}
                onChange={(e) =>
                  setSelectedMovie({
                    ...selectedMovie,
                    original_title: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Overview:
              <textarea
                disabled={!movieId}
                rows={10}
                value={selectedMovie ? selectedMovie.overview : ""}
                onChange={(e) =>
                  setSelectedMovie({ ...selectedMovie, overview: e.target.value })
                }
              />
            </div>
            <div className="field">
              Popularity:
              <input
                type="text"
                disabled={!movieId}
                value={selectedMovie ? selectedMovie.popularity : ""}
                onChange={(e) =>
                  setSelectedMovie({
                    ...selectedMovie,
                    popularity: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Release Date:
              <input
                type="text"
                disabled={!movieId}
                value={selectedMovie ? selectedMovie.release_date : ""}
                onChange={(e) =>
                  setSelectedMovie({
                    ...selectedMovie,
                    release_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              Vote Average:
              <input
                type="text"
                disabled={!movieId}
                value={selectedMovie ? selectedMovie.vote_average : ""}
                onChange={(e) =>
                  setSelectedMovie({
                    ...selectedMovie,
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

      {movieId !== undefined && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className='tabs'>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/cast-and-crews`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/videos`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/photos`);
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

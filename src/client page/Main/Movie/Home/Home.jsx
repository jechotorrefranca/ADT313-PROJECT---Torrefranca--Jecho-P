import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AnimeCards from "../../../../components/AnimeCards/AnimeCards";
import { useMovieContext } from "../../../../context/MovieContext";
import GenreConverter from "../../../../components/GenreConvert/GenreConverter";

const Home = () => {
  const navigate = useNavigate();
  const [featuredAnime, setfeaturedAnime] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const parsedFeaturedGenres = featuredAnime && featuredAnime.genre_ids && featuredAnime.genre_ids !== 'null' ? JSON.parse(featuredAnime.genre_ids) : [];

  const getAnime = () => {
    axios
      .post("/getAnime.php")
      .then((response) => {
        if (response.data.success) {
          const animes = response.data.data;
          setMovieList(animes);

          const randomIndex = Math.floor(Math.random() * animes.length);
          setfeaturedAnime(animes[randomIndex]);

          console.log(animes);
        } else {
          console.error("No animes found");
        }
      })
      .catch((error) => {
        console.error("Error fetching animes:", error);
      });
  };

  useEffect(() => {
    getAnime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (movieList.length) {
        console.log("change movie");
        const random = Math.floor(Math.random() * movieList.length);
        setfeaturedAnime(movieList[random]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [movieList]);

  return (
    <div className="whole">
      <div className="wholeCont">

        {featuredAnime && movieList.length ? (
          <div className="featured-list-container">
            <div className="bdTextCont">
              <div className="featured-movie-title">{featuredAnime.name}</div>
              
              <div className="genreList">

                {parsedFeaturedGenres.map((genre, index) => (
                  <div className="genreFeatured" key={index}>
                      <GenreConverter genreNumber={genre}/>
                  </div>

                ))}
              </div>
            </div>

            <div className="backdropExtra" />
            <div
              className="featured-backdrop"
              style={{
                background: `
                  linear-gradient(to top, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  linear-gradient(to right, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 65%),
                  linear-gradient(to bottom, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  linear-gradient(to left, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  url(${featuredAnime.backdrop_path}) no-repeat center top`,
              }}
            >
            </div>
          </div>
        ) : (
          <div className="featured-list-container-loader"></div>
        )}
        <div className="list-container">
          {movieList.map((movie) => (
            <div key={movie.id}>
              <AnimeCards
                movie={movie}
                onClick={() => {
                  navigate(`/view/${movie.id}`);
                  setMovie(movie);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

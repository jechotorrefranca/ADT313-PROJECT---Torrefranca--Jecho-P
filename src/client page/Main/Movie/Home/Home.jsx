import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AnimeCards from "../../../../components/AnimeCards/AnimeCards";
import { useAnimeContext } from "../../../../context/AnimeContext";
import GenreConverter from "../../../../components/GenreConvert/GenreConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faCirclePlay,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [featuredNumber, setFeaturedNumber] = useState(null);
  const [animeIndex, setAnimeIndex] = useState(9);
  const [isSliding, setIsSliding] = useState(false);
  const {
    animeList,
    favoriteAnimeList,
    ratedAnimeList,
    featuredAnimeList,
    popularAnimeList,
  } = useAnimeContext();

  const parsedFeaturedGenres =
    featuredAnime &&
    featuredAnime.genre_ids &&
    featuredAnime.genre_ids !== "null"
      ? JSON.parse(featuredAnime.genre_ids)
      : [];

  useEffect(() => {
    if (featuredAnimeList.length) {
      setFeaturedAnime(featuredAnimeList[animeIndex]);
      setFeaturedNumber(animeIndex + 1);
    }

    let index = animeIndex;
    const interval = setInterval(() => {
      if (featuredAnimeList.length) {
        index = index === 0 ? featuredAnimeList.length - 1 : index - 1;
        setAnimeIndex(index);
        setFeaturedAnime(featuredAnimeList[index]);
        setFeaturedNumber(index + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [animeIndex, featuredAnimeList]);

  const handleSlide = (direction) => {
    if (isSliding) return;
    setIsSliding(true);
    let newIndex = animeIndex + direction;

    if (newIndex < 0) newIndex = featuredAnimeList.length - 1;
    if (newIndex >= featuredAnimeList.length) newIndex = 0;

    setAnimeIndex(newIndex);
    setFeaturedAnime(featuredAnimeList[newIndex]);
    setFeaturedNumber(newIndex + 1);

    setTimeout(() => setIsSliding(false), 100);
  };

  return (
    <div className="whole">
      <div className="wholeCont">
        {featuredAnime && featuredAnimeList.length ? (
          <div className="featured-list-container">
            <div className="featuredArrow left" onClick={() => handleSlide(1)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>

            <div className={`bdTextCont ${isSliding ? "sliding" : ""}`}>
              <div className="featuredNumber">{`#${featuredNumber} Featured`}</div>

              <div className="featured-movie-title">{featuredAnime.name}</div>

              <div className="featuredDetails">
                <span className="featuredSpan">
                  <FontAwesomeIcon
                    icon={faCirclePlay}
                    className="featuredPlay"
                  />{" "}
                  {featuredAnime.episode_run_time ? "TV" : "MOVIE"}
                </span>

                <span>
                  <FontAwesomeIcon icon={faCalendar} className="featuredDate" />{" "}
                  {featuredAnime.release_date}
                </span>

                <span>
                  <FontAwesomeIcon icon={faStar} className="featuredStar" />{" "}
                  {featuredAnime.vote_average}
                </span>
              </div>

              <div className="genreList">
                {parsedFeaturedGenres.map((genre, index) => (
                  <div className="genreFeatured" key={index}>
                    <GenreConverter genreNumber={genre} />
                  </div>
                ))}
              </div>

              <div className="featuredOverview">
                {featuredAnime.overview
                  .split(" ")
                  .slice(0, 40)
                  .join(" ")
                  .concat("...")}
              </div>

              <div
                className="featuredDetailButton"
                onClick={() => {
                  navigate(`/view/${featuredAnime.id}`);
                }}
              >
                <p>Detail</p>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="featuredRight"
                />
              </div>
            </div>

            <div className="backdropExtra" />
            <div
              className="featured-backdrop"
              style={{
                background: `linear-gradient(to top, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  linear-gradient(to right, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 65%),
                  linear-gradient(to bottom, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  linear-gradient(to left, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 20%),
                  url(${featuredAnime.backdrop_path}) no-repeat center top`,
              }}
            ></div>

            <div
              className="featuredArrow right"
              onClick={() => handleSlide(-1)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        ) : (
          <div className="featured-list-container-loader"></div>
        )}

        <div className="animeTitle">
          <p>Top Anime</p>
        </div>

        <div className="ratedAnimeList">
          {ratedAnimeList.map((anime, index) => (
            <div key={anime.id}>
              <AnimeCards
                anime={anime}
                place={index + 1}
                onClick={() => {
                  navigate(`/view/${anime.id}`);
                }}
              />
            </div>
          ))}
        </div>

        <div className="lovedAnimeList"></div>

        <div className="popularAnimeList"></div>

        {/* <div className="list-container">
          {animeList.map((anime) => (
            <div key={anime.id}>
              <AnimeCards
                anime={anime}
                onClick={() => {
                  navigate(`/view/${anime.id}`);
                }}
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Home;

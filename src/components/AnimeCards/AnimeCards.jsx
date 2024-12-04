import "./AnimeCards.css";
import GenreConverter from "../GenreConvert/GenreConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

function AnimeCards({ anime, onClick, place }) {
  const parsedFeaturedGenres =
    anime && anime.genre_ids && anime.genre_ids !== "null"
      ? JSON.parse(anime.genre_ids)
      : [];

  return (
    <div className="whole-card-content">
      <div className="card-content">
        <div className="animeName">
          {anime.name.length > 25
            ? anime.name.slice(0, 20) + "..."
            : anime.name}
        </div>

        <div className="animeNumber">{place}</div>
      </div>
      <div className="card" onClick={onClick}>
        <img
          src={anime.poster_path}
          alt={anime.name}
          className="animePosterCardImg"
        />
        <div className="hoverModal">
          <div className="modalDetailsCont">
            <div className="movDet">
              <div>
                <strong>{anime.name}</strong>
              </div>

              <div className="starType">
                <div>
                  <FontAwesomeIcon icon={faStar} className="featuredStar" />
                  <span>{anime.vote_average}</span>
                </div>

                <div>
                  <FontAwesomeIcon
                    icon={faCirclePlay}
                    className="featuredPlay"
                  />
                  <span>{anime.episode_run_time ? "TV" : "MOVIE"}</span>
                </div>
              </div>

              <div className="some">Japanese: {anime.original_name}</div>
              <div className="some">Aired: {anime.release_date}</div>

              <div className="some">
                <div>Genres:</div>
                <div>
                  {" "}
                  {parsedFeaturedGenres.map((genre, index) => (
                    <span key={index}>
                      <GenreConverter genreNumber={genre} />
                      {index < parsedFeaturedGenres.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCards;

import "./AnimeCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faCirclePlay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function AnimeCards({ anime, onClick, place }) {
  const parsedFeaturedGenres =
    anime && anime.genres !== "null" ? JSON.parse(anime.genres) : [];

  const parsedSeasons =
    anime && anime.seasons !== "null" ? JSON.parse(anime.seasons) : [];

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

                {anime.episode_run_time && (
                  <div>
                    <FontAwesomeIcon icon={faClock} className="featuredClock" />
                    <span>{anime.episode_run_time}m</span>
                  </div>
                )}
              </div>

              <div className="some">Japanese: {anime.original_name}</div>
              <div className="some">Aired: {anime.first_air_date}</div>

              {parsedSeasons && parsedSeasons.length > 0 && (
                <div className="some">Seasons: {parsedSeasons.length}</div>
              )}

              <div className="some">
                <div>Genres:</div>
                <div dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></div>
                <div>
                  {parsedFeaturedGenres.map((genre, index) => {
                    return (
                      <div key={index}>
                        <span key={index}>{genre.name}</span>
                        {index < parsedFeaturedGenres.length - 1 && ", "}
                      </div>
                    );
                  })}
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

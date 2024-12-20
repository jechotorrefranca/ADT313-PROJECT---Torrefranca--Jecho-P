import { useEffect, useState } from "react";
import { useAnimeContext } from "../../../../context/AnimeContext";
import { useNavigate, useParams } from "react-router-dom";
import "./View.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faCirclePlay,
  faAngleRight,
  faAngleLeft,
  faClock,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import GenreConverter from "../../../../components/GenreConvert/GenreConverter";

function View() {
  const { anime, fetchAnimeById, setAnime } = useAnimeContext();
  const { animeId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const images = anime?.images || [];
  const imagesToShow = images.slice(0, 6); // First 5 images
  const remainingImagesCount = images.length > 5 ? images.length - 6 : 0;

  useEffect(() => {
    if (!animeId) return;

    setAnime(null);

    fetchAnimeById(animeId, navigate).then((anime) => {
      setAnime(anime);
      console.log(anime);
    });
  }, [animeId, fetchAnimeById, navigate]);

  const parsedSeasons =
    anime?.anime?.seasons && typeof anime.anime.seasons === "string"
      ? JSON.parse(anime.anime.seasons || "[]") // Default to an empty array if null
      : Array.isArray(anime?.anime?.seasons)
      ? anime.anime.seasons
      : [];

  const parsedComp =
    anime?.anime?.production_companies &&
    typeof anime.anime.production_companies === "string"
      ? JSON.parse(anime.anime.production_companies)
      : anime?.anime?.production_companies || [];

  console.log(parsedComp);

  const parsedCast =
    anime && anime.cast && anime.cast !== "null" ? JSON.parse(anime.cast) : [];

  return (
    <div className="AnimeDetMain">
      {anime && (
        <>
          <div className="viewWhole">
            <div className="bdMainCont">
              <div className="featured-list-containers">
                <div className={`bdTextConts`}>
                  <div className="featured-movie-titles">
                    {anime.anime.name}
                  </div>

                  <div className="featuredDetailss">
                    <span>
                      <span>
                        <FontAwesomeIcon
                          icon={faCirclePlay}
                          className="featuredPlay"
                        />{" "}
                        {anime.anime.seasons !== "null" ? "TV" : "MOVIE"}
                      </span>
                    </span>

                    <span>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="featuredDate"
                      />{" "}
                      {anime.anime.first_air_date}
                    </span>

                    {anime.anime.episode_run_time && (
                      <span>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="featuredClock"
                        />{" "}
                        {anime.anime.episode_run_time}m
                      </span>
                    )}

                    <span>
                      <FontAwesomeIcon icon={faStar} className="featuredStar" />{" "}
                      {anime.anime.vote_average}
                    </span>
                  </div>

                  <GenreConverter genres={anime.anime.genres} />
                </div>

                <div
                  className="featured-backdrops"
                  style={{
                    background: `linear-gradient(to top, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 10%),
                  linear-gradient(to right, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0.6) 10%),
                  linear-gradient(to bottom, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 10%),
                  linear-gradient(to left, rgba(23, 23, 23, 1) 0%, rgba(23, 23, 23, 0) 10%),
                  url(https://image.tmdb.org/t/p/original${anime.anime.backdrop_path}) no-repeat center top`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </div>
            </div>

            <div className="heroSection">
              <div className="heroContent">
                <div className="posterContainer">
                  <img
                    src={`https://image.tmdb.org/t/p/original${anime.anime.poster_path}`}
                    alt={anime.anime.name}
                    className="animePoster"
                  />
                </div>
                <div className="titleContainer">
                  <div className="animeDetails">
                    <div className="synopsis">Synopsis</div>
                    <div className="animeOverview">{anime.anime.overview}</div>
                  </div>
                  <div className="linee" />
                  <div>
                    <div className="otherDet">
                      <strong className="strongText">JA: </strong>{" "}
                      <span>{anime.anime.original_name}</span>
                    </div>
                    <div className="otherDet">
                      <strong className="strongText">Release Date: </strong>{" "}
                      <span>{anime.anime.first_air_date}</span>
                    </div>
                    <div className="otherDet">
                      <strong className="strongText">Seasons: </strong>{" "}
                      <span>{parsedSeasons?.length || 0}</span>
                    </div>
                    {anime.anime.homepage && (
                      <div className="otherDet">
                        <strong className="strongText">Page: </strong>{" "}
                        <a
                          href={anime.anime.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {anime.anime.homepage}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="titlePlaceholder">
              <div className="titletext">
                <h2>Trailer:</h2>
              </div>
            </div>

            {anime.videos && (
              <div className="videoSection">
                <iframe
                  className="iframe"
                  src={`https://www.youtube.com/embed/${anime?.videos[0].key}`}
                  title="Anime Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="titlePlaceholder">
              <div className="titletext">
                <h2>Cast:</h2>
              </div>
            </div>

            <div className="wholeCastSect">
              <div className="castSection">
                {anime.casts.length > 0 ? (
                  <div className="castGrid">
                    {anime.casts.map((castMember, index) => (
                      <div key={index} className="castCard">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                          alt={castMember.name}
                          className="castImage"
                        />
                        <div className="castInfo">
                          <strong>{castMember.name}</strong>
                          <div>as</div>
                          <strong>{castMember.characterName}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No cast information available.</p>
                )}
              </div>
            </div>

            <div className="titlePlaceholder">
              <div className="titletext">
                <h2>Media:</h2>
              </div>
            </div>

            <div className="mediaSection">
              <div className="mediaSec">
                {anime.images.length > 0 ? (
                  <div className="imageGallery">
                    {imagesToShow.map((image, index) => (
                      <div key={index} className="galleryItem">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
                          alt={image.name}
                          className="mediaImage"
                        />
                      </div>
                    ))}

                    {remainingImagesCount > 0 && (
                      <div
                        className="viewMore"
                        onClick={handleModalOpen}
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/w200${anime.images[6]?.file_path})`,
                        }}
                      >
                        <span>+{remainingImagesCount}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No media available.</p>
                )}
              </div>

              {showModal && (
                <div className="modal">
                  <div className="modalContent">
                    <button className="closeButton" onClick={handleModalClose}>
                      Close
                    </button>
                    <div className="allImages">
                      {anime.images.map((image, index) => (
                        <div key={index} className="modalImageItem">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                            alt={image.name}
                            className="modalImage"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="titlePlaceholder">
              <div className="titletext">
                <h2>Production Companies:</h2>
              </div>
            </div>

            <div className="flexComp">
              <div className="productionCompaniesSection">
                <div className="productionCompaniesGrid">
                  {parsedComp.length > 0 ? (
                    parsedComp.map((company) => (
                      <div key={company.id} className="productionCompanyCard">
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="companyLogo"
                          />
                        )}
                        <div className="companyInfo">
                          <h3 className="compName">{company.name}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No production companies available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default View;

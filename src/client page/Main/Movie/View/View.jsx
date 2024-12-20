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
  faTimes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import GenreConverter from "../../../../components/GenreConvert/GenreConverter";
import ShowImage from "../../../../components/View/ShowImage";
import axios from "axios";

function View() {
  const { anime, fetchAnimeById, setAnime, userData } = useAnimeContext();
  const { animeId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showFullMedia, setShowFullMedia] = useState(false);
  const [fullImage, setFullImage] = useState();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    if (!animeId) return;

    const fetchComments = () => {
      axios({
        method: "post",
        url: "/getComments.php",
        data: { animeId: animeId },
      })
        .then((response) => {
          if (response.data.success) {
            const sortedComments = response.data.data.sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            });
            setComments(sortedComments);
          } else {
            setComments([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching comments:", err);
        });
    };

    fetchComments();
  }, [animeId, commentAdded]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const images = anime?.images || [];
  const imagesToShow = images.slice(0, 6);
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
      ? JSON.parse(anime.anime.seasons || "[]")
      : Array.isArray(anime?.anime?.seasons)
      ? anime.anime.seasons
      : [];

  const parsedComp =
    anime?.anime?.production_companies &&
    typeof anime.anime.production_companies === "string"
      ? JSON.parse(anime.anime.production_companies)
      : anime?.anime?.production_companies || [];

  const parsedCast =
    anime && anime.cast && anime.cast !== "null" ? JSON.parse(anime.cast) : [];

  const handleClickImage = (image) => {
    setFullImage(image);
    setShowFullMedia(true);
    console.log(showFullMedia);
    console.log(image);
  };

  const handleSetShowFullMedia = () => {
    setShowFullMedia(false);
  };

  const handleCommentSubmit = () => {
    console.log("Submitting comment for anime ID:", animeId);

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const commentData = {
      anime_id: animeId,
      user_id: userData.userId,
      user_name: userData.firstName + " " + userData.lastName || "User Unknown",
      pfp: userData.pfp || "https://via.placeholder.com/50",
      comment_text: newComment.trim(),
    };

    axios({
      method: "post",
      url: "/commentsCrud.php",
      data: commentData,
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    })
      .then((response) => {
        console.log("Comment submitted successfully:", response);
        setNewComment("");
        setCommentAdded((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
        alert("Error submitting comment.");
      });
  };

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

                    {anime.anime.episode_run_time &&
                    anime.anime.episode_run_time !== 0 ? (
                      <span>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="featuredClock"
                        />{" "}
                        {anime.anime.episode_run_time}m
                      </span>
                    ) : null}

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
                      <div
                        key={index}
                        className="galleryItem"
                        onClick={() => handleClickImage(image)}
                      >
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
                    <div className="closeButtonContainer">
                      <button
                        className="closeButton"
                        onClick={handleModalClose}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                    <div className="allImages">
                      {anime.images.map((image, index) => (
                        <div
                          key={index}
                          className="modalImageItem"
                          onClick={() => handleClickImage(image)}
                        >
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

      {showFullMedia && (
        <ShowImage
          image={fullImage}
          setShowFullMedia={handleSetShowFullMedia}
        />
      )}

      <div className="lineBreakCont">
        <hr className="lineBreak" />
      </div>

      <div className="commentsSection">
        <div className="titlePlaceholder">
          <div className="titletext">
            <h2>Comments</h2>
          </div>
        </div>

        <div className="comWholeCont">
          <div className="comCont">
            {userData.accessToken ? (
              <div className="commentInputSection">
                <img
                  src={userData.pfp || "https://via.placeholder.com/50"}
                  alt="User"
                  className="userPfp"
                />
                <textarea
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="commentInput"
                />
                <button onClick={handleCommentSubmit} className="commentButton">
                  {" "}
                  <FontAwesomeIcon icon={faPaperPlane} className="planeIcon" />
                </button>
              </div>
            ) : (
              <div className="loginPrompt">
                <p>You must be logged in to post a comment.</p>
              </div>
            )}

            <div className="commentsList">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="commentCard">
                    <div className="pfpNameDateCol">
                      <div className="pandName">
                        <img
                          src={comment.pfp}
                          alt={`${comment.name}`}
                          className="commentPfp"
                        />
                        <p className="commentAuthor">{comment.name}</p>
                      </div>
                      <div>
                        <div className="commentHeader">
                          <span className="commentDate">
                            {new Date(comment.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="commentContent">
                      <p className="commentText">{comment.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="noComments">
                  <p className="noCommentsMessage">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;

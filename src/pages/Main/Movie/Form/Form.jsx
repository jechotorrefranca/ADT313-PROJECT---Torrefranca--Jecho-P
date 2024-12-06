import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./Form.css";
import { useAnimeContext } from "../../../../context/AnimeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedAnimeList, setsearchedAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(undefined);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const { accessToken, userId, fetchAnimeById, anime, setAnime } =
    useAnimeContext();
  let { animeId } = useParams();
  const navigate = useNavigate();

  let data = {
    key: selectedVideo.key || "",
    name: selectedVideo.name || "",
    site: selectedVideo.site || "Youtube",
    type: selectedVideo.type || "Custom Video",
  };

  // console.log("selectedvid", data);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!animeId) return;

    fetchAnimeById(animeId, navigate).then((anime) => {
      if (anime) {
        setSelectedAnime({
          tmdbId: anime?.id,
          adult: anime?.adult,
          backdrop_path: anime?.backdrop_path,
          episode_run_time: anime?.episode_run_time,
          first_air_date: anime?.first_air_date,
          genres: anime?.genres,
          homepage: anime?.homepage,
          origin_country: anime?.origin_country,
          original_language: anime?.original_language,
          original_name: anime?.original_name,
          name: anime?.name,
          overview: anime?.overview,
          popularity: anime?.popularity,
          poster_path: anime?.poster_path,
          production_companies: anime?.production_companies,
          seasons: anime?.seasons,
          status: anime?.status,
          vote_average: anime?.vote_average,
          vote_count: anime?.vote_count,
        });
      }
    });
  }, [animeId, fetchAnimeById, navigate]);

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
    setSelectedAnime(null);
    setSelectedVideo({
      key: "",
      name: "",
      site: "Youtube",
      type: "Custom Video",
    });

    try {
      const { data: animeDetails } = await axios.get(
        `https://api.themoviedb.org/3/${anime.media_type}/${anime.id}?api_key=${apiKey}`
      );

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

    if (!selectedVideo.key || !selectedVideo.name) {
      alert("Selected anime must have a Video and Name");
      return;
    }

    const data = {
      id: animeId,
      tmdbId: selectedAnime?.id,
      adult: selectedAnime?.adult,
      backdrop_path: selectedAnime?.backdrop_path || null,
      episode_run_time:
        Array.isArray(selectedAnime?.episode_run_time) &&
        selectedAnime?.episode_run_time.length > 0
          ? selectedAnime.episode_run_time[0]
          : selectedAnime?.episode_run_time || null,
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
      method: animeId ? "patch" : "post",
      url: "/animeCrud.php",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("Anime saved successfully:", response);
        const savedAnimeId = response?.data?.id || animeId;
        console.log("iddddd", response.data.id);
        saveToVideo(savedAnimeId);
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving anime data");
      });
  };

  const saveToVideo = (id) => {
    if (!selectedVideo) {
      alert("No video data to save.");
      return;
    }

    const videoData = {
      animeId: id,
      key: selectedVideo.key || "",
      name: selectedVideo.name || "",
      site: selectedVideo.site || "Youtube",
      type: selectedVideo.type || "Custom Video",
    };

    axios({
      method: animeId ? "patch" : "post",
      url: "/videosCrud.php",
      data: videoData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("Video saved successfully:", response);
        alert("Anime and video saved successfully.");
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving video data");
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
        <h1 className="titleForm">
          {animeId !== undefined ? "Edit " : "Add "} Anime
        </h1>

        {animeId === undefined && (
          <>
            <div className="search-container">
              <div className="searchBarCont">
                <div className="searchBar">
                  <div className="searchBarDes">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                      type="text"
                      placeholder="Search Anime"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <div className="searchBarButton" onClick={handleSearch}>
                    Search
                  </div>
                </div>
              </div>
              <div className="searchWholeCont">
                <div className="searchedMovie">
                  {getCurrentPageItems().map((anime) => (
                    <div key={anime.id}>
                      <div className="searchedMovieCont">
                        <img
                          className="searchedPosterImage"
                          src={
                            anime.poster_path
                              ? `https://image.tmdb.org/t/p/original/${anime.poster_path}`
                              : "https://via.placeholder.com/500x750?text=No+Image+Available"
                          }
                          alt={anime.original_title || "No Title Available"}
                        />

                        <p>{anime.name || anime.title}</p>
                        <div
                          className="searchedAnimeButton"
                          onClick={() => handleSelectanime(anime)}
                        >
                          Select
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {searchedAnimeList.length > 0 && (
              <div className="paginationCont">
                <div className="pagination">
                  <button
                    className="paginationArrow"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    className="paginationArrow"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <hr className="lineBreak" />

        {selectedAnime && (
          <div>
            <div className="previewContainer">
              <div className="preview">
                <div className="previewContText">
                  <p className="previewText">Preview</p>
                </div>
                <div className="previewImages">
                  <img
                    src={
                      selectedAnime.backdrop_path
                        ? selectedAnime.backdrop_path
                        : "https://via.placeholder.com/800x450?text=No+Backdrop+Available"
                    }
                    alt={selectedAnime.original_title}
                    className="previewBD"
                  />

                  <div className="previewP">
                    <img
                      className="previewImg"
                      src={
                        selectedAnime?.poster_path
                          ? `https://image.tmdb.org/t/p/original/${selectedAnime.poster_path}`
                          : "https://via.placeholder.com/200x300?text=No+Image+Available"
                      }
                      alt={selectedAnime.original_title}
                    />

                    <div className="previewTextsCont">
                      <p>Title</p>
                      <textarea
                        className="previewTitle"
                        disabled={!animeId}
                        value={
                          selectedAnime
                            ? selectedAnime.title || selectedAnime.name
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedAnime({
                            ...selectedAnime,
                            name: e.target.value,
                          })
                        }
                      />
                      <p>Popularity</p>
                      <input
                        className="previewInputs"
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
                      <p>Release Date</p>
                      <input
                        className="previewInputs"
                        type="text"
                        disabled={!animeId}
                        value={
                          selectedAnime
                            ? selectedAnime.release_date ||
                              selectedAnime.first_air_date
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedAnime({
                            ...selectedAnime,
                            first_air_date: e.target.value,
                          })
                        }
                      />
                      <p>Vote Average</p>
                      <input
                        className="previewInputs"
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
                  </div>
                </div>

                <div className="overviewCont">
                  <div className="overviewtext">
                    <p>Overview</p>
                  </div>

                  <textarea
                    className="previewOverview"
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

                <div className="overviewCont">
                  {selectedVideo && selectedVideo.key ? (
                    <>
                      <div className="video-wrapper">
                        {selectedVideo.key !== "" && (
                          <>
                            <div className="overviewtext">
                              <p>Trailer</p>
                            </div>
                            <iframe
                              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
                              title={selectedVideo.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </>
                        )}
                      </div>

                      <div className="previewVideMain">
                        <p className="prevVidTitle">Customize Video</p>
                        <div className="previewVideoDes">
                          <p>Youtube Key</p>
                          <input
                            className="previewInputs"
                            type="text"
                            // disabled={!animeId}
                            value={selectedVideo.key}
                            onChange={(e) =>
                              setSelectedVideo({
                                ...selectedVideo,
                                key: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="previewVideoDes">
                          <p>Video Name</p>
                          <input
                            className="previewInputs"
                            type="text"
                            // disabled={!animeId}
                            value={selectedVideo.name}
                            onChange={(e) =>
                              setSelectedVideo({
                                ...selectedVideo,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="video-wrapper">
                        {selectedVideo.key !== "" && (
                          <>
                            <div className="overviewtext">
                              <p>Trailer</p>
                            </div>
                            <iframe
                              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
                              title={selectedVideo.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </>
                        )}
                      </div>

                      <div className="previewVideMain">
                        <p className="prevVidTitle">Customize Video</p>
                        <div className="previewVideoDes">
                          <p>Youtube Key</p>
                          <input
                            className="previewInputs"
                            type="text"
                            // disabled={!animeId}
                            value={selectedVideo.key}
                            onChange={(e) =>
                              setSelectedVideo({
                                ...selectedVideo,
                                key: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="previewVideoDes">
                          <p>Video Name</p>
                          <input
                            className="previewInputs"
                            type="text"
                            // disabled={!animeId}
                            value={selectedVideo.name}
                            onChange={(e) =>
                              setSelectedVideo({
                                ...selectedVideo,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="overviewCont">
                  <div className="overviewtext">
                    <p>Casts</p>
                  </div>

                  <textarea
                    className="previewOverview"
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

                <div className="overviewCont">
                  <div className="overviewtext">
                    <p>Media</p>
                  </div>

                  <textarea
                    className="previewOverview"
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
              </div>
              <div className="vertical-line"></div>

              <div className="objectSelect">
                <div className="mediaCont">
                  <div className="videoTextCont">
                    <p>Customization</p>
                  </div>
                  <div>
                    <div className="sectionTitleCont">
                      <p className="sectionTitle">Video</p>
                    </div>
                    <div className="videos-list">
                      {selectedAnime &&
                      selectedAnime.all_videos &&
                      selectedAnime.all_videos.length > 0 ? (
                        selectedAnime.all_videos.map((video) => (
                          <div className="videosCont" key={video.id}>
                            <p>{video.name}</p>
                            <div className="videolist">
                              <div className="video-preview">
                                <iframe
                                  width="280"
                                  height="158"
                                  src={`https://www.youtube.com/embed/${video.key}`}
                                  title={video.name}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <button
                                className="videoButton"
                                onClick={() => {
                                  setSelectedVideo(video);
                                }}
                              >
                                Select Video
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No videos found</p>
                      )}
                    </div>

                    <div className="sectionTitleCont">
                      <p className="sectionTitle">Poster</p>
                    </div>

                    <div className="videos-list2">
                      {selectedAnime &&
                      selectedAnime.all_poster_path &&
                      selectedAnime.all_poster_path.length > 0 ? (
                        selectedAnime.all_poster_path.map((poster, index) => (
                          <div className="videosCont" key={index}>
                            <p>{poster.name}</p>
                            <div className="videolist">
                              <div className="video-preview">
                                <img
                                  src={poster.file_path}
                                  alt={`Poster ${index}`}
                                  width="200"
                                />
                              </div>
                              <button
                                className="videoButton"
                                onClick={() => {
                                  handleSelect(poster.file_path, "poster_path");
                                }}
                              >
                                Select Poster
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Posters found</p>
                      )}
                    </div>

                    <div className="sectionTitleCont">
                      <p className="sectionTitle">Backdrop</p>
                    </div>

                    <div className="videos-list2">
                      {selectedAnime &&
                      selectedAnime.all_backdrop_path &&
                      selectedAnime.all_backdrop_path.length > 0 ? (
                        selectedAnime.all_backdrop_path.map(
                          (backdrop, index) => (
                            <div className="videosCont" key={index}>
                              <p>{backdrop.name}</p>
                              <div className="video-preview">
                                <img
                                  src={backdrop.file_path}
                                  alt={`Backdrop ${index}`}
                                  width="300"
                                />
                              </div>
                              <button
                                className="videoButton"
                                onClick={() => {
                                  handleSelect(
                                    backdrop.file_path,
                                    "backdrop_path"
                                  );
                                }}
                              >
                                Select Backdrop
                              </button>
                            </div>
                          )
                        )
                      ) : (
                        <p>No Backdrop found</p>
                      )}
                    </div>
                  </div>
                </div>
                <div></div>

                <div className="saveButtonCont">
                  <button
                    className="videoButton2"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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

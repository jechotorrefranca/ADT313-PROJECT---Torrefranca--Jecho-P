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
  const [selectedCasts, setSelectedCasts] = useState([]);
  const [currentAnimeData, setCurrentAnimeData] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [realId, setRealId] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [newSelectedImages, setNewSelectedImages] = useState([]);
  const {
    userData,
    userId,
    fetchAnimeById,
    anime,
    setAnime,
    castCollection,
    fetchAnimeByIdCasts,
    fetchAnimeByIdImages,
    imageCollection,
  } = useAnimeContext();
  let { animeId } = useParams();
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAddImage = (image) => {
    if (animeId) {
      setNewSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        image,
      ]);
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
      console.log("Image added to new selected images:", newSelectedImages);
    } else {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
      console.log("Image added to selected images:", selectedImages);
    }
  };

  useEffect(() => {
    if (castCollection.length > 0) {
      setSelectedCasts(castCollection);
    }
  }, [castCollection]);

  useEffect(() => {
    if (imageCollection.length > 0) {
      setSelectedImages(imageCollection);
    }
  }, [imageCollection]);

  useEffect(() => {
    if (!animeId) return;

    fetchAnimeById(animeId, navigate).then((anime) => {
      if (anime) {
        setSelectedAnime({
          tmdbId: anime?.anime.tmdbId,
          adult: anime?.anime.adult,
          backdrop_path: anime?.anime.backdrop_path,
          episode_run_time: anime?.anime.episode_run_time,
          first_air_date: anime?.anime.first_air_date,
          genres: anime?.anime.genres,
          homepage: anime?.anime.homepage,
          origin_country: anime?.anime.origin_country,
          original_language: anime?.anime.original_language,
          original_name: anime?.anime.original_name,
          name: anime?.anime.name,
          overview: anime?.anime.overview,
          popularity: anime?.anime.popularity,
          poster_path: anime?.anime.poster_path,
          production_companies: anime?.anime.production_companies,
          seasons: anime?.anime.seasons,
          status: anime?.anime.status,
          vote_average: anime?.anime.vote_average,
          vote_count: anime?.anime.vote_count,
        });

        if (anime?.videos && anime.videos.length > 0) {
          setSelectedVideo({
            id: anime.videos[0].id,
            key: anime.videos[0].key,
            site: anime.videos[0].site,
            type: anime.videos[0].type,
            name: anime.videos[0].name,
          });

          console.log("dsgndsjkgnds", anime.videos[0]);

          setRealId(anime.videos[0].id);
        } else {
          console.log("No videos found for this anime.");
        }

        fetchAnimeByIdCasts(animeId);
        fetchAnimeByIdImages(animeId);
        setSelectedImages(imageCollection);
        setSelectedCasts(castCollection);
        fetchAndSetAnimeData(anime.anime);
      }
    });
  }, [animeId, fetchAnimeById, navigate]);

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

  const fetchAnimeDetails = async (anime) => {
    try {
      const { data: animeDetails } = await axios.get(
        `https://api.themoviedb.org/3/${
          anime.seasons !== "null" ? "tv" : "movie"
        }/${anime.tmdbId}?api_key=${apiKey}`
      );

      const { data: videoData } = await axios.get(
        `https://api.themoviedb.org/3/${
          anime.seasons !== "null" ? "tv" : "movie"
        }/${anime.tmdbId}/videos?api_key=${apiKey}`
      );
      const videos = videoData.results.map((video) => ({
        id: video.id,
        key: video.key,
        name: video.name,
        type: video.type,
        site: video.site,
      }));

      const { data: creditsData } = await axios.get(
        `https://api.themoviedb.org/3/${
          anime.seasons !== "null" ? "tv" : "movie"
        }/${anime.tmdbId}/credits?api_key=${apiKey}`
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
        `https://api.themoviedb.org/3/${
          anime.seasons !== "null" ? "tv" : "movie"
        }/${anime.tmdbId}/images?api_key=${apiKey}`
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

      return {
        animeDetails,
        videos,
        casts,
        posters,
        backdrops,
      };
    } catch (error) {
      console.error("Error fetching anime details:", error);
      throw error;
    }
  };

  const fetchAndSetAnimeData = async (anime) => {
    try {
      const data = await fetchAnimeDetails(anime);

      const combinedImages = [...data.posters, ...data.backdrops];

      setSelectedAnime((prevAnime) => ({
        ...prevAnime,
        all_videos: data.videos,
        casts: data.casts,
        all_poster_path: data.posters,
        all_backdrop_path: data.backdrops,
      }));

      setAllImages(combinedImages);
    } catch (error) {
      console.error("Failed to set anime data", error);
    }
  };

  const handleDeleteCast = async (castId) => {
    try {
      const response = await axios({
        method: "delete", // or 'post' if your backend expects a POST request
        url: "/castsCrud.php",
        data: {
          id: castId,
        },
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      setSelectedCasts((prevCasts) =>
        prevCasts.filter((cast) => cast.id !== castId)
      );

      fetchAnimeByIdCasts(animeId);
      setSelectedCasts(castCollection);
    } catch (error) {
      console.error("Error while deleting cast:", error);
    }
  };

  const handleDeleteImage = async (imgId) => {
    console.log(imgId);
    try {
      const response = await axios({
        method: "delete", // or 'post' if your backend expects a POST request
        url: "/imagesCrud.php",
        data: {
          id: imgId,
        },
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      // Proceed with removing the cast from the state regardless of the response
      setSelectedImages((prevCasts) =>
        prevCasts.filter((cast) => cast.id !== imgId)
      );

      fetchAnimeByIdImages(animeId);
      setSelectedImages(imageCollection);
    } catch (error) {
      console.error("Error while deleting cast:", error);
    }
  };

  const handleSelectanime = async (anime) => {
    console.log(anime);
    setSelectedImages([]);
    setSelectedCasts([]);
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

      const combinedImages = [...posters, ...backdrops];

      setAllImages(combinedImages);

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
    } catch (error) {
      console.error("Error fetching anime details:", error);
      alert("Failed to fetch detailed anime information. Please try again.");
    }
  };

  const handleSave = () => {
    saveToAnime();
  };

  const saveToAnime = () => {
    if (!userData.accessToken) {
      alert("No access token found. Please log in.");
      return;
    }

    if (!selectedAnime) {
      alert("Please search and select an anime.");
      return;
    }

    if (!selectedAnime.poster_path || !selectedAnime.backdrop_path) {
      const isConfirmed = window.confirm(
        "Selected anime must have a poster and backdrop. Do you want to continue?"
      );
      if (!isConfirmed) {
        return;
      }
    }

    if (!selectedVideo.key || !selectedVideo.name) {
      const isConfirmed = window.confirm(
        "Selected anime must have a Video and Name. Do you want to continue?"
      );
      if (!isConfirmed) {
        return;
      }
    }

    const data = {
      id: animeId,
      tmdbId: selectedAnime?.id,
      adult: selectedAnime?.adult,
      backdrop_path:
        selectedAnime?.backdrop_path ||
        "https://via.placeholder.com/800x450?text=No+Backdrop+Available",
      episode_run_time:
        Array.isArray(selectedAnime?.episode_run_time) &&
        selectedAnime.episode_run_time.length > 0
          ? String(selectedAnime.episode_run_time[0])
          : selectedAnime?.episode_run_time
          ? String(selectedAnime.episode_run_time)
          : null,

      first_air_date: selectedAnime?.first_air_date || null,
      genres: JSON.stringify(selectedAnime?.genres) || null,
      homepage: selectedAnime?.homepage || null,
      origin_country: JSON.stringify(selectedAnime?.origin_country) || null,
      original_language: selectedAnime?.original_language || null,
      original_name: selectedAnime?.original_name || null,
      name: selectedAnime?.name || null,
      overview: selectedAnime?.overview || null,
      popularity: selectedAnime?.popularity || null,
      poster_path:
        selectedAnime?.poster_path ||
        "https://via.placeholder.com/200x300?text=No+Image+Available",
      production_companies:
        JSON.stringify(selectedAnime?.production_companies) || null,
      seasons: JSON.stringify(selectedAnime?.seasons) || null,
      status: selectedAnime?.status || null,
      vote_average: selectedAnime?.vote_average || null,
      vote_count: selectedAnime?.vote_count || null,
    };

    axios({
      method: animeId ? "patch" : "post",
      url: "/animeCrud.php",
      data: data,
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    })
      .then((response) => {
        console.log("RESPONSEEEE", response);
        const savedAnimeId = response?.data?.id || animeId;
        console.log("AAAAAAAAAAAAAAAA", savedAnimeId);
        saveToVideo(savedAnimeId);
        saveToCasts(savedAnimeId);
        saveToImages(savedAnimeId);
        navigate("/main/movies");
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving anime data");
      });
  };

  const saveToImages = (id) => {
    if (!selectedImages || selectedImages.length === 0) {
      alert("No images to save.");
      return;
    }

    const imagesToProcess = animeId ? newSelectedImages : selectedImages;

    imagesToProcess.forEach((image) => {
      const imageData = {
        file_path: image.file_path || "Unknown",
        vote_average: image.vote_average || 0,
        animeId: animeId ? animeId : id,
      };

      axios({
        method: "post",
        url: "/imagesCrud.php",
        data: imageData,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
        .then((response) => {
          console.log("Image saved successfully:", response);
        })
        .catch((error) => {
          console.error(error);
          alert("Error saving image data");
        });
    });
  };

  const saveToVideo = (id) => {
    console.log("why is this error huhu", id);

    if (!selectedVideo) {
      alert("No video data to save.");
      return;
    }

    const videoData = {
      animeId: id,
      id: animeId ? realId : id,
      key: selectedVideo.key || "nokey",
      name: selectedVideo.name || "noname",
      site: selectedVideo.site || "Youtube",
      type: selectedVideo.type || "Custom Video",
    };

    axios({
      method: animeId ? "patch" : "post",
      url: "/videosCrud.php",
      data: videoData,
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
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

  const saveToCasts = (id) => {
    if (!selectedVideo) {
      alert("No video data to save.");
      return;
    }

    if (
      !selectedAnime ||
      !selectedAnime.casts ||
      selectedAnime.casts.length === 0
    ) {
      alert("No cast data to save.");
      return;
    }

    selectedAnime.casts.forEach((cast) => {
      const castData = {
        id: animeId ? "" : "",
        animeId: id,
        characterName: cast.character || "Unknown",
        name: cast.name || "Unknown",
        profile_path: cast.profile_path || null,
      };

      axios({
        method: "post",
        url: "/castsCrud.php",
        data: castData,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
        .then((response) => {
          console.log("Cast saved successfully:", response);
        })
        .catch((error) => {
          console.error(error);
          alert("Error saving cast data");
        });
    });
  };

  const handleSelect = (item, type) => {
    setSelectedItem({ ...item, type });
    setSelectedAnime({ ...selectedAnime, [`${type}`]: item });
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
                  {getCurrentPageItems().map((anime, index) => (
                    <div key={index}>
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

                <div className="previewVideMain">
                  <p className="prevVidTitle">Customize Video</p>
                  <div className="previewVideoDes">
                    <p>Backdrop Link</p>
                    <input
                      className="previewInputs"
                      type="text"
                      // disabled={!animeId}
                      value={selectedAnime.backdrop_path}
                      onChange={(e) =>
                        setSelectedAnime({
                          ...selectedAnime,
                          backdrop_path: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="previewVideoDes">
                    <p>Poster Link</p>
                    <input
                      className="previewInputs"
                      type="text"
                      // disabled={!animeId}
                      value={selectedAnime.poster_path}
                      onChange={(e) =>
                        setSelectedAnime({
                          ...selectedAnime,
                          poster_path: e.target.value,
                        })
                      }
                    />
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
                  <div className="castTextCont">
                    <p>Casts</p>
                  </div>
                  <div className="overviewtext">
                    <div>
                      <div className="castMainContainer">
                        <div className="castContainer">
                          {animeId ? (
                            <>
                              {selectedCasts?.map((cast, index) => (
                                <div key={index} className="castBorder">
                                  <img
                                    src={
                                      cast.profile_path ||
                                      "https://via.placeholder.com/500x750?text=No+Image+Available"
                                    }
                                    alt={cast.name}
                                    className="castImage"
                                  />
                                  <div className="castInfo">
                                    <div>{cast.name}</div>
                                    <div>{cast.character}</div>
                                  </div>
                                  <button
                                    className="videoButton"
                                    onClick={() =>
                                      handleDeleteCast(cast.cast_id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {selectedAnime.casts.map((cast, index) => (
                                <div key={index} className="castBorder">
                                  <img
                                    src={
                                      cast.profile_path ||
                                      "https://via.placeholder.com/500x750?text=No+Image+Available"
                                    }
                                    alt={cast.name}
                                    className="castImage"
                                  />
                                  <div className="castInfo">
                                    <div>{cast.name}</div>
                                    <div>{cast.character}</div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overviewCont">
                  <div className="overviewtext">
                    <p>Images</p>
                  </div>

                  <div className="overviewtext">
                    <div>
                      <div className="castMainContainer">
                        <div className="castContainer">
                          {animeId ? (
                            <>
                              {selectedImages?.map((img, index) => (
                                <div key={index} className="imageBorder">
                                  <img
                                    src={img.file_path || ""}
                                    alt={index}
                                    className="imageImage"
                                  />
                                  <button
                                    className="videoButton"
                                    onClick={() =>
                                      handleDeleteImage(img.image_id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {selectedImages.map((image, index) => (
                                <div key={index} className="imageBorder">
                                  <img
                                    src={image.file_path || ""}
                                    alt={index}
                                    className="imageImage"
                                  />
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vertical-line"></div>

              <div className="objectSelect">
                <div className="mediaCont">
                  <div className="videoTextCont">
                    <p>Customization</p>
                  </div>
                  <div>
                    <div className="customizationCont">
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
                                    className="borderRadius"
                                    src={poster.file_path}
                                    alt={`Poster ${index}`}
                                    width="200"
                                  />
                                </div>
                                <button
                                  className="videoButton"
                                  onClick={() => {
                                    handleSelect(
                                      poster.file_path,
                                      "poster_path"
                                    );
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
                                    className="borderRadius"
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
                      <div className="sectionTitleCont">
                        <p className="sectionTitle">Images</p>
                      </div>
                      <div className="videos-list2">
                        {allImages && allImages.length > 0 ? (
                          allImages.map((image, index) => (
                            <div className="videosCont" key={index}>
                              <p>{image.name}</p>
                              <div className="video-preview">
                                <img
                                  src={image.file_path}
                                  alt={`Image ${index}`}
                                  width="300"
                                />
                              </div>
                              <button
                                className="videoButton"
                                onClick={() => handleAddImage(image)}
                              >
                                Add to Images
                              </button>
                            </div>
                          ))
                        ) : (
                          <p>No Images found</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>

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
    </>
  );
};

export default Form;

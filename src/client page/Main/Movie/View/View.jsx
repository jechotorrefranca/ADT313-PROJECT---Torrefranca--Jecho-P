import { useEffect, useState } from "react";
import { useMovieContext } from "../../../../context/MovieContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

function View() {
  const { movie, setMovie } = useMovieContext();

  const [videoKey, setVideoKey] = useState(null);

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          console.log(movie.tmdbId);
        })
        .catch((e) => {
          console.log(e);
          navigate("/");
        });
    }
    return () => {};
  }, [movieId]);

  useEffect(() => {
    const fetchVideo = async (movieId) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          {
            params: {
              api_key: "52c29706661bab2c1f5e23b1c13d7dbb",
            },
          }
        );
        const videos = response.data.results;
        const trailer = videos.find((video) => video.type === "Trailer");
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo(movie?.tmdbId); // Replace with actual movie ID
  }, []);

  return (
    <div className="movieDetMain">
      {movie && (
        <>
          <div>
            <div className="banner">
              <h1>{movie.title}</h1>
            </div>
            <h3>{movie.overview}</h3>

            <div>
              <span>movie poster</span>
            </div>

            <div className="try">
              <img
                src={`https://image.tmdb.org/t/p/${movie.backdropPath}`}
                alt={movie.title}
                className="movBackdrop"
              />

            </div>


            <div>
              <img
                src={`https://image.tmdb.org/t/p/${movie.posterPath}`}
                alt={movie.title}
                className="movPoster"
              />


            </div>


            {JSON.stringify(movie)}
          </div>

          <div>
            <span>video</span>
          </div>

          {videoKey && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          {movie.casts && movie.casts.length && (
            <div>
              <h1>Cast & Crew</h1>
              {JSON.stringify(movie.casts)}
            </div>
          )}

          {movie.videos && movie.videos.length && (
            <div>
              <h1>Videos</h1>
              {JSON.stringify(movie.videos)}
            </div>
          )}

          {movie.photos && movie.photos.length && (
            <div>
              <h1>Photos</h1>
              {JSON.stringify(movie.photos)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default View;

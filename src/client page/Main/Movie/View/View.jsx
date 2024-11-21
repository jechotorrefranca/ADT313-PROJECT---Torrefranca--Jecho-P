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
        .post("/getAnime.php", { id: `${movieId}` })
        .then((response) => {
          setMovie(response.data.data[0]);
          console.log(response.data.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching animes:", error);
          navigate("/");
        });
    }
    return () => {};
  }, [movieId]);

  const parsedCast = movie && movie.cast ? JSON.parse(movie.cast) : [];

  return (
    <div className="movieDetMain">
      {movie && (
        <>
          <div>
            <div className="backdropCont">
              <div className="bd">
                <img
                  src={`https://image.tmdb.org/t/p/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="bdImage"
                />

              </div>
            </div>

            <div>
              <img
                src={`https://image.tmdb.org/t/p/${movie.poster_path}`}
                alt={movie.title}
                className="movPoster"
              />
            </div>

            <div className="banner">
              <h1>{movie.title}</h1>
            </div>
            <h3>{movie.overview}</h3>
            <div>
              <span>movie poster</span>
            </div>



            <h2>Cast:</h2>
            {parsedCast.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {parsedCast.map((castMember, index) => (
                  <div
                    key={index}
                    style={{ width: "150px", textAlign: "center" }}
                  >
                    <h3>{castMember.character}</h3>
                    <p>
                      <strong>Actor:</strong> {castMember.name}
                    </p>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                      alt={castMember.name}
                      style={{
                        width: "100px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No cast information available.</p>
            )}


          </div>

          <div>
            <span>video</span>
          </div>

          {movie.videoKey && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.videoKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </>
      )}
    </div>
  );
}

export default View;

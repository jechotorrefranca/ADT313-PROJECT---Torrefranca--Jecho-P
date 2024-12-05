import { useEffect, useState } from "react";
import { useAnimeContext } from "../../../../context/AnimeContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

function View() {
  const { anime, fetchAnimeById, setAnime } = useAnimeContext();
  const [videoKey, setVideoKey] = useState(null);
  const { animeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!animeId) return;

    setAnime(null);

    fetchAnimeById(animeId, navigate).then((anime) => {
      setAnime(anime);
    });
  }, [animeId, fetchAnimeById, navigate]);

  const parsedCast =
    anime && anime.cast && anime.cast !== "null" ? JSON.parse(anime.cast) : [];

  return (
    <div className="AnimeDetMain">
      {anime && (
        <>
          <div>
            <div className="backdropCont">
              <div className="bd">
                <img
                  src={`https://image.tmdb.org/t/p/${anime.backdrop_path}`}
                  alt={anime.title}
                  className="bdImage"
                />
              </div>
            </div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/${anime.poster_path}`}
                alt={anime.title}
                className="movPoster"
              />
            </div>

            <div className="banner">
              <h1>{anime.name}</h1>
            </div>
            <h3>{anime.overview}</h3>
            <div>
              <span>Anime poster</span>
            </div>

            <h2>Cast:</h2>
            {parsedCast.length > 0 && parsedCast.length !== "null" ? (
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

          {anime.videoKey && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${anime.videoKey}`}
              title="Anime Trailer"
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

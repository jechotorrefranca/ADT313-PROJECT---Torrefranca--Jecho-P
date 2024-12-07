import { useNavigate } from "react-router-dom";
import "./Lists.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAnimeContext } from "../../../../context/AnimeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Lists = () => {
  const navigate = useNavigate();
  const { accessToken, onlyAnime, setOnlyAnime, fetchOnlyAnime } =
    useAnimeContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchOnlyAnime();
    console.log("only anime: ", onlyAnime);
  }, [fetchOnlyAnime]);

  const handleDelete = (id) => {
    console.log(id);
    const isConfirm = window.confirm(
      "Are you sure that you want to delete this data?"
    );
    if (isConfirm) {
      axios
        .request({
          url: `/animeCrud.php`,
          method: "delete",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: { id },
        })
        .then(() => {
          const updatedAnime = onlyAnime.filter(
            (anime) => anime.anime.id !== id
          );
          setOnlyAnime(updatedAnime);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  const filteredAnime = onlyAnime.filter((anime) =>
    anime.anime.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="lists-container">
      <div className="searchACreate">
        <div className="searchBarCont">
          <div className="searchBar">
            <div className="searchBarDes">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search Anime"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="create-container">
          <button
            type="button"
            onClick={() => {
              navigate("/main/movies/form");
            }}
          >
            Create new
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="movie-lists">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnime.map((anime) => (
              <tr key={anime.anime.id}>
                <td>{anime.anime.id}</td>
                <td>{anime.anime.name}</td>
                <td>
                  <button
                    className="greenButton"
                    type="button"
                    onClick={() => {
                      navigate("/main/movies/form/" + anime.anime.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(anime.anime.id)}
                    className="redButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;

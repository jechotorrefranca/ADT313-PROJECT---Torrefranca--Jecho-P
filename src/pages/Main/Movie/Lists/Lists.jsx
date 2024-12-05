import { useNavigate } from "react-router-dom";
import "./Lists.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAnimeContext } from "../../../../context/AnimeContext";
const Lists = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const { accessToken, userId, animeList } = useAnimeContext();

  const handleDelete = (id) => {
    const isConfirm = window.confirm(
      "Are you sure that you want to delete this data?"
    );
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const tempLists = [...lists];
          const index = lists.findIndex((movie) => movie.id === id);
          if (index !== undefined || index !== -1) {
            tempLists.splice(index, 1);
            setLists(tempLists);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  return (
    <div className="lists-container">
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
            {animeList.map((anime) => (
              <tr key={anime.id}>
                <td>{anime.id}</td>
                <td>{anime.name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/main/movies/form/" + anime.id);
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(anime.id)}>
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

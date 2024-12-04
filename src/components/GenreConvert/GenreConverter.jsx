import React from "react";

const GenreConverter = ({ genres }) => {
  const parsedGenres = genres && genres !== "null" ? JSON.parse(genres) : [];

  return (
    <div className="genreList">
      {parsedGenres.map((genre, index) => (
        <div className="genreFeatured" key={index}>
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default GenreConverter;

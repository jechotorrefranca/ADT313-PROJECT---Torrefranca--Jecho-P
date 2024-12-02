import "./AnimeCards.css";

function AnimeCards({ anime, onClick, name, place }) {
  return (
    <div className="whole-card-content">
      <div className="card-content">
        <div className="animeName">
          {name.length > 25 ? name.slice(0, 20) + "..." : name}
        </div>

        <div className="animeNumber">{place}</div>
      </div>
      <div className="card" onClick={onClick}>
        <img
          src={anime.poster_path}
          alt={name}
          className="animePosterCardImg"
        />
        <div className="hoverModal">More Info</div>
      </div>
    </div>
  );
}

export default AnimeCards;

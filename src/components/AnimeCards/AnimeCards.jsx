import './AnimeCards.css';
function AnimeCards({ anime: anime, onClick }) {
  return (
    <>
      <div className='card' onClick={onClick}>
        <img src={anime.poster_path} />
        <span>{anime.name}</span>
      </div>
    </>
  );
}

export default AnimeCards;

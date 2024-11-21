import './AnimeCards.css';
function AnimeCards({ movie: movie, onClick }) {
  return (
    <>
      <div className='card' onClick={onClick}>
        <img src={movie.poster_path} />
        <span>{movie.name}</span>
      </div>
    </>
  );
}

export default AnimeCards;

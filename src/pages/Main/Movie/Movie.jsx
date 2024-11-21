import { Outlet } from 'react-router-dom';
import './Anime.css';

const Movie = () => {
  return (
    <>
    <div>
      <h1>Anime Page</h1>
    </div>
      <Outlet />
    </>
  );
};

export default Movie;

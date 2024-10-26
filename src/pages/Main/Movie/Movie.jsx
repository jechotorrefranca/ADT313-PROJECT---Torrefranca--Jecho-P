import { Outlet } from 'react-router-dom';
import './Movie.css';

const Movie = () => {
  return (
    <>
    <div>
      <h1>Movie Page</h1>
    </div>
      <Outlet />
    </>
  );
};

export default Movie;

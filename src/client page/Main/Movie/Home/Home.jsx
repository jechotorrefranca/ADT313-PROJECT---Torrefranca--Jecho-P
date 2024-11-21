import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AnimeCards from '../../../../components/AnimeCards/AnimeCards';
import { useMovieContext } from '../../../../context/MovieContext';
const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
    // Fetch the animes from the API
    axios
      .post('/getAnime.php') // Adjust the API endpoint accordingly
      .then((response) => {
        if (response.data.success) {
          const animes = response.data.data;
          setMovieList(animes);

          // Select a random anime as the featured anime
          const randomIndex = Math.floor(Math.random() * animes.length);
          setFeaturedMovie(animes[randomIndex]);

          console.log(animes)
        } else {
          console.error('No animes found');
        }
      })
      .catch((error) => {
        console.error('Error fetching animes:', error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    if (movieList.length) {
      console.log('change movie');
      const random = Math.floor(Math.random() * movieList.length);
      setFeaturedMovie(movieList[random]);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [movieList]);


  return (
    <div className='whole'>
      <h1 className='page-title'>AniKou</h1>
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              background: `url(${ featuredMovie.backdrop_path || featuredMovie.poster_path
              }) no-repeat center top`,
            }}
          >
            <span className='featured-movie-title'>{featuredMovie.name}</span>
          </div>
        </div>
      ) : (
        <div className='featured-list-container-loader'></div>
      )}
      <div className='list-container'>
        {movieList.map((movie) => (
          <>
            <AnimeCards
              movie={movie}
              onClick={() => {
                navigate(`/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;

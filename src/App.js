import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  //OLD WAY OF GETTING MOVIES - HARDCODING
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];


  //NEW WAY - GETTING MOVIES VIA API
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);

    try{
        const response = await fetch('https://swapi.dev/api/film');
        
        if(!response.ok) {
          throw new Error('Something went wrong :(')
        }
        const data = await response.json();
        
        const transformedData = data.results.map(moviesData => {
          return {
            id: moviesData.episode_id,
            title: moviesData.title,
            openingText: moviesData.opening_crawl,
            releaseDate: moviesData.release_date
          }
        });
        setMoviesList(transformedData);
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
  }

  let content = <p>Nothing Found</p>

  if (moviesList.length > 0) {
    content = <MoviesList movies={moviesList} />
  }

  if (isLoading) {
    content = 'Loading...' ;
  }

  if (error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

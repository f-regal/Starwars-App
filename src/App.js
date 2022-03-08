import React, {useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
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
  

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try{
        const response = await fetch('https://swapi.dev/api/films');
        
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
      } 
    catch (error) {
        setError(error.message)
     }

      setIsLoading(false)
  }, []);


  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler])


  //FIX THIS BASED ON LECTURE 183
  async function addMovieHandler(movie) {

    const response = await fetch('https://react-http-451e1-default-rtdb.europe-west1.firebasedatabase.app/',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json'
      }
     
    }
     

    );
        
    if(!response.ok) {
      throw new Error('Something went wrong :(')
    }
    const data = await response.json();
    console.log(data)
    console.log(movie);
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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

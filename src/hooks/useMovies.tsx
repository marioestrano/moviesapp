import { useEffect, useState } from "react";
import movieDb from "../api/MovieDb";
import { Movie, MovieDBResponse } from "../interfaces/MovieInterface";

interface MoviesState {
  NowPlaying: Movie[],
  Popular: Movie[],
  TopRated: Movie[],
  UpComing: Movie[],
}



export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [ moviesState, setMoviesState ] = useState<MoviesState>({
    NowPlaying: [],
    Popular: [],
    TopRated: [],
    UpComing: [],

  });

  const getMovies = async() => {

   const nowPlayingPromise = movieDb.get<MovieDBResponse>('/now_playing');
   const popularPromise = movieDb.get<MovieDBResponse>('/popular');
   const  topRatedPromise = movieDb.get<MovieDBResponse>('/top_rated');
   const  upcomingPromise = movieDb.get<MovieDBResponse>('/upcoming');


   const resp = await Promise.all([
    nowPlayingPromise,
    popularPromise,
    topRatedPromise,
    upcomingPromise
  ]);

  setMoviesState({
    NowPlaying: resp[0].data.results,
    Popular: resp[1].data.results,
    TopRated: resp[2].data.results,
    UpComing: resp[3].data.results
  })

    setIsLoading(false)
    }

  useEffect(() => {
    //now_playing
    getMovies();
      
    }, [])

  return {
    ...moviesState,
    isLoading
  }
}

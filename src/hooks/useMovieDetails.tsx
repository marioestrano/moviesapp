import { useEffect, useState } from 'react';
import movieDb from '../api/MovieDb';
import { MovieFull } from '../interfaces/MovieInterface';
import { Cast, CreditsResponse } from '../interfaces/CreditsInterface';


interface MovieDetails {
    isLoading: boolean,
    cast: Cast[],
    movieFull?: MovieFull,

}

export const useMovieDetails = ( movieId : number) => {

    const [first, setFirst] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });


    const getMovieDetails = async() => {
        const movieDetailPromise = movieDb.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDb.get<CreditsResponse>(`/${movieId}/credits`);

        const [ movieDetailsResp, castPromiseResp ] = await Promise.all( [movieDetailPromise, castPromise]);

        setFirst({
            isLoading: false,
            movieFull: movieDetailsResp.data ,
            cast: castPromiseResp.data.cast
        })



    }

    useEffect(() => {
      getMovieDetails();
    }, [])
    
  return {
    ...first
  }
}

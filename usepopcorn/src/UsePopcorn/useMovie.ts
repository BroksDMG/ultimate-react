import {useState, useEffect} from 'react'
const key = "803ff219";
export function useMovie({selectedMovieId}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    console.log(movie, isLoading)
    useEffect(
        function () {
            const controler = new AbortController();
          async function fetchMovieDetails() {
            setIsLoading(true);
            const res = await fetch(
              `http://www.omdbapi.com/?i=${selectedMovieId}&apikey=${key}`,
              { signal: controler.signal }
            );
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
          }
          fetchMovieDetails();
          return function(){
            controler.abort();
          }
        },
        [selectedMovieId]
      );
      
return {movie, isLoading}

}

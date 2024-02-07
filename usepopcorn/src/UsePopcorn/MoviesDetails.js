import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import StarRating from "./StarRaiting";
const key = "803ff219";
export default function MoviesDetails({
  selectedMovieId,
  onCloseMovieDetails,
  addWatchedMovie,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const countRef = useRef(0);
  useEffect(() => {
    if (rating) {
      countRef.current++;
    }
  }, [rating]);
  const isRating = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);
  const watchedMovieRaiting = watchedMovies.find(
    (watchedMovies) => watchedMovies.imdbID === selectedMovieId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  function handleAddWatchedMovie() {
    const watchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: rating,
      countRef: countRef.current,
    };
    addWatchedMovie(watchedMovie);
    onCloseMovieDetails();
    // localStorage.setItem(
    //   "watchedMovies",
    //   JSON.stringify([...watchedMovies, watchedMovie])
    // );
  }
  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);
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
        return function () {
          controler.abort();
        };
      }
      fetchMovieDetails();
    },
    [selectedMovieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isRating && <p>this movie was rated⭐️{watchedMovieRaiting}</p>}
              <StarRating size={"24"} maxRating={10} onSetRating={setRating} />
              {rating > 0 && (
                <button className="btn-add" onClick={handleAddWatchedMovie}>
                  Add to watched
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring{actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

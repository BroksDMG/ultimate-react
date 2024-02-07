import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import WatchedMoviesList from "./WatchedMoviesList";
import MoviesList from "./MoviesList";
import { tempMovieData, tempWatchedData } from "./tempData";
import SummaryWatchedMovies from "./SummaryWatchedMovies";
import MoviesDetails from "./MoviesDetails";
import Loader from "./Loader";
const key = "803ff219";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseSelectedMovie() {
    setSelectedMovieId(null);
  }
  function handleAddWatchedMovie(movie) {
    if (watched.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) {
      setWatched((watched) =>
        watched.filter((watchedMovie) => watchedMovie.imdbID !== movie.imdbID)
      );
    }
    setWatched((watched) => [...watched, movie]);
  }
  function handleRemoveWatchedMovie(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }
  useEffect(
    function () {
      const controler = new AbortController();
      async function fetchMovies() {
        try {
          setIsError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            {
              signal: controler.signal,
            }
          );
          if (!res.ok) throw new Error("Network response was not ok.");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found.");
          setMovies(data.Search);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
            console.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length > 3) {
        setIsError("");
        setMovies([]);
        return;
      }

      fetchMovies();
      return function () {
        controler.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && isLoading && <Loader />}
          {isOpen1 && !isLoading && !isError && (
            <MoviesList
              movies={movies}
              setSelectedMovieId={handleSelectMovie}
            />
          )}
          {isError && <Error errMessage={isError} />}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && !selectedMovieId && (
            <>
              <SummaryWatchedMovies watched={watched} />
              <WatchedMoviesList
                watched={watched}
                removeMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
          {selectedMovieId && (
            <MoviesDetails
              selectedMovieId={selectedMovieId}
              onCloseMovieDetails={handleCloseSelectedMovie}
              addWatchedMovie={handleAddWatchedMovie}
              watchedMovies={watched}
            />
          )}
        </div>
      </main>
    </>
  );
}

function Error({ errMessage }) {
  return (
    <div className="error">
      <span>⛔</span>
      {errMessage}
    </div>
  );
}

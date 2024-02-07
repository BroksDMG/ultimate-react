import React from "react";

function WatchedMoviesList({ watched, removeMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => removeMovie(movie.imdbID)}
            >
              x
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMoviesList;

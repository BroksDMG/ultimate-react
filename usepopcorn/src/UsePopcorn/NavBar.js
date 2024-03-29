import propTypes from "prop-types";
import { useEffect, useRef } from "react";

function NavBar({ movies = [], query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => {
    function handleKey(e) {
      console.log(e);
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.addEventListener("keydown", handleKey);
  }, [setQuery]);
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

export default NavBar;

NavBar.propTypes = {
  movies: propTypes.array,
  query: propTypes.string,
  setQuery: propTypes.func,
};

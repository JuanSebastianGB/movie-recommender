import React from 'react';
import styles from './MovieSearch.module.css';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { MovieCard } from '../../components/MovieCard/MovieCard';

interface MovieSearchProps {
  onSelectMovie: (id: number) => void;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({ onSelectMovie }) => {
  const { query, setQuery, movies, loading, error, search } = useMovieSearch({
    initialQuery: '',
    debounceMs: 500,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : 'Search'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.movieList}>
        {loading && !movies.length ? (
          <div className={styles.loading}>Loading movies...</div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
          ))
        ) : (
          <p className={styles.noResults}>
            No movies found. Try a different search!
          </p>
        )}
      </div>
    </div>
  );
};

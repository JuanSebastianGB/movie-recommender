import React from 'react';
import styles from './MovieSearch.module.css';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { MovieCard } from '../../components/MovieCard/MovieCard';

interface MovieSearchProps {
  onSelectMovie: (id: number) => void;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({ onSelectMovie }) => {
  const {
    query,
    setQuery,
    movies,
    loading,
    error,
    search,
    genres,
    filterOptions: filters,
    setFilterOptions,
  } = useMovieSearch({
    initialQuery: '',
    debounceMs: 500,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleGenreSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilterOptions({ ...filters, genres: selectedGenres.map(Number) });
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filters, minRating: +e.target.value });
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
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="genres">Genres:</label>
          <select
            id="genres"
            multiple
            value={filters.genres.map(String)}
            onChange={handleGenreSearch}
            className={styles.select}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="rating">Min Rating: {filters.minRating}</label>
          <input
            id="rating"
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.minRating}
            onChange={handleRatingChange}
            className={styles.range}
          />
        </div>
      </div>
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

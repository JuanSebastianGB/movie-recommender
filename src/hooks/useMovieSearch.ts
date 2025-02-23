import { useState, useEffect, useCallback } from 'react';
import { FilterOptions, Genre } from '../types/movie';
import { fetchGenres, fetchMovies } from '../api/api';
import { useAppDispatch } from '../api/hooks';
import { fillMovies } from '../features/movie-search/moviesSlice';

// Define options for the hook
interface MovieSearchOptions {
  initialQuery?: string;
  debounceMs?: number; // Time to wait before triggering the search
}

interface MovieSearchResult {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  error: string | null;
  search: () => void; // Manual trigger for the search
  genres: Genre[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

export const useMovieSearch = ({
  initialQuery = '',
  debounceMs = 300,
}: MovieSearchOptions = {}): MovieSearchResult => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genres: [],
    minRating: 0,
  });
  const [genres, setGenres] = useState<Genre[]>([]);

  // Define the search function
  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      dispatch(fillMovies([]));
      return;
    }

    setLoading(true);
    try {
      const results = await fetchMovies(query, filterOptions);
      dispatch(fillMovies(results));
    } catch (err) {
      console.error((err as Error)?.message ?? '');
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, [query, filterOptions, dispatch]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresList = await fetchGenres();
        setGenres(genresList);
      } catch (error) {
        setError((error as Error)?.message ?? 'Failed to fetch genres');
      }
    };
    loadGenres();
  }, []);

  // Debounce effect for automatic search
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch();
    }, debounceMs);

    // Cleanup: cancel the timeout if query changes or component unmounts
    return () => clearTimeout(handler);
  }, [query, debounceMs, performSearch]);

  return {
    query,
    setQuery,
    filterOptions,
    setFilterOptions,
    genres,
    loading,
    error,
    search: performSearch, // Expose the search function for manual triggering
  };
};

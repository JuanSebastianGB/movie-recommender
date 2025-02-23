import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';
import { fetchMovies } from '../api/api';

// Define options for the hook
interface MovieSearchOptions {
  initialQuery?: string;
  debounceMs?: number; // Time to wait before triggering the search
}

interface MovieSearchResult {
  query: string;
  setQuery: (query: string) => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  search: () => void; // Manual trigger for the search
}

export const useMovieSearch = ({
  initialQuery = '',
  debounceMs = 300,
}: MovieSearchOptions = {}): MovieSearchResult => {
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define the search function
  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error((err as Error)?.message ?? '');
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, [query]);

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
    movies,
    loading,
    error,
    search: performSearch, // Expose the search function for manual triggering
  };
};

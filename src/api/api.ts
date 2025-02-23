import axios from 'axios';
import { FilterOptions, Genre, Movie, Review } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  filterOptions: FilterOptions = { genres: [], minRating: 0 }
): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      with_genres:
        filterOptions.genres.length > 0
          ? filterOptions.genres.join(',')
          : undefined,
      'vote_average.gte': filterOptions.minRating,
    },
  });
  return response.data.results;
};

export const fetchMovieReviews = async (
  movieId: Movie['id']
): Promise<Review[]> => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};

export const fetchRecommendations = async (
  movieId: Movie['id']
): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/recommendations`,
    {
      params: { api_key: API_KEY },
    }
  );
  return response.data.results;
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data.genres;
};

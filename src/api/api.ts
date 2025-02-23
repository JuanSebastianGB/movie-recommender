import axios from 'axios';
import { Movie, Review } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return response.data.results;
};

export const fetchMovieReviews = async (movieId: number): Promise<Review[]> => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};

export const fetchRecommendations = async (
  movieId: number
): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/recommendations`,
    {
      params: { api_key: API_KEY },
    }
  );
  return response.data.results;
};

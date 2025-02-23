import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';
// interface

interface MoviesState {
  [key: string]: Movie;
}

// initial state

const initialState: MoviesState = {};

// slice

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fillMovies: (state, action: PayloadAction<Movie[]>) => {
      action.payload.forEach((movie) => {
        state[movie.id] = movie;
      });
    },
  },
});

export const { fillMovies } = moviesSlice.actions;

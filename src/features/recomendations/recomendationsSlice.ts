import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';

// interface

interface RecommendationsState {
  [id: string]: Movie;
}

// initial state

const initialState: RecommendationsState = {};

// slice

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    fillRecommendations: (state, action: PayloadAction<Movie[]>) => {
      action.payload.forEach((movie) => {
        state[movie.id] = movie;
      });
    },
  },
});

export const { fillRecommendations } = recommendationsSlice.actions;

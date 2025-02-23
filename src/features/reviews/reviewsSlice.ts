import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/movie';

//interface

interface ReviewsState {
  [id: string]: Review;
}

// initial state
const initialState: ReviewsState = {};

//slice

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    fillReviews: (state, action: PayloadAction<Review[]>) => {
      action.payload.forEach((review) => {
        state[review.id] = review;
      });
    },
  },
});

export const { fillReviews } = reviewsSlice.actions;

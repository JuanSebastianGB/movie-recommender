import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from '../features/movie-search/moviesSlice';
import { reviewsSlice } from '../features/reviews/reviewsSlice';
import { recommendationsSlice } from '../features/recomendations/recomendationsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    reviews: reviewsSlice.reducer,
    recommendations: recommendationsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

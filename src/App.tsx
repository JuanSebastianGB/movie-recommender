import React, { useState } from 'react';
import styles from './App.module.css';
import { fetchMovieReviews, fetchRecommendations } from './api/api';
import { MovieSearch } from './features/movie-search/MovieSearch';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { fillReviews } from './features/reviews/reviewsSlice';
import { fillRecommendations } from './features/recomendations/recomendationsSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const reviews = Object.values(useAppSelector((state) => state.reviews));
  const recommendations = Object.values(
    useAppSelector((state) => state.recommendations)
  );
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleSelectMovie = async (id: number) => {
    setSelectedMovieId(id);
    const movieReviews = await fetchMovieReviews(id);
    const movieRecommendations = await fetchRecommendations(id);
    dispatch(fillReviews(movieReviews));
    dispatch(fillRecommendations(movieRecommendations));
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Movie Recommender</h1>
        <p>Discover your next favorite film</p>
      </header>
      <main className={styles.main}>
        <MovieSearch onSelectMovie={handleSelectMovie} />
        {selectedMovieId && (
          <section className={styles.details}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            {reviews.length > 0 ? (
              <div className={styles.reviewList}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.review}>
                    <p className={styles.author}>
                      <strong>{review.author}</strong>
                    </p>
                    <p>{review.content.slice(0, 200)}...</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available.</p>
            )}
            <h2 className={styles.sectionTitle}>Recommendations</h2>
            <div className={styles.recommendationList}>
              {recommendations.map((movie) => (
                <div key={movie.id} className={styles.recommendation}>
                  <h3>{movie.title}</h3>
                  <p>⭐ {movie.vote_average.toFixed(1)} / 10</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;

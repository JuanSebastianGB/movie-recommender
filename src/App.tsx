import React, { useState } from 'react';
import { Movie, Review } from './types/movie';
import styles from './App.module.css';
import { fetchMovieReviews, fetchRecommendations } from './api/api';
import { MovieSearch } from './features/movie-search/MovieSearch';

const App: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  const handleSelectMovie = async (id: number) => {
    setSelectedMovieId(id);
    const movieReviews = await fetchMovieReviews(id);
    const movieRecommendations = await fetchRecommendations(id);
    setReviews(movieReviews);
    setRecommendations(movieRecommendations);
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

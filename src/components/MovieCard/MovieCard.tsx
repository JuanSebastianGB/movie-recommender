import React, { useState } from 'react';
import styles from './MovieCard.module.css';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.card} onClick={() => onClick(movie.id)}>
      <div className={styles.imageWrapper}>
        {!imageLoaded && <div className={styles.skeleton}></div>}
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className={`${styles.poster} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Handle broken images gracefully
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</p>
      </div>
    </div>
  );
};

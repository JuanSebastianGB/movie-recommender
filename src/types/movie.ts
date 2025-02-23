export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface UserPreferences {
  genres: string[];
  minRating: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FilterOptions {
  genres: number[];
  minRating: number;
}

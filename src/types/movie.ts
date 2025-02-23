export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
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

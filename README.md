# Movie Recommender

Movie Recommender is a web application that allows users to search for movies, view details, read reviews, and get recommendations for similar movies. The application is built using React and TypeScript, and it leverages the TMDB (The Movie Database) API to fetch movie data.

## Features

- **Movie Search**: Search for movies by title.
- **Movie Details**: View detailed information about a selected movie.
- **Reviews**: Read reviews for the selected movie.
- **Recommendations**: Get recommendations for similar movies.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JuanSebastianGB/movie-recommender.git
   cd movie-recommender
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the `src` directory and add your TMDB API key:

   ```plaintext
   VITE_TMDB_API_KEY=your-tmdb-api-key-here
   ```

4. Start the development server:

   ```bash
   pnpm start
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
movie-recommender/
├── public/                     # Static assets
├── src/                        # Source files
│   ├── api/                    # API calls
│   ├── components/             # Reusable components
│   ├── features/               # Feature-specific components
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript types
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Entry point
│   └── ...                     # Other files
├── .env.example                # Example environment variables
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

## API Integration

This project uses the TMDB API to fetch movie data. You need to sign up for an API key from [TMDB](https://www.themoviedb.org/documentation/api) and add it to your `.env` file.

## Available Scripts

- `pnpm start`: Starts the development server.
- `pnpm build`: Builds the app for production.
- `pnpm dev`: starts the development server with Vite's hot module replacement.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie data API.
- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) for the development framework and language.

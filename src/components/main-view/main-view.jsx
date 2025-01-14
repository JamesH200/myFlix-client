import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "1",
      title: "The Creator",
      image:
        "https://m.media-amazon.com/images/I/61DCEg5XJ1L._AC_UL640_FMwebp_QL65_.jpg",
      director: {
        name: "Gareth Edwards",
        bio: "A British filmmaker known for science fiction films.",
      },
      description: "A futuristic story about AI and human conflict.",
      genre: "Science Fiction",
    },
    {
      _id: "2",
      title: "Oblivion",
      image: "https://m.media-amazon.com/images/I/6136qtFPxdL._AC_UL640_FMwebp_QL65_.jpg",
      director: {
        name: "Joseph Kosinski",
        bio: "An American director known for visually stunning films.",
      },
      description: "A dystopian future where Earth is abandoned.",
      genre: "Science Fiction",
    },
    {
      _id: "3",
      title: "Inception",
      image: "https://m.media-amazon.com/images/I/619PgEuyGXL._AC_UL640_FMwebp_QL65_.jpg",
      director: {
        name: "Christopher Nolan",
        bio: "A British-American filmmaker known for cerebral, non-linear storytelling.",
      },
      description: "A heist within the mind.",
      genre: "Thriller",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} onClick={() => setSelectedMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

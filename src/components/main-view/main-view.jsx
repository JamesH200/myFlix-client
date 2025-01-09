import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import "./main-view.scss";

export const MainView = () => {
  const [movies] = useState([
    {
      title: "The Creator",
      description: "A futuristic story about AI and human conflict.",
      genre: "Science Fiction",
      director: "Gareth Edwards",
      posterImage: "https://example.com/the-creator-poster.jpg",
    },
    {
      title: "Oblivion",
      description: "A dystopian future where Earth is abandoned.",
      genre: "Science Fiction",
      director: "Joseph Kosinski",
      posterImage: "https://example.com/oblivion-poster.jpg",
    },
    {
      title: "Inception",
      description: "A heist within the mind.",
      genre: "Thriller",
      director: "Christopher Nolan",
      posterImage: "https://example.com/inception-poster.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="main-view">
      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={onBackClick} />
      ) : (
        movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onMovieClick={onMovieClick} />
        ))
      )}
    </div>
  );
};

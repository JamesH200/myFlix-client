import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import "./main-view.scss";

export const MainView = () => {
  // Movies state
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

  // Selected movie state
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Handler for when a movie card is clicked
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handler for navigating back to the main view
  const onBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="main-view">
      {selectedMovie ? (
        // Render MovieView when a movie is selected
        <MovieView movie={selectedMovie} onBackClick={onBackClick} />
      ) : (
        // Render MovieCard list if no movie is selected
        movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onMovieClick={onMovieClick} />
        ))
      )}
    </div>
  );
};
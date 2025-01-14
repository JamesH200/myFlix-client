import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "1",
      title: "The Creator",
      image:
        "http://www.impawards.com/2010/posters/inception_ver2_xlg.jpg",
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
      image: "https://image.tmdb.org/t/p/w500/oblivion-poster.jpg",
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
      image: "https://image.tmdb.org/t/p/w500/inception-poster.jpg",
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
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};

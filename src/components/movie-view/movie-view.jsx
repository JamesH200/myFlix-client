import React from "react";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <img src={movie.posterImage} alt={`${movie.title} poster`} />
      <h1>{movie.title}</h1>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <button onClick={onBackClick}>Back to Movie List</button>
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <p><strong>Description:</strong> {movie.description}</p>
    </div>
  );
};









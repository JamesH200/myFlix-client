import React from "react";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <img
        className="movie-poster"
        src={movie.posterImage}
        alt={`${movie.title} poster`}
      />
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-description">
        <strong>Description:</strong> {movie.description}
      </p>
      <p className="movie-genre">
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p className="movie-director">
        <strong>Director:</strong> {movie.director}
      </p>
      <button className="back-button" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};

import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      <h2>{movie.title}</h2>
      {movie.image && (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          style={{ width: "100px", height: "150px", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};


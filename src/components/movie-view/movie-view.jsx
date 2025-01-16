import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={onBackClick}
        style={{ marginBottom: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Back to Movie List
      </button>
      <h2>{movie.title}</h2>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />
      )}
      <p>
        <strong>Genre:</strong> {movie.genre || "N/A"}
      </p>
      <p>
        <strong>Director:</strong> {movie.director?.name || "N/A"}
      </p>
      <p>
        <strong>Bio:</strong> {movie.director?.bio || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {movie.description || "N/A"}
      </p>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
    description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};










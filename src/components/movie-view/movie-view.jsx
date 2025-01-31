import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss"; // Import a CSS file for styling (optional)

export const MovieView = ({ movie, onBackClick }) => {
  console.log("MovieView - movie object:", movie); // Debugging log

  return (
    <div className="movie-view-container">
      <button className="back-button" onClick={onBackClick}>
        Back to Movie List
      </button>
      <h2 className="movie-title">{movie.Title || "N/A"}</h2>
      {movie.ImagePath && (
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          className="movie-image"
        />
      )}
      <div className="movie-details">
        <p>
          <strong>Genre:</strong> {movie.Genre?.Name || "N/A"}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director?.Name || "N/A"}
        </p>
        <p>
          <strong>Bio:</strong> {movie.Director?.Bio || "N/A"}
        </p>
        <p>
          <strong>Description:</strong> {movie.Description || "N/A"}
        </p>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    Description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;










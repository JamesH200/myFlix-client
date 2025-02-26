import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate for navigation
import { Button } from "react-bootstrap"; // Import Button from react-bootstrap
import "./movie-view.scss"; // Import a CSS file for styling (optional)

export const MovieView = ({ movies, user, onToggleFavorite }) => {
  const { movieId } = useParams(); // Extract movieId from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Find the movie by ID
  const movie = movies.find((m) => m._id === movieId);

  // If the movie is not found, display an error message
  if (!movie) {
    return <div>Movie not found</div>;
  }

  // Check if the movie is in the user's favorites
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  return (
    <div className="movie-view-container">
      <Button variant="secondary" onClick={() => navigate("/")} className="back-button">
        Back to Movie List
      </Button>
      <h2 className="movie-title">{movie.Title || "N/A"}</h2>
      {movie.ImagePath && (
        <img src={movie.ImagePath} alt={movie.Title} className="movie-image" />
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
      {user && (
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={() => onToggleFavorite(movie._id)}
          className="favorite-button"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      )}
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
  user: PropTypes.object,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default MovieView;
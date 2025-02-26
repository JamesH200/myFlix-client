import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap"; // Import Card from react-bootstrap
import "./movie-card.scss"; // Import a CSS file for styling (optional)

export const MovieCard = ({ movie, user, onToggleFavorite }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  return (
    <Card className="movie-card">
      <Link to={`/movies/${movie._id}`} className="text-decoration-none">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="movie-image" />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
        </Card.Body>
      </Link>
      {user && (
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={() => onToggleFavorite(movie._id)}
          className="mt-2 w-100"
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
      )}
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  onToggleFavorite: PropTypes.func.isRequired, // Mark as required
};

export default MovieCard;
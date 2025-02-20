import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap"; // Import Bootstrap components
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showSignup, setShowSignup] = useState(false);

  // Fetch movies when the user is logged in
  useEffect(() => {
    if (user) {
      const fetchMovies = async () => {
        try {
          console.log("Fetching movies...");
          const response = await fetch("https://mymovieapi-19a25acdbd19.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Fetched movies:", data);
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to load movies. Please try again later.");
        }
      };

      fetchMovies();
    }
  }, [user]);

  // If no user is logged in, display the LoginView or SignupView
  if (!user) {
    return showSignup ? (
      <SignupView onSignedUp={() => setShowSignup(false)} />
    ) : (
      <LoginView
        onLoggedIn={(user, token) => {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          setUser(user);
        }}
        onNavigateToSignup={() => setShowSignup(true)}
      />
    );
  }

  // If a movie is selected, display the MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // If there's an error, display the error message
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // If no movies are available, display a loading message
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading movies...</p>
      </Container>
    );
  }

  // Display the list of movies
  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h1>Movies</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setUser(null);
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
              onMovieClick={() => setSelectedMovie(movie)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
      }),
      Description: PropTypes.string,
      ImagePath: PropTypes.string,
    })
  ),
};
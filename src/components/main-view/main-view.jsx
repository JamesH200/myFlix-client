import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"; // Import the SignupView component
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    // Check localStorage for user data on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showSignup, setShowSignup] = useState(false); // State to toggle between LoginView and SignupView

  // Fetch movies when the user is logged in
  useEffect(() => {
    if (user) {
      const fetchMovies = async () => {
        try {
          console.log("Fetching movies..."); // Debugging log
          const response = await fetch("https://mymovieapi-19a25acdbd19.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Fetched movies:", data); // Debugging log
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
    return <div className="error-message">{error}</div>;
  }

  // If no movies are available, display a loading message
  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>Loading movies...</div>;
  }

  // Display the list of movies
  return (
    <div>
      <h1>Movies</h1>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }}
      >
        Logout
      </button>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </div>
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
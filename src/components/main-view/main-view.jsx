import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view"; // Import ProfileView
import { NavigationBar } from "../navigation-bar/navigation-bar"; // Import NavigationBar
import { Routes, Route, Navigate } from "react-router-dom"; // Correct import
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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

  // Handle adding/removing a movie from favorites
  const handleToggleFavorite = (movieId) => {
    const method = user.FavoriteMovies.includes(movieId) ? "DELETE" : "POST";
    fetch(`https://mymovieapi-19a25acdbd19.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update favorites");
        }
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((e) => {
        console.error("Error updating favorites:", e);
      });
  };

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

  return (
    <>
      <NavigationBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
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
                        user={user}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginView
              onLoggedIn={(user, token) => {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                setUser(user);
              }}
              onNavigateToSignup={() => <Navigate to="/signup" replace />}
            />
          }
        />
        <Route path="/signup" element={<SignupView onSignedUp={() => setUser(null)} />} />
        <Route path="/movies/:movieId" element={<MovieView movies={movies} user={user} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/profile" element={<ProfileView user={user} movies={movies} setUser={setUser} />} />
      </Routes>
    </>
  );
};
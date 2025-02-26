import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://mymovieapi-19a25acdbd19.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          navigate("/"); // Redirect to the home page after login
        } else {
          throw new Error("No such user");
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Submit
          </Button>
          <Button variant="secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
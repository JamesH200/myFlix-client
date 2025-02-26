import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

export const NavigationBar = ({ user, setUser }) => {
  const onLoggedOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Button variant="link" onClick={onLoggedOut}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
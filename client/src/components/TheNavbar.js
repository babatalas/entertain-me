import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function TheNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="container d-flex flex-column flex-md-row justify-content-between">
          <Navbar.Brand>EntertainMe</Navbar.Brand>
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/tv-series">
              Tv Series
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TheNavbar;

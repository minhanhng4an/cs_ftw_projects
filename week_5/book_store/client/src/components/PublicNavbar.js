import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../images/book-store-logo.png";
import githubIco from "../images/github-logo.png";

export const PublicNavbar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        <img src={logo} width="80px" alt="Uku & Lele Bookstore"></img>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/reading">
          Readings
        </Nav.Link>
      </Nav>
      <Nav>
        <a
          href="https://github.com/minhanhng4an/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIco} alt="Github" width="32px" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;

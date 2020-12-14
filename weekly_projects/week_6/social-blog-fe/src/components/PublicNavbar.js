import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import { useSelector } from "react-redux";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} exact={true} to="/">
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        {isAuthenticated ? (
          <>
            <Nav.Link as={NavLink} exact={true} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={NavLink} exact={true} to="/login">
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={NavLink} exact={true} to="/register">
              Register
            </Nav.Link>
            <Nav.Link as={NavLink} exact={true} to="/login">
              Login
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../actions";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };

  const renderLogedInLinks = () => {
    return (
      <Nav className="ml-auto">
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <span onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLogedInLinks = () => {
    return (
      <Nav className="ml-auto">
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/signin" className="nav-item">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-item">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      fixed="top"
      collapseOnSelect="true"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth.authenticate ? renderLogedInLinks() : renderNonLogedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

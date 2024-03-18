import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../styles/header.css";
import logo from "../images/logo.png";
import LoginIcon from "@mui/icons-material/Login";

function Header() {
  const [isScrolled, setScrolled] = useState(false);

  const changeOnScroll = () => {
    if (window.scrollY >= 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", changeOnScroll);

  return (
    <div className={isScrolled ? "sticky" : "nav-bar"}>
      <Navbar expand="lg">
        <Container className="header-container">
          <Navbar.Brand href="/">
            <img
              alt="Logo"
              src={logo}
              className="d-inline-block align-top logo-header"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 toggle-btn"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1 nav-items">
              <Nav.Link href="/" className="nav-links">
                Home
              </Nav.Link>
              <Nav.Link href="/dashboard" className="nav-links">
                Code Editor
              </Nav.Link>
              <Nav.Link href="/admin/home" className="nav-links">
                Courses
              </Nav.Link>
              <Nav.Link href="#link" className="nav-links">
                About
              </Nav.Link>
            </Nav>
            <Button
              variant="outline-light"
              href="/login"
              className="header-btn register"
            >
              Login
              <LoginIcon className="mx-2" fontSize="small" />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

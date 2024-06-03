import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { getGenres } from "../../services";

import "./index.css";

function NavApp() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((res) => {
      if (res && res.errCode === 0) setGenres(res.data ? res.data : []);
    });
  }, []);

  return (
    <Navbar
      expand="md"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Novel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Trang chủ
            </Nav.Link>
            <NavDropdown title="Thể loại" className="novel-genre-dropdown">
              {genres.length > 0 &&
                genres.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={`/search-genre/${item.genre}`}
                  >
                    {item.genre}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link className="text-right text-white" as={Link} to="/signin">
              Sign In/Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavApp;

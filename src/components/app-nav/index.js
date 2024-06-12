import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { IoNutrition } from "react-icons/io5";

import * as genreServices from "../../services/genre.services.js";
import serverSlice, { serverSelector } from "../../store/server.slice.js";
import userSlice, { userSelector } from "../../store/user.slice.js";

import "./index.css";

function NavApp() {
  const [genres, setGenres] = useState([]);

  const server = useSelector(serverSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    genreServices.getGenres(server).then((res) => {
      if (res && !res.error) setGenres(res.data ? res.data : []);
    });
  }, [server]);

  const handleOnChangeServer = (e) => {
    dispatch(serverSlice.actions.serverChange(e.target.value));
  };

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
    localStorage.removeItem("mynovel");
  };

  return (
    <Navbar
      expand="lg"
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
                    to={`/genre/${item.genre}`}
                  >
                    {item.genre}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
          </Nav>
          <Nav className="nav-right">
            <Form.Select value={server} onChange={handleOnChangeServer}>
              <option value={process.env.REACT_APP_URL_BACKEND_1}>
                Server 1
              </option>
              <option value={process.env.REACT_APP_URL_BACKEND_2}>
                Server 2
              </option>
            </Form.Select>
            {!user.isLogin ? (
              <Nav.Link className="text-white" as={Link} to="/signin">
                Đăng nhập
              </Nav.Link>
            ) : (
              <>
                <span>
                  <IoNutrition style={{ fontSize: 20 }} /> {user.username}
                </span>
                <button onClick={handleLogout}>Đăng xuất</button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavApp;

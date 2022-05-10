import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import "./index.css";
import { fetchBlogs } from "./reducers/blogsReducer";
import { loginFromStorageMaybe, logout } from "./reducers/currentUserReducer";
import { Link, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserPage from "./components/UserPage";
import { fetchUsers } from "./reducers/usersReducer";
import BlogPage from "./components/BlogPage";
import { Button, Nav, Navbar } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loginFromStorageMaybe());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="container">
      <Navbar bg="light" className="mt-2 px-2 rounded border">
        <Navbar.Brand>Fullstack Blogs</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {user && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user.name} logged in{" "}
              {
                <Button
                  onClick={logoutHandler}
                  variant="outline-secondary"
                  size="sm"
                  className="ms-2"
                >
                  Log out
                </Button>
              }
            </Navbar.Text>
          </Navbar.Collapse>
        )}
      </Navbar>

      <h2>{user === null ? "Log in to application" : "Blogs"}</h2>

      <Notification />

      <Routes>
        <Route path="/" element={user === null ? <LoginForm /> : <Blogs />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
    </div>
  );
};

export default App;

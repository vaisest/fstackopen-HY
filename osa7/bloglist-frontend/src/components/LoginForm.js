import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../reducers/currentUserReducer";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login(username, password));

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Form onSubmit={handleLogin} id="login-form">
        <Form.Group className="mb-1 w-50" controlId="formUsername">
          <Form.Label className="mb-0">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="title"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="w-50" controlId="formPassword">
          <Form.Label className="mb-0">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="author"
          ></Form.Control>
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="my-2">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

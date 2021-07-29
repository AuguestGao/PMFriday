import React, { useState } from "react";
import { Card, Alert, Button, Form, Container } from "react-bootstrap";
import { auth } from "../../firebase/firebase";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user);
  const history = useHistory();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      setUser({
        email: "",
        password: "",
      });
      setError("");
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const renderSigninForm = () => (
    <Container
      className="d-flex flex-column align-items-center  justify-content-center w-50"
      style={{ minWidth: "300px", maxWidth: "500px", minHeight: "100vh" }}
    >
      <Card className="w-100 p-3">
        <Card.Body>
          <h1 className="text-center">PMFriday</h1>
          <p className="text-center">Personal Project Management Assistant</p>
          <h2 className="text-center" style={{ color: `var(--primaryColor)` }}>
            Sign In
          </h2>
          {error && <Alert variant="warning">{error}</Alert>}
          <Form onSubmit={handleSignin}>
            <Form.Group id="email" className="mt-2 mb-2">
              <Form.Label className="my-auto">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="on"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mt-2 mb-2">
              <Form.Label className="my-auto">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="off"
                required
              />
            </Form.Group>

            <Button
              className="w-100 mt-2 mb-2"
              type="submit"
              style={{
                backgroundColor: `var(--primaryColor)`,
                borderColor: `var(--primaryColor)`,
              }}
            >
              Sign in
            </Button>
          </Form>
        </Card.Body>
        <div className="text-center mb-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </Container>
  );

  return <>{isEmpty(currentUser) ? renderSigninForm() : <Redirect to="/" />}</>;
};

export default Signin;

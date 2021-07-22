import React, { useState } from "react";
import { Card, Alert, Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { auth, createUserProfileDocument } from "../../firebase/firebase";

const Signup = () => {
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (profile.password !== profile.passwordConfirm)
      return setError("Unmatching passwords");

    try {
      setError("");
      const { user } = await auth.createUserWithEmailAndPassword(
        profile.email,
        profile.password
      );
      await createUserProfileDocument(user, {
        displayName: profile.displayName,
      });

      setProfile({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });

      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center  justify-content-center w-50"
      style={{ minWidth: "300px", maxWidth: "500px", minHeight: "100vh" }}
    >
      <Card className="w-100 p-3">
        <Card.Body>
          <h1 className="text-center">PMFriday</h1>
          <p className="text-center">Personal Project Management Assistant</p>
          <h2 className="text-center" style={{ color: `var(--primaryColor)` }}>
            Sign up
          </h2>
          {error && <Alert variant="warning">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group id="displayName" className="mt-2 mb-2">
              <Form.Label className="my-auto">Display Name</Form.Label>
              <Form.Control
                type="etext"
                name="displayName"
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group id="email" className="mt-2 mb-2">
              <Form.Label className="my-auto">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mt-2 mb-2">
              <Form.Label className="my-auto">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group id="passwordConfirm" className="mt-2 mb-2">
              <Form.Label className="my-auto">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                onChange={(e) =>
                  setProfile({ ...profile, passwordConfirm: e.target.value })
                }
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
              Sign up
            </Button>
          </Form>
        </Card.Body>
        <div className="text-center mb-2">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Signup;

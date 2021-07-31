import React from "react";
import { isEmpty } from "lodash";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { auth } from "../../firebase/firebase";

const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleSignout = async () => {
    await auth.signOut();
  };

  return (
    <Navbar
      expand="md"
      className="pt-0 w-100"
      style={{ backgroundColor: `var(--primaryColor)` }}
    >
      <Container className="align-content-baseline">
        <Navbar.Brand className="text-white">PMFriday</Navbar.Brand>
        <Nav>
          {isEmpty(user) ? null : (
            <>
              <Nav.Item className="m-3" onClick={() => history.push("/")}>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item className="m-3" onClick={handleSignout}>
                <Link to="/signin" className="text-white">
                  Sign out
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

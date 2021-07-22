import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { auth } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/ducks/userSlice";
import { useHistory } from "react-router";

const Home = () => {
  const currentUser = useSelector(
    (state) => state.user.currentUser.displayName
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = async () => {
    await auth.signOut();
    dispatch(setCurrentUser("null"));
    history.push("/login");
  };

  return (
    <div>
      <h2 className="text-center">Home Page for {currentUser}</h2>
      <ul>
        {!currentUser ? (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </>
        ) : null}
        <li>
          <Link to="/update-profile">update-profile</Link>
        </li>
      </ul>
      {currentUser ? <Button onClick={handleSignout}>Sign Out</Button> : null}
    </div>
  );
};

export default Home;

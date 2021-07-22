import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useHistory,
} from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { setCurrentUser } from "./redux/ducks/userSlice";
import { useDispatch, useSelector } from "react-redux";

// import Header from "./components/Header/Header.component";
import CardsOverview from "./pages/cards-overview/cards-overview.page";
// import SingleCardPage from "./pages/single-card/single-card.page";
// import NewClientForm from "./components/NewClientForm/NewClientForm.component";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component";

import Signin from "./pages/signin/signin.page";
import Signup from "./pages/signup/signup.page";
import Home from "./pages/tempHome/tempHome.page"; //temp for deving

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);

        userDocRef.onSnapshot((snapshot) => {
          const { displayName, email } = snapshot.data();
          // console.log({ id: snapshot.id, displayName, email }); //temp
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              displayName,
              email,
            })
          );
        });
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return () => unsubscribe();
  }, []);

  // const history = useHistory();

  const handleSignout = async () => {
    // dispatch(setCurrentUser(""));
    await auth.signOut();
    // history.push("/signin");
  };

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        {!currentUser ? (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
          </>
        ) : (
          <>
            <h2>hello, {currentUser.displayName}</h2>
            <button onClick={handleSignout}>Sign out</button>
          </>
        )}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={CardsOverview}
            redirectTo="/signin"
            showAuthedComponent
            currentUser
          />
          {/* <Route exact path="/cards/:cardId" component={SingleCardPage} />
          <Route exact path="/add" component={NewClientForm} /> */}
          <PrivateRoute path="/signin" component={Signin} redirectTo="/" />
          <PrivateRoute path="/signup" component={Signup} redirectTo="/" />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

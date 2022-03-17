import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "./redux/ducks/userSlice";
import { clearCards } from "./redux/ducks/cardsSlice";
import { auth, createUserProfileDocument } from "./firebase/firebase";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import CardsOverview from "./pages/cardsOverview";
import SingleCardPage from "./pages/singleCard";
import { PrivateRoute, Header, Footer } from "./components";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);
        userDocRef.onSnapshot((snapshot) => {
          const { displayName, email, createdAt } = snapshot.data();
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              displayName,
              email,
              createdAt,
            })
          );
        });
      } else {
        dispatch(setCurrentUser(null));
        dispatch(clearCards({ status: "pending", data: {} }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={CardsOverview} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/card/:cardId" component={SingleCardPage} />
          {/* redirect to home if route doesn't exist */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

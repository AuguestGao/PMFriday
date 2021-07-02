import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header.component";
import CardsOverview from "./pages/cards-overview/cards-overview.page.jsx";
import SingleCardPage from "./pages/single-card/single-card.page";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={CardsOverview} />
          <Route exact path="/cards/:cardId" component={SingleCardPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

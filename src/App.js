import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header.component";
import CardsOverview from "./pages/cards-overview/cards-overview.page.jsx";
import SingleCardPage from "./pages/single-card/single-card.page";
import NewClientForm from "./components/NewClientForm/NewClientForm.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={CardsOverview} />
          <Route exact path="/cards/:cardId" component={SingleCardPage} />
          <Route exact path="/add" component={NewClientForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

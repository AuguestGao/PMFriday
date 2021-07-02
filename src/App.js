import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CardsOverview from "./pages/cards-overview/cards-overview.page.jsx";
import CardDetailPage from "./pages/card-detail/card-detail.page";
import Header from "./components/Header/Header.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={CardsOverview} />
          <Route exact path="/cards/:cardId" component={CardDetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

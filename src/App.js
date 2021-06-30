import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import CardsOverview from "./pages/cards-overview/cards-overview.page.jsx";
import CardDetailPage from "./pages/card-detail/card-detail.page";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={CardsOverview} />
					<Route exact path="/cards/:cardId" component={CardDetailPage} />
				</Switch>
			</div>
			{/* <Redirect to='/' /> */}
		</Router>
	);
}

export default App;

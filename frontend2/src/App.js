import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HotDeals from "./pages/HotDeals";
import AddProduct from "./pages/AddProduct";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={HotDeals} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;

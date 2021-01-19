import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import HotDeals from "./pages/HotDeals";
import SearchPage from "./pages/searchPage";
import DetailedProductShop from "./pages/DetailedProductShop";
import NavBar from "./pages/NavBar";
import AddProductShop from "./pages/AddProductShop";
import Shops from "./pages/Shops";
import ProductsInShop from "./pages/ProductsInShop";

const App = () => {
	return (
		<Router>
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path="/" component={HotDeals} />
					<Route exact path="/search_product_shop" component={SearchPage} />
					<Route
						exact
						path="/products_shop/product"
						component={AddProductShop}
					/>
					<Route
						path="/product_shop/product/:productId"
						component={DetailedProductShop}
					/>
					<Route path="/shops/all" component={Shops}></Route>
					<Route
						path="/shops/:shopId/products"
						component={ProductsInShop}
					></Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

import React, { useState, useEffect } from "react";

import SearchProduct from "./SearchProduct";
import AddProduct from "./AddProduct";
import AddShop from "./AddShop";
import AddProductShop from "./AddProductShop";
import ProductCard from "./ProductCard";

import axios from "axios";

const HotDeals = () => {
	const [hotDeals, setHotDeals] = useState([]);
	const [location, setLocation] = useState({});

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};

	const getHotDeals = (latitude, longitude) => {
		axios
			.get(
				`http://localhost:8000/hot_deals/?latitude=${latitude}&longitude=${longitude}`
			)
			.then((res) => {
				console.log(res.data);
				setHotDeals(res.data);
			});
	};

	const searchProduct = (item) => {
		const { latitude, longitude } = location;

		axios
			.get(
				`http://localhost:8000/product_shop/?latitude=${latitude}&longitude=${longitude}&search=${item}`
			)
			.then((res) => {
				console.log(res.data);
				// setShops(res.data);
			});
	};

	const getShops = () => {
		axios.get("http://localhost:8000/shops").then((res) => {
			console.log(res.data);
			// setShops(res.data);
		});
	};

	const getProducts = () => {
		axios.get("http://localhost:8000/products").then((res) => {
			console.log(res.data);
			// setShops(res.data);
		});
	};

	const toRowsandCols = (data, cols) => {
		var table = [],
			i,
			k;

		for (i = 0, k = -1; i < data.length; i++) {
			if (i % cols === 0) {
				k++;
				table[k] = [];
			}

			table[k].push(data[i]);
		}
		console.log(table);
		return table;
	};

	const getLocationAndHotDeals = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;

			setLocation({
				latitude,
				longitude,
			});

			console.log(latitude, longitude);

			getHotDeals(latitude, longitude);
		});
	};

	useEffect(() => {
		getLocationAndHotDeals();
	}, []);

	const hotDealRowItems = toRowsandCols(hotDeals, 4);
	return (
		<div className="container">
			<h1>Hot Deals</h1>

			{hotDealRowItems.map((rowItem) => (
				<div className="row">
					{rowItem.map((colItem) => (
						<ProductCard item={colItem} />
					))}
				</div>
			))}

			<SearchProduct />
			<AddProduct />
			<AddShop />
			<AddProductShop />
		</div>
	);
};

export default HotDeals;

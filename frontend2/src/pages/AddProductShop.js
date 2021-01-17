import React, { useState, useEffect } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import axios from "axios";

const AddProductShop = () => {
	const [shops, setShops] = useState([]);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState([]);
	const [shop, setShop] = useState("");
	const [price, setPrice] = useState("");
	const handleAddProductShop = () => {
		axios
			.post("http://localhost:8000/product_shop/product/", {
				shop: shop,
				product: product,
				price: price,
			})
			.then((res) => {
				console.log(res);
			});
	};

	useEffect(() => {
		axios.get("http://localhost:8000/shops/").then((res) => {
			console.log(res.data);
			setShops(res.data);
		});

		axios.get("http://localhost:8000/products/").then((res) => {
			console.log(res.data);
			setProducts(res.data);
		});
	}, []);

	const handleShopSearch = (value) => {
		setShop(value);
		console.log(value);
	};

	const handleProductSearch = (value) => {
		setProduct(value);
		console.log(value);
	};

	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	};

	return (
		<div className="container">
			<SelectSearch
				options={products.map(({ name, id }) => ({ value: id, name: name }))}
				search
				placeholder="Select product"
				onChange={(value) => handleProductSearch(value)}
				printOptions={"on-focus"}
			/>

			<SelectSearch
				options={shops.map(({ name, id }) => ({ value: id, name: name }))}
				search
				placeholder="Select shop"
				onChange={(value) => handleShopSearch(value)}
				printOptions={"on-focus"}
			/>

			<input
				name="price"
				type="text"
				placeholder="Enter price"
				value={price}
				onChange={(e) => handlePriceChange(e)}
			/>
			<button onClick={handleAddProductShop}>Add item</button>
		</div>
	);
};

export default AddProductShop;

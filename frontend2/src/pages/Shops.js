import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";

const Shops = () => {
	const [shops, setShops] = useState([]);
	const [shopId, setShopId] = useState(-1);

	useEffect(() => {
		getShops();
	}, []);

	const getShops = () => {
		axios.get("http://localhost:8000/shops/").then((res) => {
			console.log(res.data);
			setShops(res.data);
		});
	};

	return (
		<div>
			Shops
			<SelectSearch
				options={shops.map(({ name, id }) => ({
					value: id,
					name: name,
				}))}
				search
				placeholder="Select shop"
				onChange={(value) => setShopId(value)}
				printOptions={"on-focus"}
			/>
			{shopId && <ShopCard shopId={shopId} />}
		</div>
	);
};

export default Shops;

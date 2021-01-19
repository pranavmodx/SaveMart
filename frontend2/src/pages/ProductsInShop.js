import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsInShop = (props) => {
	const [products, setProducts] = useState([]);
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

	useEffect(() => {
		const id = props.match.url.split("/")[2];
		axios
			.get(`http://localhost:8000/product_shop/product/?search=${id}`)
			.then((res) => {
				console.log(res.data);
				setProducts(res.data);
			});
	}, []);

	const productsRowItems = toRowsandCols(products, 4);
	return (
		<div className="container">
			{productsRowItems.map((rowItem) => (
				<div className="row">
					{rowItem.map((colItem) => (
						<ProductCard item={colItem} />
					))}
				</div>
			))}
		</div>
	);
};

export default ProductsInShop;

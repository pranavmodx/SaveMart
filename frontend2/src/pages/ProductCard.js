import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
	const { address, distance, id, image, price, product, shop } = item;
	return (
		<div className="col-lg-3">
			<div className="card">
				<img src={item.image} alt={item.product} width="100" height="100"></img>
				<div className="card card-body">
					<div className="row">{product}</div>
					<div className="row">{price}</div>
					<div className="row">{shop}</div>
					<div className="row">{distance}</div>
					<Link to={`/product_shop/product/${id}`} className="btn btn-primary">
						View
					</Link>
					</div>
			</div>
		</div>
	);
};

export default ProductCard;

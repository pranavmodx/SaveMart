import React, { useState, useEffect } from "react";

const ProductCard = ({ item }) => {
	const { address, distance, id, image, price, product, shop } = item;
	return (
		<div className="col-lg-3">
			<div class="card text-left border border-black">
				<img src={item.image} alt={item.product} width="100" height="100"></img>
				<div class="card card-body row">
					<p class="card-text">{product}</p>
					<div class="list-group list-group-flush ">
						<div className="row">{price}</div>
						<div className="row">{shop}</div>
						<div className="row">{distance}</div>
					</div>
					<a href="#" class="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

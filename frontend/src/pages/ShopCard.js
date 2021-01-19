import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ShopCard = ({ shopId }) => {
	const getShop = () => {
		axios.get(`http://localhost:8000/shops/${shopId}`).then((res) => {
			console.log(res.data);
			setShop(res.data);
		});
	};

	const [shop, setShop] = useState({});
	const { id, name, address, owner, phone_no } = shop;

	useEffect(() => {
		getShop();
	}, [shopId]);

	return (
		<div className="col-lg-3">
			<div className="card">
				{/* <img src={item.image} alt={item.product} width="100" height="100"></img> */}
				<div className="card card-body">
					<div className="row">{name}</div>
					<div className="row">{address}</div>
					<div className="row">{owner}</div>
					<div className="row">{phone_no}</div>
				</div>
				<Link to={`/shops/${shopId}/products`}>See Products</Link>
			</div>
		</div>
	);
};

export default ShopCard;

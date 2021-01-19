import React, { useState, useEffect } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import axios from "axios";
import AddProduct from "./AddProduct";
import AddShop from "./AddShop";

const AddProductShop = () => {
	const [shops, setShops] = useState([]);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState([]);
	const [shop, setShop] = useState("");
	const [price, setPrice] = useState("");
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [showAddShop, setShowAddShop] = useState(false);

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
	const getProducts = () => {
		axios.get("http://localhost:8000/shops/").then((res) => {
			console.log(res.data);
			setShops(res.data);
		});
	};

	const getShops = () => {
		axios.get("http://localhost:8000/products/").then((res) => {
			console.log(res.data);
			setProducts(res.data);
		});
	};

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

	useEffect(() => {
		getProducts();
		getShops();
	}, []);

	return (
		<div className="container">
			{showAddProduct && (
				<AddProduct
					setShowAddProduct={setShowAddProduct}
					setProducts={setProducts}
					products={products}
				/>
			)}
			{showAddShop && (
				<AddShop
					setShowAddShop={setShowAddShop}
					shops={shops}
					setShops={setShops}
				/>
			)}
			<div
				className="mainbox card col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
				style={{ marginTop: "50px" }}
			>
				<div class="panel">
					<div class="panel-heading" style={{ marginTop: "25px" }}>
						<div class="panel-title">Add an item to a shop</div>
					</div>
					<div style={{ paddingTop: "30px" }} class="panel-body">
						<div className="form-horizontal">
							<div className="form-inline" style={{ marginBottom: "25px" }}>
								<div class="form-group">
									<SelectSearch
										options={products.map(({ name, id }) => ({
											value: id,
											name: name,
										}))}
										search
										placeholder="Select product"
										onChange={(value) => handleProductSearch(value)}
										printOptions={"on-focus"}
									/>
								</div>

								<button
									className="btn btn-primary"
									onClick={() => {
										setShowAddProduct(true);
									}}
								>
									+
								</button>
							</div>

							<div className="form-inline" style={{ marginBottom: "25px" }}>
								<div class="form-group">
									<SelectSearch
										options={shops.map(({ name, id }) => ({
											value: id,
											name: name,
										}))}
										search
										placeholder="Select shop"
										onChange={(value) => handleShopSearch(value)}
										printOptions={"on-focus"}
									/>
								</div>
								<button
									className="btn btn-primary"
									onClick={() => {
										setShowAddShop(true);
									}}
								>
									+
								</button>
							</div>
							<div className="input-group" style={{ marginBottom: "25px" }}>
								<input
									name="price"
									className="form-control"
									type="text"
									placeholder="Enter price"
									value={price}
									onChange={(e) => handlePriceChange(e)}
								/>
							</div>
							<div
								className="form-group"
								style={{ marginBottom: "25px", alignContent: "end" }}
							>
								<button
									onClick={handleAddProductShop}
									className="btn btn-primary mb-2"
								>
									Add item
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProductShop;

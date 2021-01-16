import React, { useState } from "react";

import axios from "axios";

const AddProduct = () => {
	const handleAddProduct = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/products/", {
				name: name,
			})
			.then((res) => {
				console.log(res);
			});
	};

	const [name, setName] = useState("");
	const onChange = (e) => {
		setName(e.target.value);
	};

	return (
		// <div>
		//   <button onClick={handleAddProduct}>Add Product</button>
		// </div>
		<form onSubmit={handleAddProduct}>
			<div class="mb-3">
				<label for="exampleInputEmail1" class="form-label">
					Product name
				</label>
				<input
					name="name"
					type="text"
					placeholder="enter product name"
					value={name}
					onChange={(e) => onChange(e)}
				/>
			</div>
			<button type="submit" class="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default AddProduct;

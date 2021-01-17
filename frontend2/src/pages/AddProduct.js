import React, { useState, useEffect } from "react";

import axios from "axios";

const AddProduct = ({ setShowAddProduct }) => {
	const handleAddProduct = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/products/", {
				name: name,
			})
			.then((res) => {
				console.log(res);
				setShowAddProduct(false);
			});
	};

	const [name, setName] = useState("");
	const onChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div
			className="modal"
			tabindex="-1"
			role="dialog"
			style={{ display: "block" }}
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="col">Add Product</h5>
						<div className="col">
							<button
								type="button"
								class="close"
								onClick={() => {
									setShowAddProduct(false);
								}}
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</div>
					<div class="modal-body">
						<div className="input-group" style={{ marginBottom: "25px" }}>
							<label for="name" class="form-label">
								Product name
							</label>
							<input
								name="name"
								type="text"
								placeholder="enter product name"
								className="form-control"
								value={name}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							onClick={() => {
								setShowAddProduct(false);
							}}
						>
							Close
						</button>
						<button
							type="button"
							class="btn btn-primary"
							onClick={handleAddProduct}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
		// <form onSubmit={handleAddProduct}>
		// 	<div class="mb-3">
		// 		<label for="exampleInputEmail1" class="form-label">
		// 			Product name
		// 		</label>
		// 		<input
		// 			name="name"
		// 			type="text"
		// 			placeholder="enter product name"
		// 			value={name}
		// 			onChange={(e) => onChange(e)}
		// 		/>
		// 	</div>
		// 	<button type="submit" class="btn btn-primary">
		// 		Submit
		// 	</button>
		// </form>
	);
};

export default AddProduct;

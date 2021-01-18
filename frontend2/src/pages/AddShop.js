import React, { useState } from "react";

import axios from "axios";

const AddShop = ({ setShowAddShop }) => {
	const handleAddShop = () => {
		axios
			.post("http://localhost:8000/shops/", {
				name: "Test Shop",
				address: "Test address, Near Test address, Ernakulam",
				longitude: "76.34608299999999",
				latitude: "9.944607",
				owner: "Test owner",
				phone_no: "9876543210",
			})
			.then((res) => {
				console.log(res);
			});
	};

	const [address, setAdress] = useState("");
	const [options, setOptions] = useState([]);
	const onChange = (e) => {
		const address = e.target.value;
		setAdress(address);
		axios
			.get(
				`https://api.locationiq.com/v1/autocomplete.php?key=pk.97cbc82fbfaf4fd20df52e556c03bb1e&q=${address}`
			)
			.then((res) => {
				console.log(res);
				setOptions(res.data);
			});
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
						<h5 className="col">Add Shop</h5>
						<div className="col">
							<button
								type="button"
								class="close"
								onClick={() => {
									setShowAddShop(false);
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
								Shop Address
							</label>
							<input
								name="address"
								type="text"
								placeholder="enter shop address"
								className="form-control"
								value={address}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							onClick={() => {
								setShowAddShop(false);
							}}
						>
							Close
						</button>
						<button
							type="button"
							class="btn btn-primary"
							onClick={handleAddShop}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddShop;

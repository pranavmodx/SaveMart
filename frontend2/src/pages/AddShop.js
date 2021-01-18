import React, { useState } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
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
	const [shop, setShop] = useState({});
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

							<SelectSearch
								options={options.map(({ name, value }) => ({
									value: value,
									name: name,
								}))}
								getOptions={(query) => {
									return new Promise((resolve, reject) => {
										fetch(
											`https://api.locationiq.com/v1/autocomplete.php?key=pk.97cbc82fbfaf4fd20df52e556c03bb1e&q=${query}`
										)
											.then((response) => response.json())
											.then((res) => {
												const op = res.map(
													(
														{
															address: { name, city, road, state, country },
															lat,
															lon,
														},
														id
													) => ({
														value: {
															latitude: lat,
															longitude: lon,
															name: name,
															address: `${name},${city},${road},${state},${country}`,
														},
														name: `${name},${city},${road},${state},${country}`,
													})
												);
												setOptions(op);
												resolve(op);
											})
											.catch(reject);
									});
								}}
								onChange={({ latitude, longitude, name, address }) =>
									setShop({
										name: name,
										address: address,
										latitude: latitude,
										longitude: longitude,
									})
								}
								search
								placeholder="search shop address"
								printOptions={"on-focus"}
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

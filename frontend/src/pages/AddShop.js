import React, { useState } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import axios from "axios";

const AddShop = ({ setShowAddShop, shops, setShops }) => {
	const handleAddShop = () => {
		console.log(shop);
		axios.post("http://localhost:8000/shops/", shop).then((res) => {
			console.log(res);
			setShops([...shops, res.data]);
			setShowAddShop(false);
		});
	};

	const [options, setOptions] = useState([]);
	const [shop, setShop] = useState({});

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
															address: { name, city, state },
															lat,
															lon,
														},
														id
													) => ({
														value: {
															latitude: lat,
															longitude: lon,
															name: name,
															address: `${name},${city},${state}`,
														},
														name: `${name},${city},${state}`,
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

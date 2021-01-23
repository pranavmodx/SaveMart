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
    <div className="container">
      <div className="card">
        <div
          className="card card-body"
          style={{ textAlign: "left", padding: "20px" }}
        >
          <div className="row" style={{marginBottom: "10px"}}>
            <h5>
              <strong>Shop Name:</strong> {name}
            </h5>
          </div>
          <div className="row">
            <h6>
              <strong>Address:</strong> {address}
            </h6>
          </div>
          <div className="row">
            <h6>
              <strong>Owner:</strong> Mr. Vasudevan Nair
            </h6>
          </div>
          <div className="row">
            <h6>
              <strong>Phone No:</strong> +91 8393593455
            </h6>
          </div>
        </div>
      </div>
      <Link to={`/shops/${shopId}/products`} className="btn btn-primary">
        See Products
      </Link>
    </div>
  );
};

export default ShopCard;

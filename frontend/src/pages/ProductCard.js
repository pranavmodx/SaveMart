import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { address, distance, id, image, price, product, shop } = item;
  return (
    <div className="col-lg-3">
      <div className="card">
        <img src={image} alt={product} width="200" height="200"></img>
        <div className="card card-body" style={{textAlign: "left", paddingLeft: "30px"}}>
					<br></br>
          <div className="row">
            <h5>Product : {product}</h5>
          </div>
          <div className="row">
            <h6>Price : Rs. {price}</h6>
          </div>
          <div className="row">
            <h6>Shop : {shop}</h6>
          </div>
          <div className="row">
            <h6>Distance : {distance}</h6>
          </div>
					<br></br>
          <Link to={`/product_shop/product/${id}`} className="btn btn-primary" style={{marginBottom: "30px", marginLeft: "35px"}}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

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
          <div className="row" style={{marginBottom: "10px"}}>
            <h5><strong>Product</strong> : {product}</h5>
          </div>
          <div className="row">
            <h6><strong>Price</strong> : Rs. {price}</h6>
          </div>
          <div className="row">
            <h6><strong>Shop</strong> : {shop}</h6>
          </div>
          <div className="row">
            <h6><strong>Distance</strong> : {distance}</h6>
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

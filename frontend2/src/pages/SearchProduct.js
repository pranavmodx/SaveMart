import React, { useState } from "react";

import axios from "axios";

import "./SearchProduct.css";

const SearchProduct = () => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const getProducts = () => {
    axios
      .get(
        `http://localhost:8000/product_shop/?latitude=9.944607&longitude=76.346083&search=${searchInput}`
      )
      .then((res) => {
        setProducts(res.data);
      });
  };

  return (
    <div>
      <input
        name="text"
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => handleSearchInput(e)}
      />
      <button onClick={getProducts}>Search</button>
      {products.length !== 0 && 
        products.map((product) =>
          <> 
            <h3>Product : {product.product} </h3>
            <img src={product.image} alt={product.product} width="200" height="200"></img>
            <h3>Price : {product.price} </h3>
            <h3>Shop : {product.shop} </h3>
          </>
        )
      }
    </div>
  );
};

export default SearchProduct;

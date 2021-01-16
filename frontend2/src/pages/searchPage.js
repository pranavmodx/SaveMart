import React, { useState, useEffect } from "react";

import axios from "axios";

import ProductCard from "./ProductCard";

const SearchPage = (props) => {
  const [searchInput, setSearchInput] = useState(
    props.location.state.searchInput || ""
  );
  const [products, setProducts] = useState([]);

  console.log(props.location.state.searchInput);

  useEffect(() => {
    if (searchInput !== "")
      getProducts();
  }, []);

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

  const toRowsandCols = (data, cols) => {
    var table = [],
      i,
      k;

    for (i = 0, k = -1; i < data.length; i++) {
      if (i % cols === 0) {
        k++;
        table[k] = [];
      }

      table[k].push(data[i]);
    }
    console.log(table);
    return table;
  };

  const productShops = toRowsandCols(products, 4);

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
        productShops.map((rowItem) => (
          <div className="row">
            {rowItem.map((colItem) => (
              <ProductCard item={colItem} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default SearchPage;

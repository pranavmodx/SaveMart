import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SearchProduct.css";

const SearchProduct = () => {
  const [searchInput, setSearchInput] = useState("");

  const history = useHistory();

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = () => {
    history.push({
      pathname: "/search_product_shop",
      state: {
        searchInput,
      },
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
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchProduct;

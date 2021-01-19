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
    <div
      class="form-group"
      style={{
        width: "45%",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row",
        margin: "auto",
      }}
    >
      <input
        type="text"
        class="form-control"
        placeholder="Enter product name"
        value={searchInput}
        onChange={(e) => handleSearchInput(e)}
        style={{ marginRight: "20px" }}
      />
      <button onClick={onSearch} className="btn btn-primary">
        <i class="fa fa-search fa-lg" aria-hidden="true"></i> &nbsp;
        Search
      </button>
    </div>
  );
};

export default SearchProduct;

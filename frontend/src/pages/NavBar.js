import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        <h1>SaveMart</h1>
      </Link>
      <ul
        className="nav navbar-nav navbar-right"
        style={{ display: "flex", float: "right", marginTop: "10px" }}
      >
        <li>
          <Link
            to="/products_shop/product"
            className="btn btn-primary"
            style={{ marginRight: "20px" }}
          >
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/shops/all" className="btn btn-primary">
            Search Shops
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

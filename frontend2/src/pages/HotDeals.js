import React, { useState, useEffect } from "react";

import SearchProduct from "./SearchProduct";

import axios from "axios";

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const [location, setLocation] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const getHotDeals = (latitude, longitude) => {
    axios
      .get(
        `http://localhost:8000/hot_deals/?latitude=${latitude}&longitude=${longitude}`
      )
      .then((res) => {
        console.log(res.data);
        setHotDeals(res.data);
      });
  };

  const searchProduct = (item) => {
    const { latitude, longitude } = location;

    axios
      .get(
        `http://localhost:8000/product_shop/?latitude=${latitude}&longitude=${longitude}&search=${item}`
      )
      .then((res) => {
        console.log(res.data);
        // setShops(res.data);
      });
  };

  const getShops = () => {
    axios.get("http://localhost:8000/shops").then((res) => {
      console.log(res.data);
      // setShops(res.data);
    });
  };

  const getProducts = () => {
    axios.get("http://localhost:8000/products").then((res) => {
      console.log(res.data);
      // setShops(res.data);
    });
  };

  const getLocationAndHotDeals = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLocation({
        latitude,
        longitude,
      });

      console.log(latitude, longitude);

      getHotDeals(latitude, longitude);
    });
  };

  useEffect(() => {
    getLocationAndHotDeals();
  }, []);

  return (
    <div>
      <h1>Hot Deals</h1> 
      {hotDeals.map((item) => 
        <> 
          <h3>Product Name : {item.product}</h3>
          <h3>Shop : {item.shop}</h3>
        </>
      ) }
      <SearchProduct />
    </div>
  );
};

export default HotDeals;

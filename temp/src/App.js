import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });
  }

  const getHotDeals = (latitude, longitude) => {
    axios.get(`http://localhost:8000/hot_deals/?latitude=${9.9444596}&longitude=${76.3426921}`).then((res) => {
      console.log(res.data);
      setShops(res.data);
    });
  }

  const getShops = () => { 
    axios.get("http://localhost:8000/shops").then((res) => {
      console.log(res.data);
      setShops(res.data);
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(latitude, longitude);
      getHotDeals(latitude, longitude);
    });
		
  }, []);
  
  return (
    <div className="App">
      <h1>SaveMart</h1>
      {shops &&
        shops.map((shop) => (
          <>
            <h2>{shop.name}</h2>
            <h2>{shop.owner}</h2>
          </>
        ))}
    </div>
  );
}

export default App;

import React from "react";

import axios from "axios";

const AddShop = () => {
  const handleAddShop = () => {
    axios
      .post(
        "http://localhost:8000/shops/",
        {
          name:"Test Shop",
          address:"Test address, Near Test address, Ernakulam", 
          longitude:"76.34608299999999", 
          latitude:"9.944607",
          owner:"Test owner",
          phone_no:"9876543210"
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <button onClick={handleAddShop}>Add Shop</button>
    </div>
  );
};

export default AddShop;

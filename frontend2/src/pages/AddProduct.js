import React from "react";

import axios from "axios";

const AddProduct = () => {
  const handleAddProduct = () => {
    axios
      .post(
        "http://localhost:8000/products/",
        {
          name: "XYZ",
        }  
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;

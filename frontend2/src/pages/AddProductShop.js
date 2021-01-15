import React from "react";

import axios from "axios";

const AddProductShop = () => {
  const handleAddProductShop = () => {
    axios
      .post("http://localhost:8000/product_shop/product/", {
        shop: 2,
        product: 1,
        price: 100,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <button onClick={handleAddProductShop}>Add Product Shop</button>
    </div>
  );
};

export default AddProductShop;

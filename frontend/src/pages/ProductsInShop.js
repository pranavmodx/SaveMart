import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsInShop = (props) => {
	const id = props.match.url.split("/")[2];

  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product_shop/product/?search=${id}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

  const productsRowItems = toRowsandCols(products, 4);
  return (
    <div className="container">
      <br></br>
      <h3>Products in <strong>Kammath Vegetables</strong></h3>
      <hr></hr>
      <br></br>
      {productsRowItems.map((rowItem) => (
        <div className="row">
          {rowItem.map((colItem) => (
            <ProductCard item={colItem} showDist={false} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductsInShop;

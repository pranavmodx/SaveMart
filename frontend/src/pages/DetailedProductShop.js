import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";

const DetailedProductShop = ({ match }) => {
  console.log(match);

  const history = useHistory();

  const [priceInput, setPriceInput] = useState(0);
  const [enablePriceInput, setEnablePriceInput] = useState(false);

  const [productShop, setProductShop] = useState({});

  const updatePrice = () => {
    setEnablePriceInput(true);
  };

  const saveUpdate = () => {
    axios
      .patch(`http://localhost:8000${match.url}/`, {
        price: priceInput,
      })
      .then((res) => {
        setEnablePriceInput(false);
        setProductShop({ ...productShop, price: priceInput });
      })
      .catch((err) => {
        setPriceInput(productShop.price);
      });
  };

  const cancelUpdate = () => {
    setEnablePriceInput(false);
    setPriceInput(productShop.price);
  };

  const deleteProductShop = () => {
    axios.delete(`http://localhost:8000${match.url}/`).then((res) => {
      console.log(res);
      history.push('/');
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000${match.url}/`).then((res) => {
      console.log(res.data);
      setProductShop(res.data);
      setPriceInput(res.data.price);
    });
  }, []);

  const { address, id, image, price, product, shop } = productShop;
  return (
    <div className="card">
      <img src={image} alt={product} width="100" height="100"></img>
      <div className="card card-body">
        <div className="row">{product}</div>
        <input
          type="text"
          value={priceInput}
          disabled={!enablePriceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
        <button onClick={updatePrice} hidden={enablePriceInput}>
          Update Price
        </button>
        <div className="row">{shop}</div>
        <div className="row">{address}</div>
      </div>
      {enablePriceInput && (
        <>
          <button onClick={saveUpdate}>Save</button>
          <button onClick={cancelUpdate}>Cancel</button>
        </>
      )}
      <button onClick={deleteProductShop}>Delete</button>
    </div>
  );
};

export default DetailedProductShop;

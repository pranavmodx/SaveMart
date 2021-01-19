import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
      history.push("/");
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000${match.url}/`).then((res) => {
      console.log(res.data);
      setProductShop(res.data);
      setPriceInput(res.data.price);
    });
  }, []);

  const { address, id, image, price, product, shop } = productShop;
  return (
    <div className="container">
      <br></br>
      <br></br>
      <div className="card" style={{ width: "50%", margin: "auto" }}>
        <br></br>
        <img src={image} alt={product} width="200" height="200"></img>
        <br></br>
        <br></br>
        <div
          className="card card-body"
          style={{ textAlign: "left", paddingLeft: "50px" }}
        >
          <br></br>
          <div className="row">
            <h4>
              <strong>Product:</strong> {product}
            </h4>
          </div>
          <br></br>
          <div
            class="form-group row"
            style={{
              width: "50%",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <label
              for="price"
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              <h5>
                <strong>Price:</strong>
              </h5>
            </label>
            <input
              type="text"
              id="price"
              class="form-control"
              placeholder="Enter price"
              value={priceInput}
              disabled={!enablePriceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              style={{ marginRight: "20px", height: "40px" }}
            />
            <button
              onClick={updatePrice}
              hidden={enablePriceInput}
              className="btn btn-primary"
              style={{ height: "40px" }}
            >
              Update
            </button>
          </div>

          {/* <input
            type="text"
            value={priceInput}
            disabled={!enablePriceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <button onClick={updatePrice} hidden={enablePriceInput}>
            Update Price
          </button> */}

          <div className="row">
            <h5>
              <strong>Shop:</strong>&nbsp;{shop}
            </h5>
          </div>
          <div className="row">
            <h5>
              <strong>Address:</strong>&nbsp;{address}
            </h5>
          </div>
          <br></br>
          <div className="row">
            <button className="btn btn-danger" onClick={deleteProductShop}>
              Delete Product
            </button>
          </div>
          <br></br>
        </div>
        {enablePriceInput && (
          <>
            <button onClick={saveUpdate}>Save</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedProductShop;

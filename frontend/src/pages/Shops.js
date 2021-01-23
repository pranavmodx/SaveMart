import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState(-1);

  useEffect(() => {
    getShops();
  }, []);

  const getShops = () => {
    axios.get("http://localhost:8000/shops/").then((res) => {
      console.log(res.data);
      setShops(res.data);
    });
  };

  return (
    <div className="container">
      <div
        className="mainbox card col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
        style={{ marginTop: "50px" }}
      >
        <div class="panel">
          <div class="panel-heading" style={{ marginTop: "25px" }}>
            <div class="panel-title">
              <h4>Search Shops</h4>
            </div>
          </div>
          <hr></hr>
          <div style={{ paddingTop: "30px" }} class="panel-body">
            <div className="form-horizontal">
              <div className="form-inline" style={{ marginBottom: "25px" }}>
                <div class="form-group">
                  <SelectSearch
                    options={shops.map(({ name, id }) => ({
                      value: id,
                      name: name,
                    }))}
                    search
                    placeholder="Select shop"
                    onChange={(value) => setShopId(value)}
                    printOptions={"on-focus"}
                  />
                </div>
								<br></br>
								<br></br>
                <div class="form-group" style={{width: "75%"}}>
                  {shopId !== -1 && <ShopCard shopId={shopId} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;

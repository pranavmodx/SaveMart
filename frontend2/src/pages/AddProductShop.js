import React from "react";
import SelectSearch from 'react-select-search';
import axios from "axios";

const AddProductShop = () => {
  const [shops, setShops] = useState([])
  const [products, setProducts] = useState([])
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

  useEffect(() => {
    axios.get("http://localhost:8000/shops/").then((res) => {
      console.log(res.data);
      setShops(res.data);
    });

    axios.get("http://localhost:8000/products/").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, [])

  return (
    <div>
      <SelectSearch
        options={countries}
        multiple
        search
        placeholder="Select your country"
    />
      <button onClick={handleAddProductShop}>Add Product Shop</button>
    </div>
  );
};

export default AddProductShop;

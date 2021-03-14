import React, { useState, useEffect, useContext } from "react";
import { FetchProducts } from "../../utils/FetchProducts";
import { Product } from "../Product/Product";
import { Context } from "../../utils/Context";
import "../../index.scss";

const App = () => {
  const [totalPrice, setTotalPrice] = useContext(Context);
  const [products, setProducts] = useState("");

  // Products have possible minimum quantity and it's not possible to update totalPrice while rendering app
  // Get price of every product * min and add it to total, after rendering app add it to TotalPrice
  const [productPrice, setProductPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [pid, setPid] = useState("");

  useEffect(() => {
    const displayProductList = async () => {
      const fetchedProducts = await FetchProducts();
      setProducts(
        fetchedProducts.map((product) => {
          setProductPrice(parseFloat(product.price) * product.min);
          setPid(product.pid);
          return (
            <Product
              key={product.pid}
              pid={product.pid}
              name={product.name}
              price={product.price}
              min={product.min ? product.min : 1}
              max={product.max ? product.max : 999}
              isBlocked={product.isBlocked ? product.isBlocked : false}
            />
          );
        })
      );
    };
    displayProductList();
  }, []);

  // Update total on id change
  useEffect(() => {
    setTotal(total + productPrice);
  }, [pid]);

  return (
    <>
      <div className="cart">
        <div className="cart__title">Lista produktów</div>
        {products}
        <div className="cart__total-price">
          <span className="cart__total-price__text">Suma produktów: </span>
          <span className="cart__total-price__ammount">
            {(Math.round((total + totalPrice) * 100) / 100).toFixed(2)}{" "}
            <sup className="cost__currency">PLN</sup>
          </span>
        </div>
      </div>
    </>
  );
};

export { App };

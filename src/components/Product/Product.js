import React, { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../utils/Context";
import { AdjustText } from "../../utils/AdjustText";
import { AdjustButton } from "../../utils/AdjustButton";
import { ValidationCheck } from "../../utils/ValidationCheck";
import { debounce } from "lodash";

export const Product = ({ pid, name, price, min, max, isBlocked }) => {
  const [totalPrice, setTotalPrice] = useContext(Context);
  const [count, setCount] = useState(min);
  const [text, setText] = useState("");
  const [initialRender, isInitialRender] = useState(true);
  const [buttonClass, setButtonClass] = useState({
    plus: "product__main__button",
    minus: "product__main__button--disabled",
  });
  const debouncedValidation = useCallback(
    debounce(
      (pid, count, totalPrice) =>
        ValidationCheck(
          pid,
          count,
          setCount,
          min,
          price,
          totalPrice,
          setTotalPrice
        ),
      1000
    ),
    []
  );
  useEffect(() => {
    AdjustText(count, setText);
    AdjustButton(min, max, count, setButtonClass);
    if (initialRender) {
      isInitialRender(false);
      if (isBlocked) {
        setButtonClass({
          plus: "counter__button--disabled",
          minus: "counter__button--disabled",
        });
      }
    } else {
      isInitialRender(true);
      debouncedValidation(pid, count, totalPrice);
    }
  }, [count]);

  const add = () => {
    if (!isBlocked && count < +max) {
      setCount(count + 1);
      setTotalPrice(totalPrice + +price);
    }
  };
  const subtract = () => {
    if (!isBlocked && count > +min) {
      setCount(count - 1);
      setTotalPrice(totalPrice - +price);
    }
  };
  return (
    <>
      <div className="product">
        <div className="product__main">
          <div className="product__main__title">{name}</div>
          <div className="product__main__wrapper">
            <div className="counter">
              <div className="counter__wrapper">
                <button onClick={subtract} className={buttonClass.minus}>
                  -
                </button>
                <div className="counter__quantity">{count}</div>
                <button onClick={add} className={buttonClass.plus}>
                  <span className="counter__plus">+</span>
                </button>
              </div>
            </div>
            <div className="cost">
              {price} <sup className="cost__currency">PLN</sup>
            </div>
          </div>
        </div>
        <div className="product__additional">
          <div className="product__additional__wrapper">
            <div className="product__additional__ammount">{text}</div>
            <div className="product__additional__total-price">
              Suma: {(Math.round(price * count * 100) / 100).toFixed(2)}{" "}
              <sup className="cost__currency">PLN</sup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

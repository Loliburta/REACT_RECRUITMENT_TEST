import React, { useState } from "react";
import { App } from "./App/App";
import { Context } from "../utils/Context";

export const Wrapper = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Context.Provider value={[totalPrice, setTotalPrice]}>
      <App />
    </Context.Provider>
  );
};

export default Wrapper;

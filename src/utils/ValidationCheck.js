// Sends a post request and returns object with isError value
const CheckQuantity = async (pid, count) => {
  // Set the real api url
  const apiBase = "localhost:3030";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ pid: pid, quantity: +count }),
  };
  try {
    const res = await fetch(
      `http://${apiBase}/api/product/check`,
      requestOptions
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Checks if (isError) and sets TotalPrice and Count
export const ValidationCheck = async (
  pid,
  count,
  setCount,
  min,
  price,
  totalPrice,
  setTotalPrice
) => {
  let result = await CheckQuantity(pid, count);
  if (result.isError) {
    // count - min because minimal ammount of items is already added to total price in app.js
    setTotalPrice(totalPrice - price * (count - min));
    setCount(min);
  }
};

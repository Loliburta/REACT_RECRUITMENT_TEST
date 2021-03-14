// Fetches products and returns an array of objects

export const FetchProducts = async () => {
  try {
    // Set apiBase to a real api url
    const apiBase = "localhost:3030";
    const res = await fetch(`http://${apiBase}/api/cart`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

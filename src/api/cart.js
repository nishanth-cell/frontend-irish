import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCart = (token) =>
  axios.get(`${API}/api/cart`, {
    headers: { authorization: token },
  });

export const addToCartd = (product, token) =>
  axios.post(
    `${API}/api/cart/add`,
    { product },
    { headers: { authorization: token } }
  );

export const removeFromCartd = (id, token) =>
  axios.delete(`${API}/api/cart/${id}`, {
    headers: { authorization: token },
  });

export const clearCartApi = (token) =>
  axios.delete(`${API}/api/cart/clear`, {
    headers: {
      authorization: token,
    },
  });

export const increaseCartQty = (id, token) =>
  axios.put(
    `${API}/api/cart/increase/${id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

  export const decreaseCartQty = (id, token) =>
  axios.put(
    `${API}/api/cart/decrease/${id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
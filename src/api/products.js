import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const BASE_URL = `${API}/api/products`;

export const getProducts = (page = 1) =>
  axios.get(
    `${API}/api/products?page=${page}`
  );

export const createProduct = (data, token) => {
  // console.log("data:", data);
  // console.log("token:", token);

  return axios.post(BASE_URL, data, {
    headers: { authorization: token },
  });
};

export const updateProduct = (id, data, token) => {
  return axios.put(`${BASE_URL}/${id}`, data, {
    headers: { authorization: token },
  });
};

export const deleteProduct = (id, token) => {
  return axios.delete(`${BASE_URL}/${id}`, {
    headers: { authorization: token },
  });
};

export const getProductById = (id, token) => {
  return axios.get(`${BASE_URL}/${id}`, {
    headers: { authorization: token },
  });
};
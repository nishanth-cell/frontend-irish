import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerUser = (data) => {
  return axios.post(`${API}/api/auth/register`, data);
};

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${API}/api/auth/login`, data);
};
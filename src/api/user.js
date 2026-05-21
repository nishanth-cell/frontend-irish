import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getUsers = (token) =>
  axios.get(`${API}/api/users`, {
    headers: {
      authorization: token,
    },
  });
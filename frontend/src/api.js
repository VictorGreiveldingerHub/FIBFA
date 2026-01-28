import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:54520`, // Ici, je mets volontairement 54520 en dur,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

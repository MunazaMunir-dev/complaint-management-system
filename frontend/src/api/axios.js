import axios from "axios";

const API = axios.create({
  baseURL: "https://complaint-management-system-wine-five.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
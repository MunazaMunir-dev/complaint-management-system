import axios from "axios";

const API = axios.create({
  baseURL: "https://complaint-management-system-wine-five.vercel.app/api",
  withCredentials: true,
});

export default API;
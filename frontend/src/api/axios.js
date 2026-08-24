import axios from "axios";

const API = axios.create({
  baseURL: "https://complaint-management-system-api.vercel.app/api",
});

export default API;
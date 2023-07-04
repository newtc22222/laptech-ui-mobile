import axios from "axios";

const FIX_BASE_URL = "http://192.168.1.12:8088/api/v1";

const api = axios.create({
  baseURL: process.env.API_URL || FIX_BASE_URL,
});

export default api;

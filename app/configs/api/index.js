import axios from "axios";

const ip = "192.168.9.148";

const FIX_BASE_URL = `http://${ip}:8088/api/v1`;

const api = axios.create({
  baseURL: process.env.API_URL || FIX_BASE_URL,
});

export default api;

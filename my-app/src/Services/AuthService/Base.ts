import axios from "axios";
import { getToken } from "./Auth";

const BaseAuth = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

BaseAuth.interceptors.request.use(async (config: any) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default BaseAuth;
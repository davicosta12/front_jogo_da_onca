import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../../environment';

export default class HttpService {

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.setToken(token);
    }
  }

  protected config: AxiosRequestConfig = {
    baseURL: `${API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  protected getApi(): AxiosInstance {
    const http = axios.create(this.config);

    http.interceptors.response.use(response => {
      return response;
    }, (error) => {
      return Promise.reject(error.response);
    });

    return http;
  }

  protected setToken(token?: string) {
    if (token && this.config.headers) {
      this.config.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  protected unsetToken() {
    if (this.config.headers) {
      delete this.config.headers['Authorization'];
    }
  }
}
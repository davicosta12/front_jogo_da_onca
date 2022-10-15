import { AxiosResponse } from "axios";
import HttpService from "./Base";
import AuthRequestDto from "./dto/AuthRestDto";

export const TOKEN_KEY = "@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export default class AuthService extends HttpService {

  getToken(email: string, name: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.getApi().post(`/logar`, new AuthRequestDto(email, name, password))
        .then(res => {
          this.saveToken(res.data.access_token);
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  };

}

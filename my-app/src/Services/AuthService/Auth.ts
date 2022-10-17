import { AxiosResponse } from "axios";
import HttpService from "./Base";
import AuthResponseDto from "./dto/AuthResponseDto";
import AuthRequestDto from "./dto/AuthRestDto";

export const TOKEN_KEY = "@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export default class AuthService extends HttpService {

  getToken(name: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.getApi().post(`/usuario/logar`, new AuthRequestDto(name, password))
        .then(res => {
          // this.saveToken(res.data.token);
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  saveToken(token: string) {
    localStorage.setItem('@airbnb-Token', token);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  };

}

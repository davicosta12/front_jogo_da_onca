import { AxiosResponse } from "axios";
import { ACTIVE_USER, TOKEN_KEY } from "../../environment";
import GetUserDto from "../Users/dto/GetUserDto";
import HttpService from "./Base";
import AuthRequestDto, { RegisterUserDto } from "./dto/AuthRestDto";
import AuthResponseDto from "./dto/AuthResponseDto";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const userExist = () => localStorage.getItem(ACTIVE_USER) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACTIVE_USER);
};

export const getActiveUser = () => {

  if (userExist()) {
    const user = localStorage.getItem(ACTIVE_USER);

    let convertToJson: GetUserDto = {} as GetUserDto;

    if (user) {
      try {
        convertToJson = JSON.parse(user);
      }
      catch (err: any) {
        console.log(err);
      }
    }

    return convertToJson;
  }
}

export const isAdmin = () => {
  const user = getActiveUser();
  return user?.id ? user.isAdmin : false;
}

export default class AuthService extends HttpService {

  getToken(name: string, password: string): Promise<AuthResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Authenticate/login`, new AuthRequestDto(name, password))
        .then(res => {
          saveToken(res.data.token);
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  registerUser(payload: RegisterUserDto): Promise<AuthResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Authenticate/cadastrar`, payload)
        .then(res => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

}

import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetUserDto from "./dto/GetUserDto";
import PostUserDto from "./dto/PostUserDto";
import PutUserDto from "./dto/PutUserDto";

export default class UserService extends HttpService {

  getUsers(): Promise<GetUserDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/users`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getUserById(id: number): Promise<GetUserDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/users/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createUser(user: PostUserDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/users`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateUser(user: PutUserDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/users/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/users/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
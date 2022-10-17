import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetSkinDto from "./dto/GetSkinDto";

export default class SkinService extends HttpService {

  getSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/todos`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/id/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getSkinByName(name: string): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/nome/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createSkin(skin: GetSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/skin/cadastrar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateSkin(user: GetSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/skin/atualizar`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/skin/buscar/id/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
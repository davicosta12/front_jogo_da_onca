import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetDogSkinDto from "./dto/GetDogSkinDto";
import GetSkinDto from "./dto/GetDogSkinDto";
import GetJaguarSkinDto from "./dto/GetJaguarSkinDto";

export default class SkinService extends HttpService {

  getDogSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skincao/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getDogSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skincao/buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getDogSkinByName(name: string): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skincao/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createDogSkin(skin: GetDogSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/skincao/cadastrar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateDogSkin(user: GetSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/skincao/atualizar/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteDogSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/skincao/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skinonca/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skinonca/buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkinByName(name: string): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skinonca/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createJaguarSkin(skin: GetJaguarSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/skinonca/cadastrar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateJaguarSkin(user: GetJaguarSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/skinonca/atualizar/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteJaguarSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/skinonca/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
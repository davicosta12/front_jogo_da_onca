import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetSkinDto from "./dto/GetDogSkinDto";

export default class SkinService extends HttpService {

  getDogSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getDogSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getDogSkinByName(name: string): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createDogSkin(skin: GetSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/skin/cadastrar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateDogSkin(user: GetSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/skin/atualizar/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteDogSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/skin/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkinByName(name: string): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/skin/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createJaguarSkin(skin: GetSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/skin/cadastrar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateJaguarSkin(user: GetSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/skin/atualizar/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteJaguarSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/skin/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
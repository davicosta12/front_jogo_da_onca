import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetDogSkinDto from "./dto/GetDogSkinDto";
import GetSkinDto from "./dto/GetDogSkinDto";
import GetJaguarSkinDto from "./dto/GetJaguarSkinDto";

export default class SkinService extends HttpService {

  getDogSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/SkinDog`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getDogSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/SkinDog/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  // getDogSkinByName(name: string): Promise<GetSkinDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().get(`/SkinDog/${name}`)
  //       .then((res: any) => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   });
  // }

  createDogSkin(skin: GetDogSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/SkinDog`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateDogSkin(user: GetSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/SkinDog/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteDogSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/SkinDog/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkins(): Promise<GetSkinDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/SkinJaguar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getJaguarSkinById(id: number): Promise<GetSkinDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/SkinJaguar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  // getJaguarSkinByName(name: string): Promise<GetSkinDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().get(`/SkinJaguar/${name}`)
  //       .then((res: any) => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   });
  // }

  createJaguarSkin(skin: GetJaguarSkinDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/SkinJaguar`, skin)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateJaguarSkin(user: GetJaguarSkinDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/SkinJaguar/${id}`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteJaguarSkin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/SkinJaguar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
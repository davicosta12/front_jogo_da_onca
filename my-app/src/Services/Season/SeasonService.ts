import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetSeasonDto from "./dto/GetSeasonDto";
import PostSeasonDto from "./dto/PostSeasonDto";
import PutSeasonDto from "./dto/PutSeasonDto";

export default class SeasonService extends HttpService {

  getSeasons(): Promise<GetSeasonDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Season`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getSeasonById(id: number): Promise<GetSeasonDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Season/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  // getSeasonByName(name: string): Promise<GetSeasonDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().get(`/Season/buscar/${name}`)
  //       .then((res: any) => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   });
  // }

  getSeasonByRangeDate(inicio: string, fim: string): Promise<GetSeasonDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Season/RangeDate?inicio=${inicio}&fim=${fim}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createSeason(season: PostSeasonDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Season`, season)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateSeason(season: PutSeasonDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Season/${id}`, season)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteSeason(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Season/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
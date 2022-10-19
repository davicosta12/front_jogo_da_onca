import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetSeasonDto from "./dto/GetSeasonDto";

export default class SeasonService extends HttpService {

  getSeasons(): Promise<GetSeasonDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/season/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getSeasonById(id: number): Promise<GetSeasonDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/season//buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getSeasonByName(name: string): Promise<GetSeasonDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/season/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createSeason(season: GetSeasonDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/season/cadastrar`, season)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateSeason(season: GetSeasonDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/season/atualizar/${id}`, season)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteSeason(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/season/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
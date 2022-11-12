import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetBannerDto from "./dto/GetBannerDto";
import PostBannerDto from "./dto/PostBannerDto";

export default class BannerService extends HttpService {

  getBanners(): Promise<GetBannerDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Banner`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getBannerById(id: number): Promise<GetBannerDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Banner/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  // getBannerByName(name: string): Promise<GetBannerDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().get(`/Banner/buscar/${name}`)
  //       .then((res: any) => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   });
  // }

  createBanner(banner: PostBannerDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Banner`, banner)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateBanner(banner: PostBannerDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Banner/${id}`, banner)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteBanner(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Banner/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
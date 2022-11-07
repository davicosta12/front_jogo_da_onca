import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetBoardDto from "./dto/GetBoardDto";
import PostBoardDto from "./dto/PostBoardDto";

export default class BoardService extends HttpService {

  getBoards(): Promise<GetBoardDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Tabuleiro`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getBoardById(id: number): Promise<GetBoardDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Tabuleiro/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  // getBoardByName(name: string): Promise<GetBoardDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().get(`/tabuleiro/buscar/${name}`)
  //       .then((res: any) => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   });
  // }

  createBoard(board: PostBoardDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Tabuleiro`, board)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateBoard(board: PostBoardDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Tabuleiro/${id}`, board)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteBoard(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Tabuleiro/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
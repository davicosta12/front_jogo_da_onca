import { AxiosResponse } from "axios";
import HttpService from "../AuthService/Base";
import GetBoardDto from "./dto/GetBoardDto";

export default class BoardService extends HttpService {

  getBoards(): Promise<GetBoardDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/board/buscar`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getBoardById(id: number): Promise<GetBoardDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/board//buscar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getBoardByName(name: string): Promise<GetBoardDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/board/buscar/${name}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createBoard(board: GetBoardDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/board/cadastrar`, board)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateBoard(board: GetBoardDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/board/atualizar/${id}`, board)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteBoard(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/board/deletar/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}
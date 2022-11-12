import GetBannerDto from "../Services/Banner/dto/GetBannerDto";
import GetBoardDto from "../Services/Board/dto/GetBoardDto";
import GetSeasonDto from "../Services/Season/dto/GetSeasonDto";
import GetDogSkinDto from "../Services/Skins/dto/GetDogSkinDto";
import GetJaguarSkinDto from "../Services/Skins/dto/GetJaguarSkinDto";
import GetUserDto from "../Services/Users/dto/GetUserDto";

export enum ActionTypes {
  SET_ACTIVE_USER = 'SET_ACTIVE_USER',
  ADD_DOG_SKIN = 'ADD_DOG_SKIN ',
  ADD_JAGUAR_SKIN = 'ADD_JAGUAR_SKIN ',
  ADD_BOARD = 'ADD_BOARD',
  ADD_SEASON = 'ADD_SEASON',
  ADD_USER = 'ADD_USER',
  ADD_BANNER = 'ADD_BANNER'
}

export interface ActionReducer {
  type: ActionTypes;
  payload: any;
}

export interface InitialState {
  activeUser: GetUserDto,
  dogSkins: GetDogSkinDto[],
  jaguarSkins: GetJaguarSkinDto[],
  boards: GetBoardDto[],
  seasons: GetSeasonDto[],
  users: GetUserDto[],
  banners: GetBannerDto[]
}

export const initialState = {
  activeUser: {} as GetUserDto,
  dogSkins: [],
  jaguarSkins: [],
  boards: [],
  seasons: [],
  users: [],
  banners: []
};

export const reducer = (state: InitialState, action: ActionReducer) => {
  switch (action.type) {

    case ActionTypes.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: { ...action.payload }
      } as InitialState;

    case ActionTypes.ADD_DOG_SKIN:
      return {
        ...state,
        dogSkins: [...action.payload]
      } as InitialState;

    case ActionTypes.ADD_JAGUAR_SKIN:
      return {
        ...state,
        jaguarSkins: [...action.payload]
      } as InitialState;

    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...action.payload]
      } as InitialState;

    case ActionTypes.ADD_SEASON:
      return {
        ...state,
        seasons: [...action.payload]
      } as InitialState;

    case ActionTypes.ADD_BOARD:
      return {
        ...state,
        boards: [...action.payload]
      } as InitialState;

      case ActionTypes.ADD_BANNER:
        return {
          ...state,
          banners: [...action.payload]
        } as InitialState;

    default:
      return state;
  }
};
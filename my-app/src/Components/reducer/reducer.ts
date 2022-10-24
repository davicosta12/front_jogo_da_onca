import GetBoardDto from "../../Services/Board/dto/GetBoardDto";
import GetSeasonDto from "../../Services/Season/dto/GetSeasonDto";
import GetDogSkinDto from "../../Services/Skins/dto/GetDogSkinDto";
import GetJaguarSkinDto from "../../Services/Skins/dto/GetJaguarSkinDto";
import GetUserDto from "../../Services/Users/dto/GetUserDto";

export enum ActionTypes {
  ADD_DOG_SKIN = 'ADD_DOG_SKIN ',
  ADD_JAGUAR_SKIN = 'ADD_JAGUAR_SKIN ',
  ADD_BOARD = 'ADD_BOARD',
  ADD_SEASON = 'ADD_SEASON',
  ADD_USER = 'ADD_USER'
}

export interface ActionReducer {
  type: ActionTypes;
  payload: any;
}

export interface InitialState {
  dogSkins: GetDogSkinDto[],
  jaguarSkins: GetJaguarSkinDto[],
  boards: GetBoardDto[],
  seasons: GetSeasonDto[],
  users: GetUserDto[]
}

export const initialState = {
  dogSkins: [],
  jaguarSkins: [],
  boards: [],
  seasons: [],
  users: []
};

export const reducer = (state: InitialState, action: ActionReducer) => {
  switch (action.type) {

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

    default:
      return state;
  }
};




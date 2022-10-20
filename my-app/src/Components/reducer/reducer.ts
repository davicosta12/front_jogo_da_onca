import GetBoardDto from "../../Services/Board/dto/GetBoardDto";
import GetSeasonDto from "../../Services/Season/dto/GetSeasonDto";
import GetSkinDto from "../../Services/Skins/dto/GetSkinDto";
import GetUserDto from "../../Services/Users/dto/GetUserDto";

export enum ActionTypes {
  ADD_SKIN = 'ADD_SKIN ',
  ADD_BOARD = 'ADD_BOARD',
  ADD_SEASON = 'ADD_SEASON',
  ADD_USER = 'ADD_USER'
}

export interface ActionReducer {
  type: ActionTypes;
  payload: any;
}

export interface InitialState {
  skins: GetSkinDto[],
  boards: GetBoardDto[],
  seasons: GetSeasonDto[],
  users: GetUserDto[]
}

export const initialState = {
  skins: [],
  boards: [],
  seasons: [],
  users: []
};

export const reducer = (state: InitialState, action: ActionReducer) => {
  switch (action.type) {
    case ActionTypes.ADD_SKIN:
      return {
        ...state,
        skins: [...action.payload]
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




import { ActionTypes } from "../reducer/reducer";
import BannerService from "../Services/Banner/BannerService";
import BoardService from "../Services/Board/BoardService";
import SeasonService from "../Services/Season/SeasonService";
import SkinService from "../Services/Skins/SkinService";

const GetGlobalParamsHelper = (dispatch: any) => {

  return new Promise(async (resolve, reject) => {
    try {
      const boardService = new BoardService();
      const seasonService = new SeasonService();
      const skinService = new SkinService();
      const bannerService = new BannerService();

      Promise.allSettled([
        boardService.getBoards(),
        seasonService.getSeasons(),
        skinService.getDogSkins(),
        skinService.getJaguarSkins(),
        bannerService.getBanners(),
      ])
        .then(results => results.forEach((res, i) => res.status === 'fulfilled'
          ? dispatchAction(res.value, i, dispatch)
          : reject(res.reason)
        ))
        .then(() => resolve(null))
    }
    catch (err) {
      reject(err)
    }
  })
}

export default GetGlobalParamsHelper

const dispatchAction = (res: any, index: number, dispatch: any) => {

  switch (index) {
    case 0: dispatch({
      type: ActionTypes.ADD_BOARD,
      payload: [...res]
    });
      break;
    case 1: dispatch({
      type: ActionTypes.ADD_SEASON,
      payload: [...res]
    });
      break;
    case 2: dispatch({
      type: ActionTypes.ADD_DOG_SKIN,
      payload: [...res]
    });
      break;
    case 3: dispatch({
      type: ActionTypes.ADD_JAGUAR_SKIN,
      payload: [...res]
    });
      break;
    case 3: dispatch({
      type: ActionTypes.ADD_BANNER,
      payload: [...res]
    });
      break;
    default:
  }
}
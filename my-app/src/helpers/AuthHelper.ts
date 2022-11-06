import { ACTIVE_USER } from "../environment";
import { ActionTypes } from "../reducer/reducer";
import AuthService from "../Services/AuthService/Auth";
import GetGlobalParamsHelper from "./GetGlobalParamsHelper";

class AuthHelper {

  static authenticate = (email: string, password: string, dispatch: any) => {

    return new Promise(async (resolve, reject) => {
      try {
        const authResponse = await new AuthService().getToken(email, password);
        localStorage.setItem(ACTIVE_USER, JSON.stringify(authResponse.usuario));
        dispatch({
          type: ActionTypes.SET_ACTIVE_USER,
          payload: { ...authResponse.usuario }
        });
        //await GetGlobalParamsHelper(dispatch);
        return resolve(null);
      }
      catch (err) {
        reject(err);
      }
    })
  }

  static restoreAuthFromCache = (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const activeUser = localStorage.getItem(ACTIVE_USER);
        dispatch({
          type: ActionTypes.SET_ACTIVE_USER,
          payload: { ...JSON.parse(activeUser || '') }
        });
        //await GetGlobalParamsHelper(dispatch);
        return resolve(null);
      }
      catch (err) {
        reject("Não foi possível restaurar os dados de autenticação");
      }
    })
  }

}

export default AuthHelper
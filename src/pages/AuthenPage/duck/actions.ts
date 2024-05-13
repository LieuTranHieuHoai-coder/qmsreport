import { Action } from "../../../store/types";
import client from "./../../../utils/apiUtil";
import * as ActionType from "./../duck/constants";
import { Md5 } from "ts-md5";

export const acFetchUserLogin = (user: {
  username?: string;
  password?: string;
}) => {
  return (dispatch: any) => {
    const hashpw = user?.password ? Md5.hashStr(user.password) : "";
    const hashCode = Md5.hashStr(user?.username + hashpw);
    console.log(user);
    dispatch(acUserLoginRequest());
    // call api
    client.apiReport
      .get("/Login/" + hashCode)
      .then((response) => {
        dispatch(acUserLoginSuccess(response.data));
        
      })
      .catch((error: any) => dispatch(acUserLoginFailed(error)));
  };
};

const acUserLoginRequest = (): Action => {
  return {
    type: ActionType.USER_LOGIN_REQUEST,
  };
};
const acUserLoginSuccess = (data: any): Action => {
  return {
    type: ActionType.USER_LOGIN_SUCCESS,
    payload: data,
  };
};
const acUserLoginFailed = (error: any): Action => {
  return {
    type: ActionType.USER_LOGIN_FAILED,
    payload: error,
  };
};

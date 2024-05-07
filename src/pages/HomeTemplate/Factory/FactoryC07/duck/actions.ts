import * as ActionType from "./constants";
import { DailyReportView } from "./types";
import { Action } from "../../../../../store/types";
import client from "./../../../../../utils/apiUtil";

export const actFetchListData = (
  fd?: string,
  td?: string,
  site?: string,
  line?: string,
  fty?: string
) => {
  return (dispatch: any) => {
    dispatch(actListRequest());

    client.apiReport
      .get(
        "qc/report/DailyReport?fd=" +
          fd +
          "&td=" +
          td +
          "site=" +
          site +
          "&line=" +
          line +
          "&fty=" +
          fty
      )
      .then((result) => {
        dispatch(actListSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actListFailed(error));
      });
  };
};

const actListRequest = (): Action => {
  return {
    type: ActionType.LIST_DAILYREPORT_REQUEST,
  };
};

const actListSuccess = (data: DailyReportView[]): Action => {
  return {
    type: ActionType.LIST_DAILYREPORT_SUCCESS,
    payload: data,
  };
};

const actListFailed = (error: any): Action => {
  return {
    type: ActionType.LIST_DAILYREPORT_FAILED,
    payload: error,
  };
};
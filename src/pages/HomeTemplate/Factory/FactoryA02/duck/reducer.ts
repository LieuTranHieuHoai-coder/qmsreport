import { Action } from "../../../../../store/types";
import * as ActionType from "./constants";
import { DailyReportView } from "./types";
import { AppState } from "./../../../../../store/types";

const initialState: AppState<DailyReportView> = {
  loading: false,
  loadingExcel: false,
  data: null,
  dataExcel: null,
  error: null,
  errorExcel: null,
};
const listDailyReportReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LIST_DAILYREPORT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_DAILYREPORT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_DAILYREPORT_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    case ActionType.LIST_DAILYREPORT_EXCEL_REQUEST: {
      state.loadingExcel = true;
      state.dataExcel = null;
      state.errorExcel = null;
      return { ...state };
    }

    case ActionType.LIST_DAILYREPORT_EXCEL_SUCCESS: {
      state.loadingExcel = false;
      state.dataExcel = action.payload;
      state.errorExcel = null;
      return { ...state };
    }

    case ActionType.LIST_DAILYREPORT_EXCEL_FAILED: {
      state.loadingExcel = false;
      state.dataExcel = null;
      state.errorExcel = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default listDailyReportReducer;
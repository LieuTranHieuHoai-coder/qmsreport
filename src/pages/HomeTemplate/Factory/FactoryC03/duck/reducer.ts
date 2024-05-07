import { Action } from "../../../../../store/types";
import * as ActionType from "./constants";
import { DailyReportView } from "./types";
import { AppState } from "./../../../../../store/types";

const initialState: AppState<DailyReportView> = {
  loading: false,
  data: null,
  error: null,
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

    default:
      return { ...state };
  }
};

export default listDailyReportReducer;
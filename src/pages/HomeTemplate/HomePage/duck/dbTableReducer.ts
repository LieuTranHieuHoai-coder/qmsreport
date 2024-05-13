import { Action } from "../../../../store/types";
import * as ActionType from "./constants";
import { DailyReportView } from "./types";
import { AppStateDBTable } from "./../../../../store/types";

const initialState: AppStateDBTable<DailyReportView> = {
  loadingDB: false,
  dataDB: null,
  error: null,
};

const listDBTableReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LIST_DBTABLE_REQUEST: {
      state.loadingDB = true;
      state.dataDB = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_DBTABLE_SUCCESS: {
      state.loadingDB = false;
      state.dataDB = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_DBTABLE_FAILED: {
      state.loadingDB = false;
      state.dataDB = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default listDBTableReducer;
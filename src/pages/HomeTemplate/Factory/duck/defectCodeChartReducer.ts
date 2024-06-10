import { Action, AppStateChart } from "../../../../store/types";
import * as ActionType from "./constants";
import { ChartDefectCodeView } from "./types";

const initialState: AppStateChart<ChartDefectCodeView> = {
  loading: false,
  data: null,
  error: null,
};
const chartDefectCodeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LIST_CHARTREPORT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_CHARTREPORT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.LIST_CHARTREPORT_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default chartDefectCodeReducer;
import { combineReducers } from "redux";
import listDailyReportReducer from "../pages/HomeTemplate/HomePage/duck/reducer";
import chartDefectCodeReducer from "../pages/HomeTemplate/Factory/FactoryA02/duck/defectCodeChartReducer";
import listDBTableReducer from "../pages/HomeTemplate/HomePage/duck/dbTableReducer";
import userReducer from "../pages/AuthenPage/duck/reducer";

const rootReducer = combineReducers({
  listDailyReportReducer,
  chartDefectCodeReducer,
  listDBTableReducer,
  userReducer
});

export default rootReducer;

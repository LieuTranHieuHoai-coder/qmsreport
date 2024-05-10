import { combineReducers } from "redux";
import listMovieReducer from "./../pages/HomeTemplate/ListMoviePage/duck/reducer";
import listDailyReportReducer from "../pages/HomeTemplate/HomePage/duck/reducer";
import chartDefectCodeReducer from "../pages/HomeTemplate/Factory/FactoryA02/duck/defectCodeChartReducer";

const rootReducer = combineReducers({
  listMovieReducer,
  listDailyReportReducer,
  chartDefectCodeReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import listMovieReducer from "./../pages/HomeTemplate/ListMoviePage/duck/reducer";
import listDailyReportReducer from "../pages/HomeTemplate/HomePage/duck/reducer";

const rootReducer = combineReducers({
  listMovieReducer,
  listDailyReportReducer
});

export default rootReducer;

import { combineReducers } from "redux";

import imagesSlice from "../slices/images";
import dietdailySlice from "../slices/dietdaily";
import dailyReportSlice from "../slices/dailyReport";
import userSlice from "../slices/user";
import weeklyReportSlice from "../slices/weeklyReport";
import calendarSlice from "../slices/calendar";

const rootReducer = combineReducers({
  images: imagesSlice.reducer,
  dietdaily: dietdailySlice.reducer,
  dailyReport: dailyReportSlice.reducer,
  user: userSlice.reducer,
  weeklyReport: weeklyReportSlice.reducer,
  calendar: calendarSlice.reducer,
});

export default rootReducer;

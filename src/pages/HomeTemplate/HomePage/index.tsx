import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListData } from "./duck/actions";
import { RootState } from "../../../store";
import { DailyReportView } from "./duck/types";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
//import 'bootstrap-icons/font/bootstrap.min.css';

export default function HomePage() {
  const dispatch: any = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  useEffect(
    () => dispatch(actFetchListData("2024-05-03", "2024-05-03", "QVN", "", "")),
    []
  );

  
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const dateFormat = "YYYY/MM/DD";

  const renderDatePicker = () => {
    return (
      <>
        <RangePicker format={dateFormat} />
      </>
    );
  };

  const renderSidebar = () => {
    return <></>;
  };

  return (
    <div>
    
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListData } from "./duck/actions";
import { RootState } from "../../../../store";
import { DailyReportView } from "./duck/types";
import type { DatePickerProps } from "antd";
import { DatePicker, Result, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarchartComponent";
import dayjs, { Dayjs } from "dayjs";
import TableReportComponent from "./DataTableReport";
//import 'bootstrap-icons/font/bootstrap.min.css';

export default function FactoryA01() {
  const dispatch: any = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  type PieData = {
    id?: number;
    name: string;
    value: number;
  };
  function sumPass():number {  
    let total = data?.reduce((total, item:any) => total + item.rft, 0);
    return total ?? 0;
  };
  function sumDefect():number {  
    let total = data?.reduce((total, item:any) => total + item.defectPerDay, 0);
    return total ?? 0;
  };
  const dataPie: PieData[] = [
    { id: 1, name: "Pass", value: sumPass() },
    { id: 2, name: "Defect", value: sumDefect() },
  ];
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const date = new Date();
  const today = dayjs(date).format(dateFormat);
  const [selectDate, setDaterange] = useState<[string,string]>();
  const handleChange = (dates: any, dateStrings: [string, string]) => {
    setDaterange(dateStrings);
  }
  useEffect(() => dispatch(actFetchListData(selectDate ? selectDate?.[0] : today , selectDate ? selectDate?.[1] : today , "QVN", "" , "Factory A01")), [selectDate]);
  dayjs.extend(customParseFormat);
  const renderDatePicker = () => {
    return (
      <>
        <RangePicker format={dateFormat} onChange={handleChange}/>
      </>
    );
  };

  const renderChart = () => {
    if (loading) return <div>Loading...</div>;
    
    if (data && data.length > 0) {
      return (
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-9">
            <div className="w-100" style={{ height: 300 }}>
              <BarChartComponent></BarChartComponent>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-3" style={{ height: 300 }}>
            <PieChartComponent valuePie={dataPie}></PieChartComponent>
          </div>
        </div>
      );
    }else {
      return (
        <Result
          status="success"
          title="No data available"
          subTitle="Sorry, the page you visited does not exist."
        />
      );
    }
  };

  return (
    <div>
      <div className="col">
        {renderDatePicker()}
        <br />
        <br />
        {renderChart()}
      </div>
      <TableReportComponent valueTable={data ? data : []}></TableReportComponent>
    </div>
  );
}

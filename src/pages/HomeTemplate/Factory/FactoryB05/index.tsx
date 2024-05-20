import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchDefectChart, actFetchListData } from "./duck/actions";
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
import DefectCodeChartComponent from "./DefectCodeChartComponent";
import { useTranslation } from "react-i18next";
//import 'bootstrap-icons/font/bootstrap.min.css';

export default function FactoryB05() {
  const dispatch: any = useDispatch();
  const {t} = useTranslation("global");
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
  useEffect(() => dispatch(actFetchListData(selectDate ? selectDate?.[0] : today , selectDate ? selectDate?.[1] : today , "QVN", "" , "Factory B05")), [selectDate]);
  useEffect(
    () =>
      dispatch(
        actFetchDefectChart(
          selectDate ? selectDate?.[0] : today,
          selectDate ? selectDate?.[1] : today,
          "Factory B05"
        )
      ),
    [selectDate]
  );
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
            <h2 className="fw-bold w-100 text-center">
              {t("homepage.dashboard.qtyAllFactory5")}
              </h2>
              <BarChartComponent></BarChartComponent>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-3" style={{ height: 300 }}>
          <h2 className="fw-bold w-100 text-center">
              {t("homepage.dashboard.pieTitle")}
            </h2>
            <PieChartComponent valuePie={dataPie}></PieChartComponent>
          </div>
        </div>
      );
    }else {
      return (
        <Result
          status="success"
          title={t("homepage.dashboard.Nodata")}
          subTitle={t("homepage.dashboard.pagenotexist")}
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
      <br />
      <h2 className="fw-bold w-100 text-center">{t("homepage.dashboard.detailDefectCode")}</h2>
      <div className="col">
        <div className="w-100" style={{ height: 300 }}>
          <br />
          <DefectCodeChartComponent></DefectCodeChartComponent>
        </div>
      </div>
    </div>
  );
}

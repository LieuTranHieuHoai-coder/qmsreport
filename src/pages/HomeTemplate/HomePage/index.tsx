import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchDefectChart, actFetchListData, actFetchDBTable } from "./duck/actions";
import { RootState } from "../../../store";
import { DailyReportView } from "./duck/types";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarchartComponent";
import dayjs, { Dayjs } from "dayjs";
import DefectCodeChartComponent from "./DefectCodeChartComponent";
import TableReportComponent from "./DataTableReport";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
//import 'bootstrap-icons/font/bootstrap.min.css';

export default function HomePage() {
  const { t } = useTranslation('global');
  const dispatch: any = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  const { loadingDB, dataDB } = useSelector(
    (state: RootState) => state.listDBTableReducer
  );
  const isUser = useSelector(
    (state: RootState) => state.userReducer.data
  );
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isUser) {
  //     navigate("/");
  //   }
  // },[]);

  type PieData = {
    id?: number;
    name: string;
    value: number;
  };
  function sumPass(): number {
    let total = data?.reduce((total, item: any) => total + item.passQty, 0);
    return total ?? 0;
  }
  function sumDefect(): number {
    let total = data?.reduce((total, item: any) => total + item.defectQty, 0);
    return total ?? 0;
  }
  const dataPie: PieData[] = [
    { id: 1, name: "Pass", value: sumPass() },
    { id: 2, name: "Defect", value: sumDefect() },
  ];
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const date = new Date();
  const today = dayjs(date).format(dateFormat);
  const [selectDate, setDaterange] = useState<[string, string]>();
  const handleChange = (dates: any, dateStrings: [string, string]) => {
    setDaterange(dateStrings);
  };

  useEffect(
    () =>
      dispatch(
        actFetchListData(
          selectDate ? selectDate?.[0] : today,
          selectDate ? selectDate?.[1] : today,
          "QVN",
          "",
          ""
        )
      ),
    [selectDate]
  );
  useEffect(
    () =>
      dispatch(
        actFetchDefectChart(
          selectDate ? selectDate?.[0] : today,
          selectDate ? selectDate?.[1] : today,
          ""
        )
      ),
    [selectDate]
  );
  useEffect(
    () =>
      dispatch(
        actFetchDBTable(
          selectDate ? selectDate?.[0] : today,
          selectDate ? selectDate?.[1] : today
        )
      ),
    [selectDate]
  );
  dayjs.extend(customParseFormat);
  const renderDatePicker = () => {
    return (
      <>
        <RangePicker format={dateFormat} onChange={handleChange} />
      </>
    );
  };
  const renderChart =() => {
    if (loading) return <div>Loading...</div>;

    if (data && data.length > 0) {
      
      return (
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-9">
            <div className="w-100" style={{ height: 300 }}>
              <h2 className="fw-bold w-100 text-center">
              {t("homepage.dashboard.qtyAllFactory")}
              </h2>
              <BarChartComponent></BarChartComponent>
            </div>
          </div>
          <div
            className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-3"
            style={{ height: 300 }}
          >
            <h2 className="fw-bold w-100 text-center">
              {t("homepage.dashboard.pieTitle")}
            </h2>
            <PieChartComponent valuePie={dataPie}></PieChartComponent>
          </div>
        </div>
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
      <div className="col mt-5">
        <TableReportComponent
          valueTable={dataDB ? dataDB : []}
        ></TableReportComponent>
      </div>
      <br />

      <div className="col">
        <div className="w-100" style={{ height: 300 }}>
          <br />
          <h2 className="fw-bold w-100 text-center">{t("homepage.dashboard.detailDefectCode")}</h2>
          <DefectCodeChartComponent></DefectCodeChartComponent>
        </div>
      </div>
    </div>
  );
}

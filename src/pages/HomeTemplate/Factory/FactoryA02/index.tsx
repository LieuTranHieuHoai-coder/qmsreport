import { useEffect, useMemo, useState, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchDefectChart, actFetchListData , actFetchListDataExcel} from "./../duck/actions";
import { RootState } from "../../../../store";
import { Button, DatePicker, Result, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarchartComponent";
import dayjs, { Dayjs } from "dayjs";
import TableReportComponent from "./DataTableReport";
import DefectCodeChartComponent from "./DefectCodeChartComponent";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from 'react-router-dom';
export default function FactoryA02() {
  const dispatch: any = useDispatch();
  const { t } = useTranslation('global');
  const location = useLocation();
  let fty = location.pathname.split("/").pop();
  const { loading, data, dataExcel } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  type PieData = {
    id?: number;
    name: string;
    value: number;
  };
  function sumPass(): number {
    let total = data?.reduce((total, item: any) => total + item.rft, 0);
    return total ?? 0;
  }
  function sumDefect(): number {
    let total = data?.reduce(
      (total, item: any) => total + item.defectPerDay,
      0
    );
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
  const [titleBar,setTitleBar] = useState(t("homepage.dashboard.qtyAllFactory1"));
  useEffect(
    () =>{
      switch (fty) {
        case "FactoryA01":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory1");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A01"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A01"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory A01"
            )
          );
          break;
        }
        case "FactoryA02":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory2");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A02"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A02"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory A02"
            )
          );
          break;
        }
        case "FactoryA08":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory8");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A08"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory A08"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory A08"
            )
          );
          break;
        }
        case "FactoryB05":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory5");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory B05"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory B05"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory B05"
            )
          );
          break;
        }
        case "FactoryB06":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory6");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory B06"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory B06"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory B06"
            )
          );
          break;
        }
        case "FactoryC03":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory3");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory C03"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory C03"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory C03"
            )
          );
          break;
        }
        case "FactoryC07":{
          setTitleBar(()=> {
            return t("homepage.dashboard.qtyAllFactory7");
          });
          dispatch(
            actFetchListData(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory C07"
            )
          );
          dispatch(
            actFetchListDataExcel(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "QVN",
              "",
              "Factory C07"
            )
          );
          dispatch(
            actFetchDefectChart(
              selectDate? selectDate?.[0] : today,
              selectDate? selectDate?.[1] : today,
              "Factory C07"
            )
          );
          break;
        }
      }
    },
    [selectDate, location]
  );

  dayjs.extend(customParseFormat);
  const currentDate = dayjs().get('year') + '/' + (dayjs().get('month') + 1) + '/' + dayjs().get('date');
  const renderDatePicker = () => {
    return (
      <>
        <RangePicker defaultValue={[dayjs(currentDate),dayjs(currentDate)]} format={dateFormat} onChange={handleChange}/>
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
              {titleBar}
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
      <div className="col mt-5">
        <TableReportComponent valueExcel={dataExcel ? dataExcel: []} fd={selectDate ? selectDate?.[0] : today} td={selectDate ? selectDate?.[1] : today} fty={fty}/>
      </div>
      
      <br />
      <h2 className="fw-bold w-100 text-center">{t("homepage.dashboard.detailDefectCode")}</h2>
      <div className="col">
        <div className="w-100" style={{ height: 300 }}>
          <br />
          <DefectCodeChartComponent></DefectCodeChartComponent>
        </div>
      </div>
      <br />
      
    </div>
  );
}

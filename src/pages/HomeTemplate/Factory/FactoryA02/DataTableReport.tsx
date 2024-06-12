import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { DailyReportView } from "./../duck/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import apiUtil from "../../../../utils/apiUtil";
import saveAs from "file-saver";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

type Props = {
  valueExcel: DailyReportView[];
  fd?: string;
  td?: string;
  fty?: string;
};
export default function TableReportComponent(props: Props) {
  const { valueExcel } = props;
  const cloneProps = { ...props };
  const { t } = useTranslation("global");
  function defectRate() {
    cloneProps.valueExcel.map((item: any) => {
      item.defectRate =
        ((item.defectPerDay / item.qty) * 100).toFixed(2).toString() + "%";
    });
  }
  const columns: any = [
    {
      name: "customer",
      label: `${t("homepage.dashboard.customer")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "buyMonth",
      label: `${t("homepage.dashboard.buymonth")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "season",
      label: `${t("homepage.dashboard.season")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "style",
      label: `${t("homepage.dashboard.style")}`,
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "colorName",
      label: `${t("homepage.dashboard.color")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "qty",
      label: `${t("homepage.dashboard.inspected")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "passQty",
      label: `${t("homepage.dashboard.goodgarment")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rft",
      label: `${t("homepage.dashboard.rft")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "defectPerDay",
      label: `${t("homepage.dashboard.defect_table")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "defectRate",
      label: `${t("homepage.dashboard.defectRate")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const getMuiTheme = () => {
    return createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      palette: {
        primary: {
          main: "#000000",
        },
        secondary: {
          main: "#000000",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              justifyContent: "baseline",
              alignItems: "baseline",
              div: {
                justifyContent: "baseline",
                alignItems: "baseline",
              },
            },
            head: {
              padding: "10px 4px",
            },
            body: {
              padding: "10px 30px",
              textAlign: "center",
            },

            footer: {
              padding: "7px 15px",
              textAlign: "right",
            },
          },
        },
        MuiPagination: {
          styleOverrides: {
            root: {
              justifyContent: "baseline",
              alignItems: "baseline",
            },
          },
        },
      },
    });
  };
  const options: any = {
    selectableRows: false,
    filter: true,
    sort: true,
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
  };
  const [loadingExcel, setLoading] = useState(false);
  const [workshops, setWorkshops] = useState(t("homepage.dashboard.dailyworkshop1"));
  const [selectFty, setSelectFty] = useState<string>("");
  useEffect(() =>{
    switch (cloneProps.fty) {
      case "FactoryA01":{
        cloneProps.fty = "Factory A01";
        setSelectFty(() => {
          return "Factory A01";
        })
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop1")
        })
        break;
      }
      case "FactoryA02":{
        cloneProps.fty = "Factory A02";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop2")
        });
        setSelectFty(() => {
          return "Factory A02";
        })
        break;
      }
      case "FactoryA08":{
        cloneProps.fty = "Factory A08";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop8")
        });
        setSelectFty(() => {
          return "Factory A08";
        })
        break;
      }
      case "FactoryB05":{
        cloneProps.fty = "Factory B05";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop5")
        });
        setSelectFty(() => {
          return "Factory B05";
        })
        break;
      }
      case "FactoryB06":{
        cloneProps.fty = "Factory B06";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop6")
        });
        setSelectFty(() => {
          return "Factory B06";
        })
        break;
      }
      case "FactoryC03":{
        cloneProps.fty = "Factory C03";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop3")
        });
        setSelectFty(() => {
          return "Factory C03";
        })
        break;
      }
      case "FactoryC07":{
        cloneProps.fty = "Factory C07";
        setWorkshops(()=>{
          return t("homepage.dashboard.dailyworkshop7")
        });
        setSelectFty(() => {
          return "Factory C07";
        })
        break;
      }
    }
  },[cloneProps.fty]);
  const downloadExcel = async () => {

    setLoading(true);
    try {
      const response = await apiUtil.apiReport.post(`qc/excel/DownloadExcel?fd=${cloneProps.fd}&td=${cloneProps.td}&fty=${selectFty}`, cloneProps.valueExcel, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'ExcelData.xlsx');
    } catch (error:any) {
      console.log('Error downloading Excel file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {defectRate()}
      <Button type="primary" icon={<DownloadOutlined />} size="large" loading={loadingExcel} onClick={downloadExcel}>
          Download Excel
      </Button>
      <br /><br/>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={workshops}
          data={cloneProps.valueExcel}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
}

import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { DailyReportView } from "./duck/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import apiUtil from "../../../../utils/apiUtil";
import saveAs from "file-saver";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
type Props = {
  valueTable: DailyReportView[];
};
export default function TableReportComponent(props: Props) {
  const { valueTable } = props;
  const cloneProps = { ...props };
  const { t } = useTranslation("global");
  function defectRate() {
    cloneProps.valueTable.map((item: any) => {
      item.defectRate =
        ((item.defectPerDay / item.qty) * 100).toFixed(2).toString() + "%";
    });
  }
  const columns: any = [
    // {
    //   name: "sewingLine",
    //   label: `${t("homepage.dashboard.sewing")}`,
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },

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
      name: "sizeName",
      label: `${t("homepage.dashboard.size")}`,
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

  const downloadExcel = async () => {
    setLoading(true);

    try {
      const response = await apiUtil.apiReport.post("qc/excel/DownloadExcel", cloneProps.valueTable, {
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
      <Button type="primary" icon={<DownloadOutlined />} size="large" loading={loadingExcel} onClick={downloadExcel} className="mb-3">
          Download Excel
      </Button>
      <br/>   
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={t("homepage.dashboard.dailyworkshop2")}
          data={cloneProps.valueTable}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
}

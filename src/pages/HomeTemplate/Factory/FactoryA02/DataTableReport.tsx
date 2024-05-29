import React from "react";
import MUIDataTable from "mui-datatables";
import { DailyReportView } from "./duck/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ExcelJS from 'exceljs';
// import ReactExport from 'react-data-export';
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
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
    {
      name: "sewingLine",
      label: `${t("homepage.dashboard.sewing")}`,
      options: {
        filter: true,
        sort: true,
      },
    },

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
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("QMS Excel");
    sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      {
        header: t("homepage.dashboard.sewing"),
        key: "sewingLine",
        width: 20,
      },
      {
        header: t("homepage.dashboard.color"),
        key: "colorName",
        width: 20,
      },
      {
        header: t("homepage.dashboard.size"),
        key: "sizeName",
        width: 20,
      }
    ];

    cloneProps.valueTable.map((item:any) =>{
      sheet.addRow({
        sewingLine: item.sewingLine,
        colorName: item.colorName,
        sizeName: item.sizeName,
      });
    })

    
    sheet.getColumn(1).border = {
      top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
    };
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ADFF2F" },
    };

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  function returnDataTable(){
    return cloneProps.valueTable.map((item: any) => {
      return(
        <>
            <tr>
              <td scope="row">{item.sewingLine}</td>
              <td scope="row">{item.colorName}</td>
              <td scope="row">{item.sizeName}</td>
            </tr>
        </>
      )
    });


    
  }
  return (
    <>
      {defectRate()}
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

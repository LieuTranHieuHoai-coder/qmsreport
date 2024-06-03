import React from "react";
import MUIDataTable from "mui-datatables";
import { DailyReportView } from "./duck/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
type Props = {
  valueTable: DailyReportView[];
};

export default function TableReportComponent(props: Props) {
  const { valueTable } = props;
  const cloneProps = {...props}
  const { t } = useTranslation('global');
  //console.log(valueTable);
  function defectRate(){
    cloneProps.valueTable.map((item:any) => {
      const clonedate = dayjs(item.createDated).format('YYYY/MM/DD');
      item.createDated = clonedate;
      item.defectRate = ((item.defectQty / item.qty) * 100).toFixed(2).toString() + '%'; 
      item.passRate = ((item.passQty / item.qty) * 100).toFixed(2).toString() + '%'; 
    });
  }
  const columns: any = [
    {
      name: "createDated",
      label: `${t("homepage.dashboard.createDate")}`,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "floor",
      label: `${t("homepage.dashboard.fty")}`,
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
      name: "defectQty",
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
              alignItems:"baseline",
              div:{
                justifyContent: "baseline",
                alignItems:"baseline",
              }
            },
            head: {
              padding: "10px 4px",
            },
            body: {
              padding: "7px 15px",
              textAlign: "left",
            },
            
            footer: {
              padding: "7px 15px",
              textAlign: "right",
            },
          },
        },
        MuiPagination:{
          styleOverrides: {
            root: {
              justifyContent: "baseline",
              alignItems:"baseline",
            },
          },
        }
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
      rowsPerPage: "Rows per pages:",
      displayRows: "of",
    },
    
  };

  /* test export */

  return (
    <>
      {defectRate()}
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={t("homepage.dashboard.dailyworkshop")}
          data={cloneProps.valueTable}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      
    </>
  );
}

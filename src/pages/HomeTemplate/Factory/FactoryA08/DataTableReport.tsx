import React from "react";
import MUIDataTable from "mui-datatables";
import { DailyReportView } from "./duck/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
type Props = {
  valueTable: DailyReportView[];
};
export default function TableReportComponent(props: Props) {
  const { valueTable } = props;
  const columns: any = [
    // {
    //   name: "createDated",
    //   label: "CreateDated",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "sewingLine",
      label: "SewingLine",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "operatorFactory",
    //   label: "OperatorFactory",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: "floor",
    //   label: "Floor",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "customer",
      label: "KHÁCH HÀNG \n CUSTOMER \n 品牌",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "buyMonth",
      label: "Tháng \n BuyMonth \n 月",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "season",
      label: "Mùa \n Season \n 季",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "style",
      label: "Mã Hàng \n Style \n 款式",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "orderNo",
    //   label: "OrderNo",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: "poNo",
    //   label: "PoNo",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "colorName",
      label: "Màu \n Color \n 顏色",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sizeName",
      label: "SizeName",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "qty",
      label: "ĐÃ KIỂM \n INSPECTED \n 檢查",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "passQty",
      label: "Hàng Đạt \n Good Garments \n 最終良品",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rft",
      label: "RFT \n 初檢良品",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "defectQty",
      label: "HÀNG SỬA \n DEFECT \n 初檢不良品",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "brokenQty",
    //   label: "BrokenQty",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "defectPerDay",
      label: "DefectPerDay \n Lỗi hôm nay",
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
              textAlign: "center",
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
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
    
  };

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"DAILY INSPECTION STATUS WORKSHOP 2"}
          data={valueTable}
          columns={columns}
          options={options}
          
        />
      </ThemeProvider>
    </>
  );
}

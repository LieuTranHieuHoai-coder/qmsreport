import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import IDailyReport from "./../Modals/IDailyReport";
import axios from "axios";
// get api
interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataTablePrime: React.FC = () => {
  
  const IReportList: IDailyReport[] = [];
  const [dataReport, setData]: [IDailyReport[], (dataReport: IDailyReport[]) => void] = useState(IReportList);

  useEffect(() =>{
    axios.get("http://192.168.1.136:9999/qc/report/DailyReport?fd=2024-04-23&td=2024-04-23&site=QVN&fty=Factory A02")
    .then(res => {
      setData(res.data);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <div>
      <DataTable
        value={dataReport}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        //dataKey="id"
        paginator
        emptyMessage="No data found."
        className="datatable-responsive"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        rows={10}
      >
        <Column field="CreateDated" sortable header="Ngày"></Column>
        <Column field="Customer" sortable header="Khách Hàng"></Column>
        <Column field="Season" sortable header="Mùa"></Column>
        <Column field="BuyMonth" sortable header="Tháng"></Column>
        {/* <Column
          field="image"
          sortable
          header="Image"
          body={imageTemplate}
        ></Column> */}
        <Column field="Style" sortable header="Mã Hàng"></Column>
        <Column field="ColorName" sortable header="Màu"></Column>
        <Column field="SizeName" sortable header="Size"></Column>
        <Column field="Qty" sortable header="Số Lượng"></Column>
        <Column
          field="PassQty"
          sortable
          header="Áo Đạt"
        ></Column>
        <Column field="DefectPerDay" sortable header="Áo Lỗi"></Column>
        <Column
          field="number"
          sortable
          header="Chưa Sửa"
        ></Column>
        
      </DataTable>
    </div>
  );
};

export default DataTablePrime;

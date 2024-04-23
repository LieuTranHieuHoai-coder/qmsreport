interface IDailyReport {
  CreateDated: Date;
  SewingLine: string;
  OperatorFactory: string;
  Floor: string;
  Customer: string;
  BuyMonth: string;
  Season: string;
  Style: string;
  OrderNo: string;
  PONo: string;
  ColorName: string;
  SizeName: string;
  Qty: number;
  PassQty: number;
  RFT: number;
  DefectQty: number;
  BrokenQty: number;
  DefectPerDay: number;
}

export default IDailyReport;

export interface DailyReportView {
    id: number;
    createDated?: string ;
    sewingLine?: string ;
    operatorFactory?: string ;
    floor?: string ;
    customer?: string ;
    buyMonth?: string ;
    season?: string ;
    style?: string ;
    orderNo?: string ;
    poNo?: string ;
    colorName?: string ;
    sizeName?: string ;
    qty?: number;
    passQty?: number;
    rft?: number;
    defectQty?: number;
    brokenQty?: number;
    defectPerDay?: number;
}
export interface CurrentUser2 {
    eSysID: number;
    empID: string;
    hashCode: string;
    empName: string;
    factoryCode: string;
    deptCode: string;
    lineCode: string;
    locationCode: string;
    sysAccCode: string;
    remark: string;
    isActive: boolean;
    createDate: string;
    modifyDate: string;
    createdBy: string;
    modifiedBy: string;
}

export interface CurrentUser {
    id: number;
    source: string;
    uid: string;
    pw: string;
    fullname: string;
    email: string;
    active: string;
    company: string;
    department: string;
    title: string;
    comment: string;
    lastdt: string;
    lastuid: string;
}
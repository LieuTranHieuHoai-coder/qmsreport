export type AppState<T> = {
  loading: boolean;
  loadingExcel?: boolean;
  data: T[] | null;
  dataExcel?: T[] | null;
  error: any;
  errorExcel?: any;
};

export type AppStateChart<T> = {
  loading: boolean;
  data: T[] | null;
  dataExcel?: T[] | null;
  error: any;
};


export type AppStateDBTable<T> = {
  loadingDB: boolean;
  dataDB: T[] | null;
  dataExcel?: T[] | null;
  error: any;
};
export type AppStateLogin<T> = {
  loading: boolean;
  data: T | null;
  error: any;
};
export type Action = {
  type: string;
  payload?: any;
};

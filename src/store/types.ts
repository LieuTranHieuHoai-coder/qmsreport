export type AppState<T> = {
  loading: boolean;
  data: T[] | null;
  error: any;
};

export type AppStateChart<T> = {
  loading: boolean;
  data: T[] | null;
  error: any;
};


export type AppStateDBTable<T> = {
  loadingDB: boolean;
  dataDB: T[] | null;
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

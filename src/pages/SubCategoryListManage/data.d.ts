export interface TableListItem {
  id: number;
  pid: number;
  name: string;
  orders: number;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  pid: number;
  name: string;
  orders: number;
}

export interface TableListParams {
  id: number;
  orders: number;
  name: string;
  pid: number;
  pageSize?: number;
  current?: number;
}

export interface TableListItem {
  id: number;
  name: string;
  mobile: string;
  address: string;
  userName: string;
  password: string;
  receivingPhone: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  name: string;
  mobile: string;
  address: string;
  userName: string;
  password: string;
  receivingPhone: string;
}

export interface TableListParams {
  name: string;
  mobile: string;
  address: string;
  userName: string;
  receivingPhone: string;
  id: number;
  pageSize?: number;
  current?: number;
}

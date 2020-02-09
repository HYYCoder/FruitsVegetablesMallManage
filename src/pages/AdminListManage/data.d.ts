export interface TableListItem {
  id: number;
  userName: string;
  password: string;
  type: string;
  imageUrl: string;
  mobile: string;
  name: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  userName: string;
  password: string;
  type: string;
  imageUrl: string;
  mobile: string;
  name: string;
}

export interface TableListParams {
  userName: string;
  type: string;
  imageUrl: string;
  mobile: string;
  name: string;
  id: number;
  pageSize?: number;
  current?: number;
}

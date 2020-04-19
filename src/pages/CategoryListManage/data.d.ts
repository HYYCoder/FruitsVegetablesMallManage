export interface TableListItem {
  id: number;
  imageUrl: string;
  name: string;
  orders: number;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  imageUrl: string;
  name: string;
  orders: number;
}

export interface TableListParams {
  id: number;
  orders: number;
  name: string;
  imageUrl: string;
  pageSize?: number;
  current?: number;
}

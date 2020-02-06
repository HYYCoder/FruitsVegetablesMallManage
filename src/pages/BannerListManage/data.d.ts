export interface TableListItem {
  id: number;
  imageUrl: string;
  orders: number;
  detail: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  imageUrl: string;
  orders: number;
  detail: string;
}

export interface TableListParams {
  id: number;
  pageSize?: number;
  current?: number;
}

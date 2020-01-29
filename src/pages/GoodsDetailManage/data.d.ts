export interface TableListItem {
  key: number;
  imageUrls: string;
  type: string;
  name: string;
  price: number;
  stock: number;
  specification: string;
  reducedPrice: number;
  detail: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  type: string;
  name: string;
  price: number;
  stock: number;
  reducedPrice: number;
  key: number;
  pageSize?: number;
  current?: number;
}

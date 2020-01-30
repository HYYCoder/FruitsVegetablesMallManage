export interface TableListItem {
  id: number;
  imageUrls: string;
  type: string;
  name: string;
  price: number;
  stock: number;
  specification: string;
  reducedPrice: number;
  detail: string;
}

export interface ChangeGoodsItem {
  imageUrls: string;
  type: string;
  name: string;
  price: number;
  stock: number;
  specification: string;
  reducedPrice: number;
  detail: string;
}

export interface TableListParams {
  type: string;
  name: string;
  price: number;
  stock: number;
  reducedPrice: number;
  id: number;
  pageSize?: number;
  current?: number;
}

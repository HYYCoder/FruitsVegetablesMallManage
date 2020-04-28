export interface TableListItem {
  id: number;
  imageUrls: string;
  categoryId: number;
  name: string;
  price: number;
  stock: number;
  specification: string;
  reducedPrice: number;
  minimunOrderQuantity: number;
	maximumOrderQuantity: number;
	minimumIncrementQuantity: number;
  detail: string;
  hotGoods: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  imageUrls: string;
  categoryId: number;
  name: string;
  price: number;
  stock: number;
  specification: string;
  reducedPrice: number;
  minimunOrderQuantity: number;
	maximumOrderQuantity: number;
	minimumIncrementQuantity: number;
  detail: string;
  hotGoods: string;
}

export interface TableListParams {
  categoryId: number;
  name: string;
  price: number;
  stock: number;
  reducedPrice: number;
  hotGoods: string;
  id: number;
  pageSize?: number;
  current?: number;
}

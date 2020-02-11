export interface TableListItem {
  id: number;
  code: string;
  date: string;
  details: string;
  amount: string;
  discountAmount: number;
  paidAmount: number;
  receiver: number;
  address: string;
  mobile: string;
  note: string;
  userId: number;
  status: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  code: string;
  date: string;
  details: string;
  amount: string;
  discountAmount: number;
  paidAmount: number;
  receiver: number;
  address: string;
  mobile: string;
  note: string;
  userId: number;
  status: string;
}

export interface TableListParams {
  code: string;
  date: string;
  details: string;
  amount: string;
  discountAmount: number;
  paidAmount: number;
  receiver: number;
  address: string;
  mobile: string;
  note: string;
  userId: number;
  status: string;
  id: number;
  current?: number;
  pageSize?: number;
}

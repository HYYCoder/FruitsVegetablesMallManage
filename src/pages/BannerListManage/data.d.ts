export interface TableListItem {
  id: number;
  imageUrl: string;
}

export interface imageItem {
  url: string;
  file: File;
}

export interface ChangeItem {
  imageUrl: string;
}

export interface TableListParams {
  id: number;
  pageSize?: number;
  current?: number;
}

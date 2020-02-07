import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function queryGoods(params: TableListParams) {
  return request(
    `/manage/goods?type=${params.categoryId !== undefined ? params.categoryId : ''}&name=${
      params.name !== undefined ? params.name : ''
    }&price=${params.price !== undefined ? params.price : ''}&stock=${
      params.stock !== undefined ? params.stock : ''
    }&reducedPrice=${params.reducedPrice !== undefined ? params.reducedPrice : ''}&current=${
      params.current
    }&pageSize=${params.pageSize}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    },
  );
}

export async function removeGoods(params: number) {
  return request(`/manage/delete/goods/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addGoods(params: ChangeItem) {
  return request('/manage/add/goods', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      imageUrls: params.imageUrls,
      categoryId: params.categoryId,
      name: params.name,
      price: params.price,
      stock: params.stock,
      specification: params.specification,
      reducedPrice: params.reducedPrice,
      detail: params.detail,
    },
  });
}

export async function updateGoods(params: TableListItem) {
  return request('/manage/update/goods', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      imageUrls: params.imageUrls,
      categoryId: params.categoryId,
      name: params.name,
      price: params.price,
      stock: params.stock,
      specification: params.specification,
      reducedPrice: params.reducedPrice,
      detail: params.detail,
    },
  });
}

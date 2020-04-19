import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function queryCategory(params: TableListParams) {
  return request(`/manage/category?orders=${params.orders !== undefined ? params.orders : -1}&name=${params.name !== undefined ? params.name : ''}&imageUrl=${params.imageUrl !== undefined ? params.imageUrl : ''}&current=${params.current}&pageSize=${params.pageSize}`, {
    method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
  });
}

export async function removeCategory(params: number) {
  return request(`/manage/delete/category/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addCategory(params: ChangeItem) {
  return request('/manage/add/category', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      orders: params.orders,
      name: params.name,
      imageUrl: params.imageUrl,
    },
  });
}

export async function updateCategory(params: TableListItem) {
  return request('/manage/update/category', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      orders: params.orders,
      imageUrl: params.imageUrl,
      name: params.name,
    },
  });
}

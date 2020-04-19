import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function querySubCategory(params: TableListParams) {
  return request(`/manage/subcategory?pid=${params.pid !== undefined ? params.pid : -1}&orders=${params.orders !== undefined ? params.orders : -1}&name=${params.name !== undefined ? params.name : ''}&current=${params.current}&pageSize=${params.pageSize}`, {
    method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
  });
}

export async function removeSubCategory(params: number) {
  return request(`/manage/delete/subcategory/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addSubCategory(params: ChangeItem) {
  return request('/manage/add/subcategory', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      orders: params.orders,
      name: params.name,
      pid: params.pid,
    },
  });
}

export async function updateSubCategory(params: TableListItem) {
  return request('/manage/update/subcategory', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      orders: params.orders,
      pid: params.pid,
      name: params.name,
    },
  });
}

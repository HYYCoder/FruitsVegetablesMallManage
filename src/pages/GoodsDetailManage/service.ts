import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request(
    `/manage/goods?type=${params.type !== undefined ? params.type : ''}&name=${
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

export async function removeRule(params: number) {
  return request(`/manage/delete/goods/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

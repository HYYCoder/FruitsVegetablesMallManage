import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(pageNums?: number, pageSizes?: number) {
  return request('/manage/goods', {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      pageNum: pageNums,
      pageSize: pageSizes,
    },
  });
}

export async function removeRule(params: number) {
  return request(`/manage/delete/goods/${params}`, {
    method: 'POST',
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

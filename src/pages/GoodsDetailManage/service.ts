import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(pageNums?: number, pageSizes?: number) {
  return request('/goods', {
    method: 'GET',
    data: {
      pageNum: pageNums,
      pageSize: pageSizes,
    },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
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

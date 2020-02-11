import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function queryOrder(params: TableListParams) {
  return request(
    `/manage/order?code=${params.code !== undefined ? params.code : ''}&date=${
      params.date !== undefined ? params.date : ''
    }&details=${params.details !== undefined ? params.details : ''}&amount=${
      params.amount !== undefined ? params.amount : ''
    }&discountAmount=${params.discountAmount !== undefined ? params.discountAmount : ''}&paidAmount=${
      params.paidAmount !== undefined ? params.paidAmount : ''
    }&receiver=${params.receiver !== undefined ? params.receiver : ''}&address=${
      params.address !== undefined ? params.address : ''
    }&mobile=${params.mobile !== undefined ? params.mobile : ''}&note=${
      params.note !== undefined ? params.note : ''
    }&userId=${params.userId !== undefined ? params.userId : ''}&status=${params.status !== undefined ? params.status : ''}&current=${
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

export async function removeOrder(params: number) {
  return request(`/manage/delete/order/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addOrder(params: ChangeItem) {
  return request('/manage/add/order', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      code: params.code,
      date: params.date,
      details: params.details,
      amount: params.amount,
      discountAmount: params.discountAmount,
      paidAmount: params.paidAmount,
      receiver: params.receiver,
      address: params.address,
      mobile: params.mobile,
      note: params.note,
      userId: params.userId,
      status: params.status,
    },
  });
}

export async function updateOrder(params: TableListItem) {
  return request('/manage/update/order', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      code: params.code,
      date: params.date,
      details: params.details,
      amount: params.amount,
      discountAmount: params.discountAmount,
      paidAmount: params.paidAmount,
      receiver: params.receiver,
      address: params.address,
      mobile: params.mobile,
      note: params.note,
      userId: params.userId,
      status: params.status,
    },
  });
}

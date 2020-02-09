import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';


export async function queryUser(params: TableListParams) {
  return request(
    `/manage/user?name=${params.name !== undefined ? params.name : ''}&mobile=${params.mobile !== undefined ? params.mobile : ''}&address=${params.address !== undefined ? params.address : ''}&userName=${params.userName !== undefined ? params.userName : ''}&receivingPhone=${params.receivingPhone !== undefined ? params.receivingPhone : ''}&current=${params.current}&pageSize=${params.pageSize}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    },
  );
}

export async function removeUser(params: number) {
  return request(`/manage/delete/user/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addUser(params: ChangeItem) {
  return request('/manage/add/user', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      name: params.name,
      mobile: params.mobile,
      address: params.address,
      userName: params.userName,
      password: params.password,
      receivingPhone: params.receivingPhone,
    },
  });
}

export async function updateUser(params: TableListItem) {
  return request('/manage/update/user', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      userName: params.userName,
      password: params.password,
      name: params.name,
      mobile: params.mobile,
      address: params.address,
      receivingPhone: params.receivingPhone,
    },
  });
}
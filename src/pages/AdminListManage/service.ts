import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function queryAdmin(params: TableListParams) {
  return request(
    `/manage/admin?userName=${params.userName !== undefined ? params.userName : ''}&type=${
      params.type !== undefined ? params.type : ''
    }&imageUrl=${params.imageUrl !== undefined ? params.imageUrl : ''}&mobile=${
      params.mobile !== undefined ? params.mobile : ''
    }&name=${params.name !== undefined ? params.name : ''}&current=${
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

export async function removeAdmin(params: number) {
  return request(`/manage/delete/admin/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addAdmin(params: ChangeItem) {
  return request('/manage/add/admin', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      userName: params.userName,
      password: params.password,
      type: params.type,
      imageUrl: params.imageUrl,
      mobile: params.mobile,
      name: params.name,
    },
  });
}

export async function updateAdmin(params: TableListItem) {
  return request('/manage/update/admin', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      userName: params.userName,
      password: params.password,
      type: params.type,
      imageUrl: params.imageUrl,
      mobile: params.mobile,
      name: params.name,
    },
  });
}

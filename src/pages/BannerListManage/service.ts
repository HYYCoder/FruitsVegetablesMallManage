import request from '@/utils/request';
import { TableListParams, ChangeItem, TableListItem } from './data.d';

export async function queryBanner(params: TableListParams) {
  return request(`/manage/banner?current=${params.current}&pageSize=${params.pageSize}`, {
    method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
  });
}

export async function removeBanner(params: number) {
  return request(`/manage/delete/banner/${params}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export async function addBanner(params: ChangeItem) {
  return request('/manage/add/banner', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      imageUrl: params.imageUrl,
    },
  });
}

export async function updateBanner(params: TableListItem) {
  return request('/manage/update/banner', {
    method: 'PUT',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    data: {
      id: params.id,
      imageUrls: params.imageUrl,
    },
  });
}

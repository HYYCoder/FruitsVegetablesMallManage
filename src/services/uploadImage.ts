import request from '@/utils/request';

export async function uploadImage(params: File) {
    const formData = new FormData();
    formData.append('image', params);
    return request('/manage/upload/image', {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: formData,
    });
  }
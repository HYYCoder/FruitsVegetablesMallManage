import request from '@/utils/request';

export interface RegisterParamsType {
  userName: string;
  password: string;
  imageUrl: string;
  mobile: string;
  name: string;
}

export async function adminRegister(params: RegisterParamsType) {
  return request('/manage/admin/register', {
    method: 'POST',
    data: {
      userName: params.userName,
      password: params.password,
      imageUrl: params.imageUrl,
      mobile: params.mobile,
      name: params.name,
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

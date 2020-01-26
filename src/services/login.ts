import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function adminLogin(params: LoginParamsType) {
  return request('/admin/login', {
    method: 'POST',
    data: {
      userName: params.userName,
      password: params.password,
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

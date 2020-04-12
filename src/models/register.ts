import { Reducer } from 'redux';
import { Effect } from 'dva';
import { router } from 'umi';

import { adminRegister } from '@/services/register';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateTypes {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface RegisterModelType {
  namespace: string;
  state: StateTypes;
  effects: {
    register: Effect;
  };
  reducers: {
    changeRegisterStatus: Reducer<StateTypes>;
  };
}

const Model: RegisterModelType = {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      const response = yield call(adminRegister, payload);
      yield put({
        type: 'changeRegisterStatus',
        payload: response,
      });
      // Register successfully
      if (response.id !== undefined) {
        localStorage.setItem('token', response.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },
  },

  reducers: {
    changeRegisterStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;

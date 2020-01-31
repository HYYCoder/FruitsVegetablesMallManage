import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { uploadImage } from './service';

export interface StateType {
  status?: 'ok' | 'error';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    upload: Effect;
  };
  reducers: {
    uploadImage: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'goods',

  state: {
    status: undefined,
  },

  effects: {
    *upload({ payload, callback }, { call, put }) {
      const response = yield call(uploadImage, payload);
      yield put({
        type: 'uploadImage',
        payload: response,
      });
      callback(response);
    },
  },

  reducers: {
    uploadImage(state) {
      return {
        ...state,
      };
    },
  },
};

export default Model;

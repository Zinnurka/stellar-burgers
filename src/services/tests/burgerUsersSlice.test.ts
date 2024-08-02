import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  getOrdersApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import userReducer, {
  registerUserAsyncThunk,
  loginUserAsyncThunk,
  getUserAsyncThunk,
  getUserOrdersThunk,
  updateUserAsyncThunk,
  logoutAsyncThunk,
  setUser,
  TUserState
} from '../burgerUserSlice';
import { localStorageMock, userDataMock, orderDataMock } from './mock';

jest.mock('../../utils/burger-api');
jest.mock('../../utils/cookie');

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('burgerUserSlice', () => {
  const errorText = 'Some error message';
  const error = new Error(errorText);
  const refreshToken = 'asdadsasd';
  const accessToken = '2131233133';

  let store: EnhancedStore<{ user: TUserState }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    });
  });

  it('Проверяет начальное состояние', () => {
    const initialState: TUserState = {
      data: {
        email: '',
        name: ''
      },
      registerUserReq: false,
      registerUserErr: null,
      loginUserReq: false,
      loginUserErr: null,
      isAuthenticated: false,
      userOrders: [],
      userOrdersErr: null,
      userOrdersLoading: false,
      updateUserReq: false,
      updateUserErr: null,
      logoutReq: false,
      logoutErr: null
    };
    expect(store.getState().user).toEqual(initialState);
  });

  it(
    'registerUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: registerUserAsyncThunk.pending.type });
      const state = store.getState().user;
      expect(state.registerUserReq).toBe(true);
    }
  );

  it(
    'registerUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (registerUserApi as jest.Mock).mockResolvedValueOnce({
        user: userDataMock,
        refreshToken: refreshToken,
        accessToken: accessToken
      });
      await store.dispatch(
        registerUserAsyncThunk({
          name: 'Ramil Zinnyrov',
          email: 'ramil@zinnyrov.ru',
          password: 'password'
        }) as any
      );
      const state = store.getState().user;
      expect(state.registerUserReq).toBe(false);
      expect(state.data).toEqual(userDataMock);
      expect(registerUserApi).toHaveBeenCalled();
      expect(state.isAuthenticated).toBe(true);
    }
  );

  it(
    'registerUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Rejected',
    async () => {
      (registerUserApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(
        registerUserAsyncThunk({
          email: 'ramil@zinnyrov.ru',
          name: 'Ramil Zinnyrov',
          password: 'password'
        }) as any
      );
      const state = store.getState().user;
      expect(state.registerUserReq).toBe(false);
    }
  );

  it(
    'loginUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: loginUserAsyncThunk.pending.type });
      const state = store.getState().user;
      expect(state.loginUserReq).toBe(true);
    }
  );

  it(
    'loginUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (loginUserApi as jest.Mock).mockResolvedValueOnce({
        user: userDataMock,
        refreshToken: refreshToken,
        accessToken: accessToken
      });
      await store.dispatch(
        loginUserAsyncThunk({
          email: 'ramil@zinnyrov.ru',
          password: 'password'
        }) as any
      );
      const state = store.getState().user;
      expect(state.loginUserReq).toBe(false);
      expect(state.data).toEqual(userDataMock);
      expect(loginUserApi).toHaveBeenCalled();
      expect(state.isAuthenticated).toBe(true);
    }
  );

  it(
    'loginUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Rejected',
    async () => {
      (loginUserApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(
        loginUserAsyncThunk({
          email: 'ramil@zinnyrov.ru',
          password: 'password'
        }) as any
      );
      const state = store.getState().user;
      expect(state.loginUserReq).toBe(false);
      expect(state.loginUserErr).toBe(errorText);
    }
  );

  it(
    'getUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: getUserAsyncThunk.pending.type });
      const state = store.getState().user;
      expect(state.isAuthenticated).toBe(false);
    }
  );

  it(
    'getUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (getUserApi as jest.Mock).mockResolvedValueOnce({ user: userDataMock });
      await store.dispatch(getUserAsyncThunk() as any);
      const state = store.getState().user;
      expect(state.data).toEqual(userDataMock);
      expect(getUserApi).toHaveBeenCalled();
      expect(state.isAuthenticated).toBe(true);
    }
  );

  it(
    'getUserAsyncThunk Проверяет изменение состояние стора при вызове ' +
      'экшена с типом Rejected',
    async () => {
      (getUserApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(getUserAsyncThunk() as any);
      const state = store.getState().user;
      expect(state.isAuthenticated).toBe(false);
    }
  );

  it(
    'getUserOrdersThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: getUserOrdersThunk.pending.type });
      const state = store.getState().user;
      expect(state.userOrdersLoading).toBe(true);
    }
  );

  it(
    'getUserOrdersThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (getOrdersApi as jest.Mock).mockResolvedValueOnce(orderDataMock);
      await store.dispatch(getUserOrdersThunk() as any);
      const state = store.getState().user;
      expect(state.userOrdersLoading).toBe(false);
      expect(getOrdersApi).toHaveBeenCalled();
      expect(state.userOrders).toEqual(orderDataMock);
    }
  );

  it(
    'getUserOrdersThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Rejected',
    async () => {
      (getOrdersApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(getUserOrdersThunk() as any);
      const state = store.getState().user;
      expect(state.userOrdersLoading).toBe(false);
      expect(state.userOrdersErr).toBe(errorText);
    }
  );

  it(
    'updateUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: updateUserAsyncThunk.pending.type });
      const state = store.getState().user;
      expect(state.updateUserReq).toBe(true);
    }
  );

  it(
    'updateUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (updateUserApi as jest.Mock).mockResolvedValueOnce({
        user: userDataMock
      });
      await store.dispatch(updateUserAsyncThunk(userDataMock) as any);
      const state = store.getState().user;
      expect(state.updateUserReq).toBe(false);
      expect(updateUserApi).toHaveBeenCalled();
      expect(state.data).toEqual(userDataMock);
    }
  );

  it(
    'updateUserAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Rejected',
    async () => {
      (updateUserApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(updateUserAsyncThunk(userDataMock) as any);
      const state = store.getState().user;
      expect(state.updateUserReq).toBe(false);
      expect(state.updateUserErr).toBe(errorText);
    }
  );

  it(
    'logoutAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: logoutAsyncThunk.pending.type });
      const state = store.getState().user;
      expect(state.logoutReq).toBe(true);
    }
  );

  it(
    'logoutAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (logoutApi as jest.Mock).mockResolvedValueOnce({});
      await store.dispatch(logoutAsyncThunk() as any);
      const state = store.getState().user;
      expect(state.isAuthenticated).toBe(false);
      expect(state.logoutReq).toBe(false);
      expect(logoutApi).toHaveBeenCalled();
      expect(state.data).toBeNull();
    }
  );

  it(
    'logoutAsyncThunk Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Rejected',
    async () => {
      (logoutApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(logoutAsyncThunk() as any);
      const state = store.getState().user;
      expect(state.logoutErr).toBe(errorText);
      expect(state.logoutReq).toBe(false);
    }
  );

  it('setUser', () => {
    store.dispatch(setUser(userDataMock));
    const state = store.getState().user;
    expect(state.isAuthenticated).toBe(true);
    expect(state.data).toEqual(userDataMock);
  });
});

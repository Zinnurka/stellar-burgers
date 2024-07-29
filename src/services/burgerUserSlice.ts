import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { RootState } from './store';
import { deleteCookie, setCookie } from '../utils/cookie';

export type TUserState = {
  updateUserReq: boolean;
  updateUserErr: null | string;
  data: TUser | null;
  registerUserReq: boolean;
  registerUserErr: null | string;
  loginUserReq: boolean;
  loginUserErr: null | string;
  isAuthenticated: boolean;
  userOrders: TOrder[];
  logoutReq: boolean;
  logoutErr: null | string;
  userOrdersErr: null | string;
  userOrdersLoading: boolean;
};

const initialState: TUserState = {
  data: {
    email: '',
    name: ''
  },
  updateUserReq: false,
  updateUserErr: null,
  logoutReq: false,
  logoutErr: null,
  registerUserReq: false,
  registerUserErr: null,
  loginUserReq: false,
  loginUserErr: null,
  isAuthenticated: false,
  userOrders: [],
  userOrdersErr: null,
  userOrdersLoading: false
};

export const getUserOrdersThunk = createAsyncThunk(
  'burgerUser/getUserOrders',
  getOrdersApi
);

export const logoutAsyncThunk = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('user');
  deleteCookie('accessToken');
  return response;
});

export const loginUserAsyncThunk = createAsyncThunk(
  'burgerUser/login',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const registerUserAsyncThunk = createAsyncThunk(
  'burgerUser/register',
  async ({ name, email, password }: TRegisterData) => {
    const response = await registerUserApi({ name, email, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const updateUserAsyncThunk = createAsyncThunk(
  'burgerUser/update',
  async (user: TUser) => {
    const response = await updateUserApi(user);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  }
);

export const getUserAsyncThunk = createAsyncThunk(
  'burgerUser/auth',
  async () => await getUserApi()
);

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const burgerUserSlice = createSlice({
  name: 'burgerUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.userOrdersLoading = true;
      })
      .addCase(logoutAsyncThunk.pending, (state) => {
        state.logoutReq = true;
      })
      .addCase(registerUserAsyncThunk.pending, (state) => {
        state.registerUserReq = true;
      })
      .addCase(registerUserAsyncThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.registerUserReq = false;
      })
      .addCase(registerUserAsyncThunk.rejected, (state) => {
        state.registerUserReq = false;
      })
      .addCase(loginUserAsyncThunk.pending, (state) => {
        state.loginUserReq = true;
      })
      .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserReq = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUserAsyncThunk.rejected, (state, action) => {
        state.loginUserReq = false;
        state.loginUserErr = action.error.message as string;
      })
      .addCase(getUserAsyncThunk.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getUserAsyncThunk.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUserAsyncThunk.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logoutAsyncThunk.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.logoutReq = false;
      })
      .addCase(logoutAsyncThunk.rejected, (state, action) => {
        state.logoutReq = false;
        state.logoutErr = action.error.message as string;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersErr = action.error.message as string;
      })
      .addCase(updateUserAsyncThunk.pending, (state) => {
        state.updateUserReq = true;
      })
      .addCase(updateUserAsyncThunk.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.updateUserReq = false;
      })
      .addCase(updateUserAsyncThunk.rejected, (state, action) => {
        state.updateUserReq = false;
        state.updateUserErr = action.error.message as string;
      });
  }
});

export const { setUser } = burgerUserSlice.actions;
export default burgerUserSlice.reducer;

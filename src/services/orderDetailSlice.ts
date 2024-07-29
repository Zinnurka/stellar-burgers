import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../utils/burger-api';

export interface TOrderDetailState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
  orderIngredients: string[];
}

const initialState: TOrderDetailState = {
  order: null,
  loading: false,
  error: null,
  orderIngredients: []
};

export const getOrderDetailsByNumber = createAsyncThunk(
  'burgerOrderDetail/get',
  async (orderId: number) => await getOrderByNumberApi(orderId)
);

const orderByNumberSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.error = null;
      state.order = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailsByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      })
      .addCase(getOrderDetailsByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderIngredients = action.payload.orders[0].ingredients;
        state.order = action.payload.orders[0];
      });
  }
});

export default orderByNumberSlice.reducer;
export const { clearOrder } = orderByNumberSlice.actions;

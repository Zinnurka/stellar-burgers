import { orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TInitialState = {
  isPending: boolean;
  name: string | '';
  order: TOrder | null;
};

const initialState: TInitialState = {
  isPending: false,
  name: '',
  order: null
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

const orderSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.name = '';
      state.isPending = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isPending = true;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPending = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

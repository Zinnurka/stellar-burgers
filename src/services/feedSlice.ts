import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  feedsRequesting: boolean;
  feedsError: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  feedsRequesting: false,
  feedsError: null
};

export const getFeedThunk = createAsyncThunk(
  'feed/get',
  async () => await getFeedsApi()
);

export const feedConstructorSlice = createSlice({
  name: 'burgerFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.feedsRequesting = true;
        state.feedsError = null;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.feedsError =
          (action.error.message as string) || 'Что-то не работает';
        state.feedsRequesting = false;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.feedsRequesting = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export default feedConstructorSlice.reducer;

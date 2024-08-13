import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import feedsReducer, { getFeedThunk, TFeedsState } from '../feedSlice';
import { getFeedsApi } from '../../utils/burger-api';
import { feedsDataMock } from './mock';
jest.mock('../../utils/burger-api');

describe('feedsSlice', () => {
  let store: EnhancedStore<{ feeds: TFeedsState }>;
  const errorText = 'Some error message';
  const error = new Error(errorText);

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feeds: feedsReducer
      }
    });
  });

  it('Проверяет начальное состояние', () => {
    const initialState: TFeedsState = {
      orders: [],
      total: 0,
      feedsError: null,
      totalToday: 0,
      feedsRequesting: false
    };
    expect(store.getState().feeds).toEqual(initialState);
  });

  it(
    'getFeedThunk Проверяет изменение состояние стора при вызове экшена с' +
      ' типом Pending',
    () => {
      store.dispatch({ type: getFeedThunk.pending.type });
      expect(store.getState().feeds.feedsRequesting).toBe(true);
    }
  );

  it(
    'getFeedThunk Проверяет изменение состояние стора при вызове экшена ' +
      'с типом Fulfilled',
    async () => {
      (getFeedsApi as jest.Mock).mockResolvedValueOnce(feedsDataMock);
      await store.dispatch(getFeedThunk() as any);
      const state: TFeedsState = store.getState().feeds;
      expect(state.orders).toEqual(feedsDataMock.orders);
      expect(state.feedsRequesting).toBe(false);
      expect(state.totalToday).toBe(feedsDataMock.totalToday);
      expect(state.total).toBe(feedsDataMock.total);
    }
  );

  it(
    'getFeedThunk Проверяет изменение состояние стора при вызове экшена ' +
      'с типом Rejected',
    async () => {
      (getFeedsApi as jest.Mock).mockRejectedValueOnce(error);
      await store.dispatch(getFeedThunk() as any);
      const state: TFeedsState = store.getState().feeds;
      expect(state.feedsError).toBe(errorText);
      expect(state.feedsRequesting).toBe(false);
    }
  );
});

import orderDetailsReducer, {
  getOrderDetailsByNumber,
  TOrderDetailState,
  clearOrder
} from '../orderDetailSlice';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { localStorageMock, feedsDataMock } from './mock';
import { getOrderByNumberApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('ordersDetailsSlice', () => {
  let store: EnhancedStore<{ orderDetail: TOrderDetailState }>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        orderDetail: orderDetailsReducer
      }
    });
  });
  it('Проверяет начальное состояние', () => {
    const initialState: TOrderDetailState = {
      order: null,
      orderIngredients: [],
      loading: false,
      error: null
    };
    expect(store.getState().orderDetail).toEqual(initialState);
  });
  it(
    'getOrderDetailsByNumber Проверяет изменение состояние стора при' +
      ' вызове экшена с типом Pending',
    () => {
      store.dispatch({ type: getOrderDetailsByNumber.pending.type });
      const state = store.getState().orderDetail;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    }
  );
  it(
    'getOrderDetailsByNumber Проверяет изменение состояние стора при' +
      ' вызове экшена с типом Fulfilled',
    async () => {
      (getOrderByNumberApi as jest.Mock).mockResolvedValueOnce(feedsDataMock);
      await store.dispatch(getOrderDetailsByNumber(12345) as any);
      const state = store.getState().orderDetail;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderIngredients).toEqual(
        feedsDataMock.orders[0].ingredients
      );
      expect(state.order).toEqual(feedsDataMock.orders[0]);
    }
  );
  it(
    'getOrderDetailsByNumber Проверяет изменение состояние стора при' +
      ' вызове экшена с типом Rejected',
    async () => {
      const errorMessage = 'Ошибка загрузки заказа';
      (getOrderByNumberApi as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );
      await store.dispatch(getOrderDetailsByNumber(12345) as any);
      const state = store.getState().orderDetail;
      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
    }
  );
  it('Проверяет очистку заказа', () => {
    store.dispatch(clearOrder());
    const state = store.getState().orderDetail;
    expect(state.order).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.orderIngredients).toEqual([]);
  });
});

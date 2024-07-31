import orderReducer, {
  TInitialState,
  placeOrder,
  clearOrder
} from '../orderSlice';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { localStorageMock, orderWithNameDataMock } from './mock';
jest.mock('../../utils/burger-api');

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('Проверяет работу редьюсера order', () => {
  let store: EnhancedStore<{ order: TInitialState }>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
  });
  it('Проверяет начальное состояние', () => {
    const initialState: TInitialState = {
      order: null,
      isPending: false,
      name: ''
    };
    expect(store.getState().order).toEqual(initialState);
  });
  it(
    'placeOrder Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Pending',
    () => {
      store.dispatch({ type: placeOrder.pending.type });
      const state = store.getState().order;
      expect(state.isPending).toBe(true);
    }
  );

  it(
    'placeOrder Проверяет изменение состояние стора при вызове' +
      ' экшена с типом Fulfilled',
    async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValueOnce(
        orderWithNameDataMock
      );
      await store.dispatch(placeOrder(['1', '2', '3']) as any);
      const state = store.getState().order;
      expect(state.isPending).toBe(false);
      expect(state.order).toEqual(orderWithNameDataMock.order);
      expect(state.name).toBe(orderWithNameDataMock.name);
    }
  );
  it(
    'placeOrder Проверяет изменение состояние стора при вызове' +
      'экшена с типом Rejected',
    async () => {
      (orderBurgerApi as jest.Mock).mockRejectedValueOnce(
        new Error('Ошибка заказа')
      );
      await store.dispatch(placeOrder(['1', '2', '3']) as any);
      const state = store.getState().order;
      expect(state.isPending).toBe(false);
    }
  );

  it('Проверяет удаление ингредиентов', () => {
    store.dispatch(clearOrder());
    const state = store.getState().order;
    expect(state.isPending).toBe(false);
    expect(state.order).toBeNull();
    expect(state.name).toBe('');
  });
});

import { expect, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderDetailsReducer from '../orderDetailSlice';
import feedsReducer from '../feedSlice';
import orderReducer from '../orderSlice';
import ingredientsReducer from '../ingredientSlice';
import constructorReducer from '../constructorSlice';
import userReducer from '../burgerUserSlice';
import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  it('Проверяет правильную инициализацию rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();
    expect(initialState).toEqual({
      burgerIngredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' }),
      constructorItems: constructorReducer(undefined, { type: '@@INIT' }),
      feeds: feedsReducer(undefined, { type: '@@INIT' }),
      user: userReducer(undefined, { type: '@@INIT' }),
      orderDetails: orderDetailsReducer(undefined, { type: '@@INIT' })
    });
  });
});

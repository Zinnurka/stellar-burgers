import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientSlice';
import constructorReducer from './constructorSlice';
import userReducer from './burgerUserSlice';
import feedsReducer from './feedSlice';
import orderReducer from './orderSlice';
import orderDetails from './orderDetailSlice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  constructorItems: constructorReducer,
  userReducer: userReducer,
  feeds: feedsReducer,
  order: orderReducer,
  orderDetails: orderDetails
});

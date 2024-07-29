import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface InitialState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: InitialState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };
      }
    },
    removeIngredient: (state, action) => {
      const { id } = action.payload;
      const updatedIngredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      );

      return {
        ...state,
        ingredients: updatedIngredients
      };
    },
    moveIngredientDown: (state, action) => {
      const { index } = action.payload;
      const nextIndex = index + 1;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[nextIndex];
      state.ingredients[nextIndex] = temp;
    },
    moveIngredientUp: (state, action) => {
      const { index } = action.payload;
      const itemToMove = state.ingredients[index];
      const previousIndex = index - 1;
      state.ingredients[index] = state.ingredients[previousIndex];
      state.ingredients[previousIndex] = itemToMove;
    },
    clearConstructorIngredients: () => ({
      bun: null,
      ingredients: []
    })
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructorIngredients
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

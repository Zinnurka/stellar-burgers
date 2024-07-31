import { TConstructorIngredient } from '@utils-types';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructorIngredients
} from '../constructorSlice';
import { ingredient, ingredient2, bun } from './mock';

describe('Тестирование работы среза конструктора бургера', () => {
  const initialState = {
    bun: null,
    ingredients: [] as TConstructorIngredient[]
  };

  it('Начальное состояние', () => {
    expect(constructorReducer(undefined, { type: '@@UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('Проверка добавления булки', () => {
    const actual = constructorReducer(initialState, addIngredient(bun));
    expect(actual.ingredients).toEqual([]);
    expect(actual.bun).toEqual(bun);
  });

  it('Проверка добавления начинки', () => {
    const actual = constructorReducer(initialState, addIngredient(ingredient));
    expect(actual.bun).toBeNull();
    expect(actual.ingredients).toEqual([ingredient]);
  });

  it('Проверка удаления начинки', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredient]
    };
    const actual = constructorReducer(
      initialStateWithIngredients,
      removeIngredient({ id: '2' })
    );
    expect(actual.ingredients).toEqual([]);
  });

  it('Проверка перемещения начинки', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredient, ingredient2]
    };
    const actual = constructorReducer(
      initialStateWithIngredients,
      moveIngredientUp({ index: 1 })
    );
    expect(actual.ingredients).toEqual([ingredient2, ingredient]);
  });

  it('Проверка перемещения начинки вниз', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredient, ingredient2]
    };
    const actual = constructorReducer(
      initialStateWithIngredients,
      moveIngredientDown({ index: 0 })
    );
    expect(actual.ingredients).toEqual([ingredient2, ingredient]);
  });

  it('Проверка очистки конструктора', () => {
    const initialStateWithIngredients = {
      bun,
      ingredients: [ingredient]
    };
    const actual = constructorReducer(
      initialStateWithIngredients,
      clearConstructorIngredients()
    );
    expect(actual).toEqual(initialState);
  });
});

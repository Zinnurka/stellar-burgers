import { FC, memo } from 'react';
import { TBurgerIngredientProps } from './type';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { addIngredient } from '../../services/constructorSlice';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatcher = useDispatch();

    const handleAdd = () => {
      dispatcher(addIngredient({ ...ingredient, id: uuid() }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

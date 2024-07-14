import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/constructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatcher = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatcher(moveIngredientDown({ index }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatcher(moveIngredientUp({ index }));
      }
    };

    const handleClose = () => {
      dispatcher(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

import { FC, useMemo } from 'react';
import { clearOrder, placeOrder } from '../../services/orderSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/burgerUserSlice';

export const BurgerConstructor: FC = () => {
  const selectedConstructorItems = useSelector(
    (state: RootState) => state.constructorItems
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigationHandler = useNavigate();
  const dispatcher = useDispatch();
  const orderModalData = useSelector((state) => state.order.order);
  const orderRequest = useSelector((state) => state.order.isPending);
  const onOrderClick = () => {
    if (!selectedConstructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigationHandler('/login');
    } else if (isAuthenticated) {
      const orderData = [
        ...selectedConstructorItems.ingredients.map((item) => item._id),
        selectedConstructorItems.bun._id,
        selectedConstructorItems.bun._id
      ];
      dispatcher(placeOrder(orderData));
    }
  };

  const closeOrderModal = () => {
    dispatcher(clearOrder());
  };

  const price = useMemo(
    () =>
      (selectedConstructorItems.bun
        ? selectedConstructorItems.bun.price * 2
        : 0) +
      selectedConstructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [selectedConstructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={selectedConstructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

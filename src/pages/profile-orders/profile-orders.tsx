import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersThunk } from '../../services/burgerUserSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatcher = useDispatch();
  const orders = useSelector((state) => state.userReducer.userOrders);

  useEffect(() => {
    dispatcher(getUserOrdersThunk());
  }, [dispatcher]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};

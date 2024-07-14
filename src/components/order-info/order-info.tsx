import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import {
  clearOrder,
  getOrderDetailsByNumber
} from '../../services/orderDetailSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const orderDetails = useSelector((state) => state.orderDetails.order);
  const dispatcher = useDispatch();
  const { loading } = useSelector((state) => state.orderDetails);
  const { number } = useParams<{ number: string }>();

  const orderIngredientsId = useSelector(
    (state) => state.orderDetails.orderIngredients
  );
  const allIngredients: TIngredient[] = JSON.parse(
    localStorage.getItem('ingredients')!
  );
  const ingredients: TIngredient[] = orderIngredientsId.map(
    (id) => allIngredients.find((ing) => ing._id === id)!
  );

  useEffect(() => {
    dispatcher(getOrderDetailsByNumber(parseInt(number as string)));
    return () => {
      dispatcher(clearOrder());
    };
  }, [dispatcher, number]);

  /* Готовим данные для отображения */

  const orderInfo = useMemo(() => {
    if (!orderDetails || !ingredients.length) return null;

    const date = new Date(orderDetails.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderDetails.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderDetails,
      ingredientsInfo,
      date,
      total
    };
  }, [orderDetails, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  if (loading) {
    return <Preloader />;
  } else {
    return <OrderInfoUI orderInfo={orderInfo} />;
  }
};

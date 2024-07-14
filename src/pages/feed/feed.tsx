import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { getFeedThunk } from '../../services/feedSlice';

export const Feed: FC = () => {
  const dispatcher = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.feeds.orders);
  const feedsRequesting = useSelector((state) => state.feeds.feedsRequesting);

  useEffect(() => {
    dispatcher(getFeedThunk());
  }, [dispatcher]);

  if (feedsRequesting) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatcher(getFeedThunk())} />
  );
};

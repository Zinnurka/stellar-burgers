import { FC } from 'react';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userData = localStorage.getItem('user') || '';
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userName = parsedUserData ? parsedUserData.name : '';

  return <AppHeaderUI userName={userName} />;
};

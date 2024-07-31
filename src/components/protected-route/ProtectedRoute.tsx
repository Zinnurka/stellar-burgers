import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  unAuthRequired?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  unAuthRequired,
  children
}: ProtectedRouteProps) => {
  const currentLocation = useLocation();
  const authenticatedStatus = getCookie('accessToken') != undefined;

  if (unAuthRequired) {
    if (authenticatedStatus) {
      return <Navigate replace to='/' state={{ from: currentLocation }} />;
    } else {
      return children;
    }
  }

  if (!authenticatedStatus) {
    return <Navigate replace to='/login' state={{ from: currentLocation }} />;
  }

  return children;
};

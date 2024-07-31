import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { logoutAsyncThunk } from '../../services/burgerUserSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const handleLogout = () => {
    dispatcher(logoutAsyncThunk());
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

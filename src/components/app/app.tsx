import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import { useDispatch } from '../../services/store';
import styles from './app.module.css';
import { getIngredients } from '../../services/ingredientSlice';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  Profile,
  ProfileOrders,
  ForgotPassword,
  Login,
  NotFound404,
  Register,
  ResetPassword
} from '@pages';
import { getCookie } from '../../utils/cookie';
import { getUserAsyncThunk, setUser } from '../../services/burgerUserSlice';

const App = () => {
  const dispatcher = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatcher(getUserAsyncThunk());
    const userFromLocalStorage = localStorage.getItem('user');
    const accessTokenFromCookie = getCookie('accessToken');
    if (userFromLocalStorage && accessTokenFromCookie) {
      dispatcher(setUser(JSON.parse(userFromLocalStorage)));
    }
  }, [dispatcher]);

  useEffect(() => {
    dispatcher(getIngredients());
  }, [dispatcher]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuthRequired>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute unAuthRequired>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuthRequired>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute unAuthRequired>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Детали заказа'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title='Информация о заказе'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Ингредиенты'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;

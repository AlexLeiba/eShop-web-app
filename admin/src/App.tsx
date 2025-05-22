import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SalesPage from './pages/SalesPage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/auth/LoginPage';
import SingleProductPage from './pages/SingleProductPage';
import SingleUserPage from './pages/SingleUserPage';
import './index.css';
import './SCSS.scss';
import NewProductPage from './pages/NewProductPage';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { type RootState } from './store/config';
import {
  ProtectedRoute,
  // ProtectedRoutes,
} from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  const userData = useSelector((state: RootState) => state.user.userData);

  const sessionToken = userData?.token || '';
  console.log('🚀 ~ App ~ sessionToken:', sessionToken);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          <Route
            path='/'
            element={
              <ProtectedRoute token={sessionToken}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/analytics'
            element={
              <ProtectedRoute token={sessionToken}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/sales'
            element={
              <ProtectedRoute token={sessionToken}>
                <SalesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/users'
            element={
              <ProtectedRoute token={sessionToken}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/:userId'
            element={
              <ProtectedRoute token={sessionToken}>
                <SingleUserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/new-product'
            element={
              <ProtectedRoute token={sessionToken}>
                <NewProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products'
            element={
              <ProtectedRoute token={sessionToken}>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/product/:productId'
            element={
              <ProtectedRoute token={sessionToken}>
                <SingleProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/transactions'
            element={
              <ProtectedRoute token={sessionToken}>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

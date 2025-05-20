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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          <Route path='/' element={<DashboardPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/sales' element={<SalesPage />} />

          <Route path='/users' element={<UsersPage />} />
          <Route path='/user/:userId' element={<SingleUserPage />} />

          <Route path='/new-product' element={<NewProductPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:productId' element={<SingleProductPage />} />

          <Route path='/transactions' element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

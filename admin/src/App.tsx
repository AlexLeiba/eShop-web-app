import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SalesPage from './pages/SalesPage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/auth/LoginPage';
import './index.css';

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
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

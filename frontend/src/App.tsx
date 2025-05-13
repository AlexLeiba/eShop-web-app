import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ScrollToTop } from './lib/utils';
import SuccessPaymentPage from './pages/payments/SuccessPaymentPage';
import ErrorPaymentPage from './pages/payments/ErrorPaymentPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const isUserLogged = false;
  return (
    <>
      <div>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/product/:id' element={<Product />} />

            {/* Private routes */}
            <Route
              path='/wishlist'
              element={!isUserLogged ? <Navigate to='/login' /> : <Wishlist />}
            />
            <Route
              path='/cart'
              element={!isUserLogged ? <Navigate to='/login' /> : <Cart />}
            />

            {/* Auth routes */}
            <Route
              path='/login'
              element={isUserLogged ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/register'
              element={isUserLogged ? <Navigate to='/' /> : <Register />}
            />

            {/* Payment Stripe */}
            <Route path='/success' element={<SuccessPaymentPage />} />
            <Route path='/error' element={<ErrorPaymentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ScrollToTop } from './lib/utils';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/cart' element={<Cart />} />

            {/* Auth routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

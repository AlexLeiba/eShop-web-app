import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ScrollToTop } from "./lib/utils";
import SuccessPaymentPage from "./pages/payments/SuccessPaymentPage";
import ErrorPaymentPage from "./pages/payments/ErrorPaymentPage";
import { Toaster } from "react-hot-toast";
import { SetDefaultLanguage } from "./components/Language/SetDefaultLanguage";
import Orders from "./pages/Orders";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import { ProtectedRoutes } from "./lib/ProtectedRoutes";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Toaster position="bottom-right" />
          <ScrollToTop />
          <SetDefaultLanguage />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/product/:id" element={<Product />} />

            {/* Private routes */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoutes>
                  <Wishlist />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              }
            />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Payment Stripe */}
            <Route path="/success" element={<SuccessPaymentPage />} />
            <Route path="/cancel" element={<ErrorPaymentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

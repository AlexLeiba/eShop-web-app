import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearCart } from '../../store/cart/reducer';
import { useSessionToken } from '../../hooks/useSesstionToken';

function SuccessPaymentPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionToken = useSessionToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/success${search}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${sessionToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success('Order paid successfully');
          dispatch(clearCart());
          navigate('/orders');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    // This effect runs when the component mounts

    fetchData();
  }, []);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Thank you for your purchase!</h1>
      <p>Your payment was successful</p>
    </div>
  );
}

export default SuccessPaymentPage;

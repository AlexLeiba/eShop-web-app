import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearCart } from '../../store/cart/reducer';

function SuccessPaymentPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: RootState) => state.user?.userData?.data
  );
  const sessionToken = userData?.token || '';

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
          navigate('/products');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    // This effect runs when the component mounts

    fetchData();
  }, []);
  return <div>SuccessPaymentPage</div>;
}

export default SuccessPaymentPage;

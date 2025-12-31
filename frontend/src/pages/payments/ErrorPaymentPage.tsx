import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSessionToken } from "../../hooks/useSesstionToken";

function ErrorPaymentPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const sessionToken = useSessionToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cancel${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${sessionToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Order was canceled");
          navigate("/orders");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    // This effect runs when the component mounts

    fetchData();
  }, [navigate, search, sessionToken]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Something went wrong with your payment</h1>
      <p>Please try again later</p>
    </div>
  );
}

export default ErrorPaymentPage;

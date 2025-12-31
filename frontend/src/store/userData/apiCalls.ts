import type { Action } from "@reduxjs/toolkit";
import {
  loginError,
  loginFetching,
  loginSuccess,
  logoutAction,
  logoutError,
  logoutFetching,
} from "./reducer";
import type { LoginType, RegisterType } from "../../lib/schemas";
import { axiosInstance } from "../../lib/axiosInstance";
import { clearWishList } from "../wishList/reducer";
import { clearCart } from "../cart/reducer";
import { jwtDecode } from "jwt-decode";

// Type all payloads from apiCalls

// LOGIN
type LoginProps = {
  user: LoginType | null;
  dispatch: React.Dispatch<Action>;
};
export async function login({ dispatch, user }: LoginProps) {
  dispatch(loginFetching(true));
  try {
    const { data: response } = await axiosInstance({
      url: `/api/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    if (response.data) {
      dispatch(
        loginSuccess({
          userData: response.data.data,
          token: response.data.token,
        })
      );
      return { data: response.data, error: null };
    }
    if (response.status.toString().includes("4")) {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    dispatch(loginError(error.response.data.error || "Something went wrong"));
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  } finally {
    dispatch(loginFetching(false));
  }
}

type LogoutProps = {
  dispatch: React.Dispatch<Action>;
  sessionToken: string;
};
export async function logout({ dispatch, sessionToken }: LogoutProps) {
  dispatch(logoutFetching());
  try {
    const decodedUserData: { email: string } = jwtDecode(sessionToken);
    if (decodedUserData.email) {
      const response = await axiosInstance({
        url: `/api/logout`,
        method: "POST",
        data: { email: decodedUserData.email },
      });

      if (response.status.toString().startsWith("2")) {
        dispatch(logoutAction());
        dispatch(clearCart());
        dispatch(clearWishList());
        localStorage.removeItem("persist:root");
        return { data: response.data, error: null };
      }
    }
  } catch (error: any) {
    dispatch(logoutError(error.response.data.error || "Something went wrong"));
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

// REGISTER
type RegisterProps = {
  registerData: RegisterType | null;
};
export async function register({ registerData }: RegisterProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: registerData,
    });

    if (response.data) {
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

// RESET PASSWORD
// SEND OTP CODE TO USER EMAIL

export async function sendOtpForgotPasswordEmail({ email }: { email: string }) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/forgot-password`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email },
    });

    if (response.data) {
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

// CHECK OTP AFTER USER ENTERED THE CODE
export async function checkOtpForgotPasswordFromEmail({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/check-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, otp },
    });

    if (response.data) {
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

// RESET PASSWORD AFTER THE OTP WAS INTRODUCED CORRECTLY
export async function resetPasswordFromEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/reset-password`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password },
    });

    if (response.data) {
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

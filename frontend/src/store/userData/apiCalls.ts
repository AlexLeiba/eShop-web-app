import type { Action } from '@reduxjs/toolkit';
import { loginError, loginFetching, loginSuccess } from './reducer';
import type { LoginType, RegisterType } from '../../lib/schemas';

type LoginProps = {
  user: LoginType | null;
  dispatch: React.Dispatch<Action>;
};
export async function login({ dispatch, user }: LoginProps) {
  dispatch(loginFetching());
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    const responseData = await response.json();

    if (responseData.error) {
      dispatch(loginError(responseData.error));
      return { data: null, error: responseData.error };
    }
    if (responseData.data) {
      dispatch(loginSuccess(responseData));
      return { data: responseData.data, error: null };
    }
  } catch (error: any) {
    dispatch(loginError(error.message));
    return { data: null, error: error.message };
  }
}

type RegisterProps = {
  registerData: RegisterType | null;
};
export async function register({ registerData }: RegisterProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      }
    );
    const { data, error } = await response.json();

    if (data) {
      return { data, error: null };
    }
    if (error) {
      return { data: null, error: error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// RESET PASSWORD
// SEND OTP CODE TO USER EMAIL

export async function sendOtpForgotPasswordEmail({ email }: { email: string }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const { data, error } = await response.json();

    if (data) {
      return { data, error: null };
    }
    if (error) {
      return { data: null, error: error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/check-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      }
    );
    const { data, error } = await response.json();

    if (data) {
      return { data, error: null };
    }
    if (error) {
      return { data: null, error: error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const { data, error } = await response.json();

    if (data) {
      return { data, error: null };
    }
    if (error) {
      return { data: null, error: error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

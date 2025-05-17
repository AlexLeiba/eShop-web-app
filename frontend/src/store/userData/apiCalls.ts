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
      return { data: null, error: error.message };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

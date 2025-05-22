import type { Action } from '@reduxjs/toolkit';
import { loginError, loginSuccess } from './reducers';
import type { LoginType } from '../../lib/schemas';

type Props = {
  dispatch: React.Dispatch<Action>;
  userData: LoginType;
};
export async function login({ dispatch, userData }: Props) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );
    const responseData = await response.json();

    if (responseData.error) {
      dispatch(loginError(responseData.error));
      return { data: null, error: responseData.error };
    }
    if (responseData.data) {
      dispatch(loginSuccess(responseData.data));
      return { data: responseData.data, error: null };
    }
  } catch (error: any) {
    dispatch(loginError(error.message));
  }
}

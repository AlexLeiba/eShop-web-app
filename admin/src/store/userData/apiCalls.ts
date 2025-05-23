import type { Action } from '@reduxjs/toolkit';
import { loginError, loginSuccess } from './reducers';
import type { LoginType } from '../../lib/schemas';
import { apiFactory } from '../../lib/apiFactory';

type Props = {
  dispatch: React.Dispatch<Action>;
  userData: LoginType;
};
export async function login({ dispatch, userData }: Props) {
  try {
    const response = await apiFactory().login({ userData });

    if (response.error) {
      dispatch(loginError(response.error));
      return { data: null, error: response.error };
    }
    if (response.data) {
      dispatch(loginSuccess(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    dispatch(loginError(error.message));
  }
}

import { createSlice } from '@reduxjs/toolkit';

export type UserType = {
  data: {
    _id: string;
    email: string;
    name: string;
    isAdmin: string;
    userName: string;
    lastName: string;
  };
  token: string;
};

export type UserDataType = {
  userData: UserType | null;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
};
const initialUserState: UserDataType = {
  userData: null,
  isFetching: false,
  error: false,
  errorMessage: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    loginFetching: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = '';
      state.userData = action.payload;
    },
    loginError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload.error;
      state.userData = null;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { loginFetching, loginSuccess, loginError, logout } =
  userReducer.actions;

export default userReducer.reducer;

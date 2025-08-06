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
  userData: UserType;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: UserDataType = {
  userData: {
    data: {
      _id: '',
      email: '',
      name: '',
      isAdmin: '',
      userName: '',
      lastName: '',
    },
    token: '',
  },
  isFetching: false,
  error: false,
  errorMessage: '',
};
const userSlice = createSlice({
  name: 'userData',
  initialState: initialState,
  reducers: {
    loginFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.userData.data = action.payload.userData;
      state.userData.token = action.payload.token;
    },
    loginError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload.error;
    },
    refreshToken: (state, action) => {
      state.userData.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.userData = initialState.userData;
      state.isFetching = false;
      state.error = false;
      state.errorMessage = '';
    },
    logoutError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload.error;
    },
    logoutFetching: (state) => {
      state.isFetching = true;
    },
  },
});

export const {
  loginFetching,
  loginSuccess,
  loginError,
  refreshToken,
  logoutAction,
  logoutError,
  logoutFetching,
} = userSlice.actions;
export default userSlice.reducer;

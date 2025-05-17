import { createSlice } from '@reduxjs/toolkit';

export type UserType = {
  data: {
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
};
export type UserDataType = {
  userData: UserType | null;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: UserDataType = {
  userData: null,
  isFetching: false,
  error: false,
  errorMessage: '',
};
const userSlice = createSlice({
  name: 'userData',
  initialState: initialState,
  reducers: {
    loginFetching: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.userData = action.payload;
    },
    loginError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload.error;
    },
  },
});

export const { loginFetching, loginSuccess, loginError } = userSlice.actions;
export default userSlice.reducer;

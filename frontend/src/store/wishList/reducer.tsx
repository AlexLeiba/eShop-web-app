import { createSlice } from '@reduxjs/toolkit';
import type { ProductsType } from '../../consts';

const initialState: ProductsType[] = [];

export const wishListSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToWithList: (state, action) => {
      const isProductAlreadyInList = state.find((item) => {
        return item._id === action.payload._id;
      });

      if (isProductAlreadyInList?._id) {
        return state;
      }

      state.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    clearWishList: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWithList, removeFromWishList, clearWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;

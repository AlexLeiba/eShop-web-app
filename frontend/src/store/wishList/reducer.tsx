import { createSlice } from "@reduxjs/toolkit";
import type { ProductsType } from "../../consts";

const initialState: { data: ProductsType[] } = { data: [] };

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlist: (state, action: { payload: ProductsType[] }) => {
      state.data = action.payload;
    },
    addToWithList: (state, action: { payload: ProductsType[] }) => {
      state.data = action.payload;
    },
    removeFromWishList: (state, action: { payload: ProductsType[] }) => {
      state.data = action.payload;
    },
    clearWishList: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWithList, removeFromWishList, clearWishList, getWishlist } =
  wishListSlice.actions;

export default wishListSlice.reducer;

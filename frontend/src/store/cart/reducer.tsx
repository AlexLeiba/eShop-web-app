import { createSlice } from '@reduxjs/toolkit';

export type CartType = {
  quantity: number;
  total: number;
  products: CartItemsType[];
};
export type CartItemsType = {
  _id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
  amount: number;
};

const initialState: CartType = {
  quantity: 0,
  total: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;

      const isProductAlreadyInCart = state.products.find((item) => {
        return (
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        );
      });

      // EXISTS
      if (isProductAlreadyInCart?._id) {
        state.products.forEach((item) => {
          if (item._id === isProductAlreadyInCart?._id) {
            item.quantity += action.payload.quantity;
          }
        });
      } else {
        // IS NEW
        state.products.push(action.payload);
      }
      state.total = state.products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      if (state.products.length === 0) {
        return initialState;
      }
      state.quantity -= 1;

      state.products = state.products.filter((item) => {
        if (
          item._id + item.size + item.color !==
          action.payload._id + action.payload.size + action.payload.color
        ) {
          return item;
        }
      });

      state.total = state.products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
    clearCart: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

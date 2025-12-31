import { createSlice } from "@reduxjs/toolkit";

export type CartType = {
  quantity: number;
  total: number;
  products: CartItemsType[];
};
export type CartItemsType = {
  _id: string;
  discountPrice: number;
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
  name: "cart",
  initialState,
  reducers: {
    getCartData: (
      state,
      action: { payload: { products: CartItemsType[] } }
    ) => {
      state.products = action.payload.products;

      const quantityAndTotalPrice = {
        quantity: 0,
        total: 0,
      };

      action.payload.products?.forEach((item: CartItemsType) => {
        if (item.quantity === 1) {
          quantityAndTotalPrice.quantity += 1;
          quantityAndTotalPrice.total += item.discountPrice || item.price;
        }
        if (item.quantity > 1) {
          quantityAndTotalPrice.quantity += item.quantity;
          quantityAndTotalPrice.total +=
            (item.discountPrice || item.price) * item.quantity;
        }
      });

      state.quantity = quantityAndTotalPrice.quantity;
      state.total = quantityAndTotalPrice.total;
    },
    addToCart: (state, action: { payload: { products: CartItemsType[] } }) => {
      state.products = action.payload.products; //add products to state.products array

      const quantityAndTotalPrice = {
        quantity: 0,
        total: 0,
      };

      action.payload.products?.forEach((item: CartItemsType) => {
        if (item.quantity === 1) {
          quantityAndTotalPrice.quantity += 1;
          quantityAndTotalPrice.total += item.discountPrice || item.price;
        }
        if (item.quantity > 1) {
          quantityAndTotalPrice.quantity += item.quantity;
          quantityAndTotalPrice.total +=
            (item.discountPrice || item.price) * item.quantity; //TODO: ADD THIS: item.price * item.quantity;
        }
      });

      state.quantity = quantityAndTotalPrice.quantity; //add quantity to state.quantity
      state.total = quantityAndTotalPrice.total; //add total to state.total
    },
    removeFromCart: (
      state,
      action: { payload: [{ products: CartItemsType[] }] }
    ) => {
      state.products = action.payload[0].products; //add products to state.products array

      const quantityAndTotalPrice = {
        quantity: 0,
        total: 0,
      };

      action.payload[0].products?.forEach((item: CartItemsType) => {
        if (item.quantity === 1) {
          quantityAndTotalPrice.quantity += 1;
          quantityAndTotalPrice.total += item.discountPrice || item.price;
        }
        if (item.quantity > 1) {
          quantityAndTotalPrice.quantity += item.quantity;
          quantityAndTotalPrice.total +=
            (item.discountPrice || item.price) * item.quantity;
        }
      });

      state.quantity = quantityAndTotalPrice.quantity; //add quantity to state.quantity
      state.total = quantityAndTotalPrice.total; //add total to state.total
    },
    addQuantityToCart: (
      state,
      action: { payload: { products: CartItemsType[] } }
    ) => {
      state.products = action.payload.products; //add products to state.products array

      const quantityAndTotalPrice = {
        quantity: 0,
        total: 0,
      };

      action.payload.products?.forEach((item: CartItemsType) => {
        if (item.quantity === 1) {
          quantityAndTotalPrice.quantity += 1;
          quantityAndTotalPrice.total += item.discountPrice || item.price;
        }
        if (item.quantity > 1) {
          quantityAndTotalPrice.quantity += item.quantity;
          quantityAndTotalPrice.total +=
            (item.discountPrice || item.price) * item.quantity;
        }
      });

      state.quantity = quantityAndTotalPrice.quantity; //add quantity to state.quantity
      state.total = quantityAndTotalPrice.total; //add total to state.total
    },
    clearCart: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  clearCart,
  getCartData,
  addQuantityToCart,
} = cartSlice.actions;

export default cartSlice.reducer;

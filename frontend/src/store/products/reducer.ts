import { createSlice } from '@reduxjs/toolkit';
import type { ProductsType } from '../../consts';

const initialState: {
  products: ProductsType[];
  product: {
    productData: ProductsType;
    isInCart: boolean;
    isInWishlist: boolean;
  };
} = {
  products: [],
  product: {
    isInCart: false,
    isInWishlist: false,
    productData: {
      title: '',
      description: '',
      price: 0,
      image: '',
      images: [],
      categories: [],
      color: [],
      size: [],
      _id: '',
      isPublished: false,
      inStock: false,
      createdAt: '',
      updatedAt: '',
      featured: false,
      featuredBackgroundColor: '',
      quantity: 0,
      __v: 0,
    },
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getProduct: (state, action) => {
      state.product.productData = action.payload.productData;
      state.product.isInCart = action.payload.isInCart;
      state.product.isInWishlist = action.payload.isInWishlist;
    },
    setCart: (state, action) => {
      state.product.isInCart = action.payload;
    },
    setWishlist: (state, action) => {
      state.product.isInWishlist = action.payload;
    },
  },
});

export const { getProducts, getProduct, setWishlist, setCart } =
  productsSlice.actions;
export default productsSlice.reducer;

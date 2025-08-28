import { createSlice } from "@reduxjs/toolkit";
import type { ProductsType } from "../../consts";

const initialState: {
  products: ProductsType[];
  productsCount: number;
  featuredProducts: { data: ProductsType[]; count: number };
  product: {
    productData: ProductsType;
    isInCart: boolean;
    isInWishlist: boolean;
  };
} = {
  products: [],
  productsCount: 0,

  featuredProducts: {
    data: [],
    count: 0,
  },
  product: {
    isInCart: false,
    isInWishlist: false,
    productData: {
      moreInfo: "",
      title: "",
      description: "",
      price: 0,
      image: "",
      images: [],
      categories: [],
      color: [],
      size: [],
      _id: "",
      isPublished: false,
      inStock: false,
      createdAt: "",
      updatedAt: "",
      featured: false,
      featuredBackgroundColor: "",
      ratings: [{ userId: "", rating: 0 }],
      quantity: 0,
      __v: 0,
    },
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.data;
      state.productsCount = action.payload.count;
    },
    getFeaturedProducts: (state, action) => {
      state.featuredProducts.data = action.payload.data;
      state.featuredProducts.count = action.payload.count;
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
    setRating: (state, action) => {
      state.product.productData.ratings = action.payload;
    },
  },
});

export const {
  getProducts,
  getProduct,
  setWishlist,
  setCart,
  getFeaturedProducts,
  setRating,
} = productsSlice.actions;
export default productsSlice.reducer;

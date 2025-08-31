import type { Action } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import { getFeaturedProducts, getProduct, getProducts } from "./reducer";
import { selectDefaultValues } from "../filters/reducer";
import type { ProductsType } from "../../consts";

type FetchProductsProps = {
  dispatch: React.Dispatch<Action>;
  language: string;
};
export async function fetchProducts({
  dispatch,
  language,
}: FetchProductsProps) {
  try {
    const productsResponse = await axiosInstance({
      url: `/api/products?sort=newest&limit=8&language=${language?.toLowerCase()}`,
      method: "GET",
    });

    const featuredProductsResponse = await axiosInstance({
      url: `/api/featured-products?language=${language?.toLowerCase()}`,
      method: "GET",
    });

    if (productsResponse?.data?.error) {
      throw new Error(productsResponse.data.error);
    }
    if (featuredProductsResponse?.data?.error) {
      throw new Error(featuredProductsResponse.data.error);
    }

    if (featuredProductsResponse?.data?.data) {
      dispatch(
        getFeaturedProducts({
          data: featuredProductsResponse?.data?.data,
          count: featuredProductsResponse?.data?.data.length,
        })
      );
    }
    if (productsResponse?.data?.data) {
      dispatch(
        getProducts({
          data: productsResponse?.data?.data,
          count: productsResponse?.data?.count,
        })
      );
    }

    return {
      data: productsResponse?.data?.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "Something went wrong",
    };
  }
}

type FetchProductProps = {
  dispatch: React.Dispatch<Action>;
  productId: string;
  sessionToken: string | null;
  language: string;
};

export async function fetchProduct({
  dispatch,
  productId,
  language,
  sessionToken,
}: FetchProductProps): Promise<{
  error: string | null;
  data: ProductsType | null;
}> {
  try {
    const { data: responseProduct } = await axiosInstance({
      url: `/api/products/${productId}?language=${language?.toLowerCase()}`,
      method: "GET",
    });

    dispatch(
      selectDefaultValues({
        color:
          responseProduct.data.color.length === 1
            ? responseProduct.data.color[0]
            : "",
        size:
          responseProduct.data.size.length === 1
            ? responseProduct.data.size[0]
            : "",
        quantity: 1,
      })
    );

    // IF USER IS LOGGED IN
    if (sessionToken) {
      //  CART ELEMENT

      const { data: responseCart } = await axiosInstance({
        url: `/api/cart`,
        method: "GET",
        headers: {
          token: `Bearer ${sessionToken}`,
        },
      });

      const isProductInCart = responseCart?.data?.products?.find(
        (item: ProductsType) => item._id === productId
      );

      // WISH LIST ELEMENT
      const { data: responseWishList } = await axiosInstance({
        url: `/api/wishlist`,
        method: "GET",
        headers: {
          token: `Bearer ${sessionToken}`,
        },
      });

      const isProductInWishList = responseWishList?.data?.find(
        (item: ProductsType) => item._id.split("_")[0] === productId
      );

      dispatch(
        getProduct({
          productData: responseProduct.data,
          isInCart: isProductInCart,
          isInWishlist: isProductInWishList,
        })
      );
    }
    if (!sessionToken) {
      dispatch(
        getProduct({
          productData: responseProduct.data,
          isInCart: false,
          isInWishlist: false,
        })
      );
    }

    return {
      data: responseProduct.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

type RateProductProps = {
  productId: string;
  sessionToken: string | null;
  rating: number;
};
export async function rateProduct({
  productId,
  sessionToken,
  rating,
}: RateProductProps): Promise<{
  error: string | null;
  data: ProductsType | null;
}> {
  try {
    const { data: responseProduct } = await axiosInstance({
      url: `/api/rate-product`,
      method: "POST",
      data: { rating, productId },
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${sessionToken}`,
      },
    });

    return {
      data: responseProduct.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

type ReviewProductProps = {
  productId: string;
  sessionToken: string | null;
  review: string;
  rating: number;
  userName: string;
};
export async function reviewProduct({
  productId,
  sessionToken,
  review,
  rating,
  userName,
}: ReviewProductProps): Promise<{
  error: string | null;
  data: ProductsType | null;
}> {
  try {
    const { data: responseProduct } = await axiosInstance({
      url: `/api/add-product-review`,
      method: "POST",
      data: { review, productId, rating, userName },
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${sessionToken}`,
      },
    });

    return {
      data: responseProduct.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

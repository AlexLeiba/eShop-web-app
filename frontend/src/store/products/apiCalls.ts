import type { Action } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axiosInstance';
import { getProduct, getProducts } from './reducer';
import { selectDefaultValues } from '../filters/reducer';
import type { ProductsType } from '../../consts';

type FetchProductsProps = {
  dispatch: React.Dispatch<Action>;
};
export async function fetchProducts({ dispatch }: FetchProductsProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/products`,
      method: 'GET',
    });

    dispatch(getProducts(response.data));

    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

type FetchProductProps = {
  dispatch: React.Dispatch<Action>;
  productId: string;
  language: string;
  sessionToken: string | null;
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
      method: 'GET',
    });

    dispatch(
      selectDefaultValues({
        color:
          responseProduct.data.color.length === 1
            ? responseProduct.data.color[0]
            : '',
        size:
          responseProduct.data.size.length === 1
            ? responseProduct.data.size[0]
            : '',
        quantity: 1,
      })
    );

    // IF USER IS LOGGED IN
    if (sessionToken) {
      //  CART ELEMENT

      const { data: responseCart } = await axiosInstance({
        url: `/api/cart`,
        method: 'GET',
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
        method: 'GET',
        headers: {
          token: `Bearer ${sessionToken}`,
        },
      });

      const isProductInWishList = responseWishList?.data?.find(
        (item: ProductsType) => item._id === productId
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
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

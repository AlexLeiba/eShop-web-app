import type { Action } from '@reduxjs/toolkit';
import {
  addQuantityToCart,
  addToCart,
  clearCart,
  getCartData,
  removeFromCart,
} from './reducer';
import type { ProductsInCartType } from '../../consts';
import { axiosInstance, axiosPrivateInstance } from '../../lib/axiosInstance';

// FETCH
type FetchCartDataProps = {
  dispatch: React.Dispatch<Action>;
  token: string;
  language: string;
};
export async function fetchCartData({
  dispatch,
  token,
  language,
}: FetchCartDataProps) {
  try {
    const { data: response } = await axiosPrivateInstance({
      method: 'GET',
      url: `/api/cart?language=${language}`,
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response?.data) {
      dispatch(getCartData(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

//UPDATE
type UpdateCartProps = {
  product: ProductsInCartType | null;
  token: string;
  dispatch: React.Dispatch<Action>;
};

export async function updateCart({
  dispatch,
  product,
  token,
}: UpdateCartProps) {
  try {
    const { data: response } = await axiosInstance({
      method: 'PUT',
      url: `/api/cart/product-new/${product?._id}`,
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${token}`,
      },
      data: product,
    });

    if (response.data) {
      dispatch(addToCart(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

// DELETE
type DeleteFromCartProps = {
  productId: string;
  token: string;
  color: string;
  size: string;
  dispatch: React.Dispatch<Action>;
};

export async function deleteFromCart({
  dispatch,
  token,
  productId,
  color,
  size,
}: DeleteFromCartProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/cart/product-delete/${productId}/${color}/${size}`,
      method: 'PUT',
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response.data) {
      dispatch(removeFromCart(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

// DELETE ALL ELEMENTS FROM CART
type ClearCartProps = {
  dispatch: React.Dispatch<Action>;
  token: string;
};
export async function clearAllCartProducts({
  dispatch,
  token,
}: ClearCartProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/cart`,
      method: 'DELETE',
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response.data) {
      dispatch(clearCart());
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

// CHANGE QUANTITY OF PRODUCT IN CART
type AddCartProductQuantityProps = {
  dispatch: React.Dispatch<Action>;
  token: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
};
export async function changeCartProductQuantity({
  dispatch,
  productId,
  quantity,
  token,
  size,
  color,
}: AddCartProductQuantityProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/cart/product-quantity/${productId}/${quantity}/${size}/${color}`,
      method: 'PUT',
      headers: {
        token: `Bearer ${token}`,
      },
      data: { quantity },
    });

    if (response.data) {
      dispatch(addQuantityToCart(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || 'Something went wrong',
    };
  }
}

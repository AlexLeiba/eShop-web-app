import type { Action } from '@reduxjs/toolkit';
import {
  addQuantityToCart,
  addToCart,
  clearCart,
  getCartData,
  removeFromCart,
} from './reducer';
import type { ProductsInCartType } from '../../consts';

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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart?language=${language}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const cartData = await response.json();
    if (cartData?.data) {
      dispatch(getCartData(cartData.data));
      return { data: cartData.data, error: null };
    }
    if (cartData.error) {
      return { data: null, error: cartData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/product-new/${
        product?._id
      }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );

    const updatedCartProduct = await response.json();
    if (updatedCartProduct) {
      dispatch(addToCart(updatedCartProduct.data));
      return { data: updatedCartProduct.data, error: null };
    }
    if (updatedCartProduct.error) {
      return { data: null, error: updatedCartProduct.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
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
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/cart/product-delete/${productId}/${color}/${size}`,
      {
        method: 'PUT',
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );

    const deletedCartProduct = await response.json();
    console.log('🚀 ~ deletedCartProduct:\n\n\n', deletedCartProduct);
    if (deletedCartProduct.data) {
      dispatch(removeFromCart(deletedCartProduct.data));
      return { data: deletedCartProduct.data, error: null };
    }
    if (deletedCartProduct.error) {
      return { data: null, error: deletedCartProduct.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      {
        method: 'DELETE',
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const cartData = await response.json();
    if (cartData.data) {
      dispatch(clearCart());
      return { data: cartData.data, error: null };
    }
    if (cartData.error) {
      return { data: null, error: cartData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// DELETE ALL ELEMENTS FROM CART
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
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/cart/product-quantity/${productId}/${quantity}/${size}/${color}`,
      {
        method: 'PUT',
        headers: {
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    const updatedCartProduct = await response.json();

    if (updatedCartProduct.data) {
      dispatch(addQuantityToCart(updatedCartProduct.data));
      return { data: updatedCartProduct.data, error: null };
    }
    if (updatedCartProduct.error) {
      return { data: null, error: updatedCartProduct.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

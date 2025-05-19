import type { Action } from '@reduxjs/toolkit';
import type { ProductsType } from '../../consts';
import { addToWithList, getWishlist, removeFromWishList } from './reducer';

type FetchWishlistProps = {
  dispatch: React.Dispatch<Action>;
  token: string;
  language: string;
};
// FETCH
export async function fetchWishlist({
  dispatch,
  token,
  language,
}: FetchWishlistProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/wishlist?language=${language}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const wishlistData = await response.json();
    if (wishlistData.data) {
      dispatch(getWishlist(wishlistData.data));
      return { data: wishlistData, error: null };
    }
    if (wishlistData.error) {
      return { data: null, error: wishlistData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// DELETE
type DeleteFromWishlistProps = {
  productId: string;
  token: string;
  dispatch: React.Dispatch<Action>;
};
export async function deleteFromWishlist({
  dispatch,
  productId,
  token,
}: DeleteFromWishlistProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productId}`,
      {
        method: 'DELETE',
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const wishlistData = await response.json();
    if (wishlistData.data) {
      dispatch(removeFromWishList(wishlistData.data));
      return { data: wishlistData.data, error: null };
    }
    if (wishlistData.error) {
      return { data: null, error: wishlistData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// UPDATE
type UpdateWishlistProps = {
  product: ProductsType | null;
  token: string;

  dispatch: React.Dispatch<Action>;
};
export async function updateWishlist({
  dispatch,
  product,
  token,
}: UpdateWishlistProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${product?._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );

    const productData = await response.json();
    if (productData.data) {
      dispatch(addToWithList(productData.data));
      return { data: productData.data, error: null };
    }
    if (productData.error) {
      return { data: null, error: productData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

type DeleteAllElementsFromWishlistProps = {
  token: string;
  dispatch: React.Dispatch<Action>;
};

export async function deleteAllElemensFromWishlist({
  dispatch,
  token,
}: DeleteAllElementsFromWishlistProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/wishlist-delete`,
      {
        method: 'DELETE',
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const wishlistData = await response.json();
    if (wishlistData.data) {
      dispatch(removeFromWishList([]));
      return { data: wishlistData.data, error: null };
    }
    if (wishlistData.error) {
      return { data: null, error: wishlistData.error };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

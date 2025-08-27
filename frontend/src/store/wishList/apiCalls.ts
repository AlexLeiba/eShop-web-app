import type { Action } from "@reduxjs/toolkit";
import type { ProductsType } from "../../consts";
import { addToWithList, getWishlist, removeFromWishList } from "./reducer";
import { axiosInstance, axiosPrivateInstance } from "../../lib/axiosInstance";

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
    const { data: response } = await axiosPrivateInstance({
      url: `/api/wishlist?language=${language}`,
      method: "GET",
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response.data) {
      dispatch(getWishlist(response.data));
      return { data: response, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
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
    const { data: response } = await axiosInstance({
      url: `/api/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response.data) {
      dispatch(removeFromWishList(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
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
    const { data: response } = await axiosInstance({
      method: "PUT",
      url: `/api/wishlist/${product?._id}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      data: product,
    });

    if (response.data) {
      dispatch(addToWithList(response.data));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

// DELETE ALL ELEMENTS FROM WISHLIST
type DeleteAllElementsFromWishlistProps = {
  token: string;
  dispatch: React.Dispatch<Action>;
};

export async function deleteAllElemensFromWishlist({
  dispatch,
  token,
}: DeleteAllElementsFromWishlistProps) {
  try {
    const { data: response } = await axiosInstance({
      url: `/api/wishlist-delete`,
      method: "DELETE",
      headers: {
        token: `Bearer ${token}`,
      },
    });

    if (response.data) {
      dispatch(removeFromWishList([]));
      return { data: response.data, error: null };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.error || "Something went wrong",
    };
  }
}

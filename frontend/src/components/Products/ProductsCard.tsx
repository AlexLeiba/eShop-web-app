import { Link } from "react-router-dom";
import type { ProductsType } from "../../consts";
import { Button } from "../ui/Button";
import {
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../../store/wishList/apiCalls";
import toast from "react-hot-toast";
import { updateCart } from "../../store/cart/apiCalls";
import { useTranslation } from "react-i18next";
import { useSessionToken } from "../../hooks/useSesstionToken";
import { CardRate } from "./CardRate";
import type { RootState } from "../../store/store";
import { cn } from "../../lib/utils";
import { Discount } from "./Discount";

type Props = {
  data: ProductsType;
};

export function ProductsCard({ data }: Props) {
  console.log("🚀 ~ ProductsCard ~ data:", data);
  const { t } = useTranslation("translation", { keyPrefix: "ProductsPage" });
  const dispatch = useDispatch();
  const sessionToken = useSessionToken();
  const wishList = useSelector((state: RootState) => state.wishlist.data) || [];

  async function handleAddToCart(product: ProductsType) {
    const response = await updateCart({
      dispatch,
      product: {
        ...product,
        color: product.color[0],
        size: product.size[0],
        quantity: 1,
        categories: product.categories[0], // Use the first category as a string
        productId: product._id,
      },
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.productAddedToCart"));
    }
  }

  async function handleAddToWishList(product: ProductsType) {
    const response = await updateWishlist({
      dispatch,
      product: product,
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.productAddedToWishlist"));
    }
  }

  function isProductFavorite() {
    if (wishList) {
      return wishList.find((product) => product.productId === data._id);
    }

    return false;
  }
  return (
    <div
      key={data._id}
      className="group relative  scale-100 hover:scale-101 shadow hover:shadow-2xl transition-all ease-in-out flex items-center gap-2 p-4 h-[300px] bg-white dark:bg-gray-400 rounded-lg  overflow-hidden flex-col justify-between "
    >
      {/* FAVORITE */}
      <div className="flex justify-between items-center w-full absolute top-0 left-0 right-0">
        {isProductFavorite() && (
          <IconHeartFilled
            className="text-white absolute left-4 top-4"
            size={18}
          />
        )}
        {data.discountPrice && (
          <div className="absolute top-10 left-0">
            <Discount discount={data.discountPrice} price={data.price} />
          </div>
        )}

        {/* STAR RATE */}
        <CardRate rating={data?.ratings?.filter((data) => data.rating > 0)} />
      </div>

      {/* THE BUTTONS MENU ON HOVER */}
      <div className="transition-all lg:bg-transparent  lg:group-hover:bg-black/20 bg-black/20  absolute inset-0 h-full w-full flex justify-center items-center gap-2">
        <div className="lg:group-hover:flex lg:hidden md:flex flex transition-all  gap-2">
          <Button
            disabled={!sessionToken}
            onClick={() => handleAddToCart(data)}
            className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-110 transition-all "
          >
            <IconShoppingCart />
          </Button>

          <Button
            disabled={!sessionToken}
            onClick={() => handleAddToWishList(data)}
            className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100  hover:scale-110 transition-all "
          >
            <IconHeart className={cn(isProductFavorite() && "text-red-600")} />
          </Button>

          <Link to={`/product/${data._id}`}>
            <Button className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100  hover:scale-110 transition-all ">
              <IconEye />
            </Button>
          </Link>
        </div>
      </div>

      {/* COVER IMAGE */}
      <div className="h-[200px]">
        <img
          loading="lazy"
          className="w-full h-[200px] object-contain"
          src={data.image}
          alt={data.title}
        />
      </div>

      {/* TITLE */}
      <div className="flex flex-col gap-1 w-full">
        <p className="text-xl font-bold line-clamp-1 text-center">
          {data.title}
        </p>

        {/* PRICE */}
        {data.discountPrice ? (
          <p>
            <span className="line-through text-gray-200 mr-2 text-sm">
              ${data.price}
            </span>
            ${data.discountPrice}
          </p>
        ) : (
          <p>${data.price}</p>
        )}
      </div>
    </div>
  );
}

import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { ProductsType } from "../../consts";
import { updateCart } from "../../store/cart/apiCalls";
import toast from "react-hot-toast";
import { deleteFromWishlist } from "../../store/wishList/apiCalls";
import { useTranslation } from "react-i18next";
import { Spacer } from "../ui/spacer";
import { useSessionToken } from "../../hooks/useSesstionToken";

type Props = {
  data: ProductsType;
  type: "cart" | "wishList";
};
export function WishListCard({ data, type }: Props) {
  const { t } = useTranslation("translation", { keyPrefix: "WishlistPage" });
  const dispatch = useDispatch();
  const sessionToken = useSessionToken();

  async function handleRemove() {
    const response = await deleteFromWishlist({
      dispatch,
      productId: data._id.split("_")[0],
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.productRemoved"));
    }
  }

  async function handleAddToCart() {
    const response = await updateCart({
      dispatch,
      product: {
        ...data,
        color: data.color[0],
        size: data.size[0],
        quantity: 1,
        categories: data.categories[0], // Use the first category as a string
        productId: data._id.split("_")[0],
        _id: data._id.split("_")[0],
      },
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.productAddedToWishlist"));
    }
  }
  return (
    <div className="flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative  lg:flex-row md:flex-row  flex-col dark:bg-gray-800">
      <Link to={`/product/${data._id}`}>
        <div>
          <img
            className="h-[160px] min-w-[300px] object-contain"
            src={data.image}
            alt={data.title}
          />
        </div>
      </Link>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold line-clamp-1">{data.title}</p>

          <p className="text-xl line-clamp-2 ">{data.description}</p>
        </div>
        <Spacer sm={8} />
        <div className="flex justify-between w-full gap-4">
          <div className="flex gap-4 items-center   lg:flex-1 flex-1">
            {type === "wishList" && (
              <Button
                onClick={handleAddToCart}
                className="w-full group"
                title="Add to cart"
              >
                <p className="lg:flex hidden">{t("addToCartButton")}</p>
                <IconShoppingCart className="lg:ml-2 group-hover:animate-bounce" />
              </Button>
            )}
          </div>

          <div className="flex lg:flex-1 justify-end">
            <p className="text-3xl  ">${data.price}</p>
          </div>
        </div>
      </div>
      <IconX
        title="Remove"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleRemove()}
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-500"
      />
    </div>
  );
}

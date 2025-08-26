import { Link } from "react-router-dom";
import type { ProductsType } from "../../consts";
import { Button } from "../ui/Button";
import { IconEye, IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateWishlist } from "../../store/wishList/apiCalls";
import toast from "react-hot-toast";
import { updateCart } from "../../store/cart/apiCalls";
import { useTranslation } from "react-i18next";
import { useSessionToken } from "../../hooks/useSesstionToken";

type Props = {
  data: ProductsType;
};

export function ProductsCard({ data }: Props) {
  const { t } = useTranslation("translation", { keyPrefix: "ProductsPage" });
  const dispatch = useDispatch();
  const sessionToken = useSessionToken();

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
  return (
    <div
      key={data._id}
      className="group relative  scale-100 hover:scale-101 shadow hover:shadow-2xl transition-all ease-in-out flex items-center gap-4 p-4 h-[300px] bg-white dark:bg-gray-400 rounded-lg  overflow-hidden flex-col justify-between "
    >
      <div className="transition-all lg:bg-transparent  lg:group-hover:bg-black/20 bg-black/20  absolute top-0 left-0 right-0 bottom-0 h-full w-full flex justify-center items-center gap-2">
        <div className="lg:group-hover:flex lg:hidden md:flex flex transition-all  gap-2">
          <Button
            disabled={!sessionToken}
            onClick={() => handleAddToCart(data)}
            className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all "
          >
            <IconShoppingCart />
          </Button>

          <Button
            disabled={!sessionToken}
            onClick={() => handleAddToWishList(data)}
            className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all "
          >
            <IconHeart />
          </Button>

          <Link to={`/product/${data._id}`}>
            <Button className="w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all ">
              <IconEye />
            </Button>
          </Link>
        </div>
      </div>

      <img
        loading="lazy"
        className="w-full h-[200px] object-contain"
        src={data.image}
        alt={data.title}
      />

      <div className="flex flex-col gap-4">
        <h4 className="lg:text-2xl md:text-3xl text-xl font-bold line-clamp-2 text-center">
          {data.title}
        </h4>
      </div>
    </div>
  );
}

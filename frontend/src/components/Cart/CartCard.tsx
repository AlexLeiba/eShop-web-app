import { IconShoppingCart, IconX } from "@tabler/icons-react";
import AddAmount from "../Products/AddAmount";
import { Button } from "../ui/Button";
import { type CartItemsType } from "../../store/cart/reducer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectedColor from "../Cart/SelectedColor";
import { deleteFromCart } from "../../store/cart/apiCalls";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSessionToken } from "../../hooks/useSesstionToken";
import { Discount } from "../Products/Discount";

type Props = {
  productData: CartItemsType;
  type: "cart" | "wishList";
};
export function CartCard({ productData, type }: Props) {
  console.log("🚀 ~ CartCard ~ productData:", productData);
  const { t } = useTranslation("translation", { keyPrefix: "CartPage" });

  const dispatch = useDispatch();
  const sessionToken = useSessionToken();

  async function handleRemove() {
    const response = await deleteFromCart({
      dispatch,
      token: sessionToken,
      productId: productData._id,
      color: productData.color,
      size: productData.size,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.productRemoved"));
    }
  }
  return (
    <div className="flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative lg:flex-row md:flex-row  flex-col dark:bg-gray-800 dark:text-white">
      {productData.discountPrice && (
        <Discount
          discount={productData.discountPrice}
          price={productData.price}
        />
      )}
      <Link to={`/product/${productData._id}`}>
        <div>
          <img
            className="h-[160px] min-w-[300px] object-contain"
            src={productData.image}
            alt={productData.title}
          />
        </div>
      </Link>

      <div className="flex flex-col justify-between w-full">
        <p className="text-xl line-clamp-1">
          <b className="text-semibold"> {t("product")}:</b> {productData.title}
        </p>
        <p className="text-xl line-clamp-1">
          <b className="text-semibold">ID:</b> {productData._id}
        </p>
        <p className="text-xl ">
          <b className="text-semibold">{t("size")}:</b>{" "}
          {productData.size.toUpperCase()}
        </p>
        <SelectedColor color={productData.color} />
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-center">
            <AddAmount
              productData={{
                size: productData.size,
                color: productData.color,
                quantity: productData.quantity,
              }}
              productId={productData._id}
              type="cartPage"
            />
            {type === "wishList" && (
              <Button>
                Add to cart <IconShoppingCart className="ml-2" />
              </Button>
            )}
          </div>

          <div>
            {/* PRICE */}
            {productData.discountPrice ? (
              <p className="text-3xl">
                <span className="line-through text-gray-200 mr-2 text-sm">
                  ${productData.price}
                </span>
                ${productData.discountPrice}
              </p>
            ) : (
              <p className="text-3xl">${productData.price}</p>
            )}
          </div>
        </div>
      </div>
      <IconX
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === "Enter" && handleRemove()}
        title="Remove product"
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-500"
      />
    </div>
  );
}

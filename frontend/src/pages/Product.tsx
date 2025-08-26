import React, { useEffect } from "react";
import { Container } from "../components/Grid/Container";
import { Newsletter } from "../components/Home/Newsletter";
import AddAmount from "../components/Products/AddAmount";
import Colors from "../components/Products/Colors";
import { Announcement } from "../components/ui/Announcement";
import { Button } from "../components/ui/Button";
import { Spacer } from "../components/ui/spacer";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { SizeSelector } from "../components/Products/SizeSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  IconChevronLeft,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
} from "@tabler/icons-react";
import { Loader } from "../components/ui/Loader";
import type { RootState } from "../store/store";
import { updateWishlist } from "../store/wishList/apiCalls";
import { updateCart } from "../store/cart/apiCalls";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout/Layout";
import { fetchProduct } from "../store/products/apiCalls";
import { setCart, setWishlist } from "../store/products/reducer";
import { useSessionToken } from "../hooks/useSesstionToken";

function Product() {
  const { t } = useTranslation("translation", { keyPrefix: "ProductPage" });
  const dispatch = useDispatch();
  const selectedValues = useSelector((state: RootState) => state.filters);
  const { productData, isInCart, isInWishlist } = useSelector(
    (state: RootState) => state.products.product
  );

  const sessionToken = useSessionToken();

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const language = localStorage.getItem("language");
    async function fetchData() {
      setLoading(true);

      const response = await fetchProduct({
        dispatch,
        productId,
        language: language?.toLowerCase() || "en",
        sessionToken,
      });

      if (response.error) {
        toast.error(response.error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleAddToCart() {
    console.log("first", productData._id);
    if (
      (!selectedValues.size || selectedValues.size === "Selectsize") &&
      !selectedValues.color
    ) {
      toast.error(t("toasts.selectSizeAndColor"));
      return;
    } else if (!selectedValues.size || selectedValues.size === "Selectsize") {
      toast.error(t("toasts.selectSize"));
      return;
    } else if (!selectedValues.color) {
      return toast.error(t("toasts.selectColor"));
    }

    const response = await updateCart({
      dispatch,
      product: {
        ...productData,
        color: selectedValues.color,
        size: selectedValues.size,
        quantity: selectedValues.quantity,
        categories: productData.categories[0], // Use the first category as a string
        productId: productData._id,
      },
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toasts.addedToCart"));
      dispatch(setCart(true));
    }
  }

  async function handleAddToWishList() {
    const response = await updateWishlist({
      dispatch,
      product: productData,
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toasts.addedToWishlist"));
      dispatch(setWishlist(true));
    }
  }

  function showSelectedImageColor() {
    return productData?.images.filter(
      (item) => item.colorName === selectedValues.color
    )[0]?.image;
  }

  return (
    <Layout>
      <Announcement
        title="lorem20 is coming soon dsdsadsa sdadsa dsadsad"
        link="google.com"
        linkTitle="Read More"
      />

      <Spacer size={24} />

      <Loader loading={loading} className="h-[616px]">
        <Container>
          <div
            onClick={() => window.history.back()}
            className="flex items-center  cursor-pointer shadow-md rounded-full p-2 w-fit hover:shadow-gray-400 transition-all"
            title="Go back"
          >
            <IconChevronLeft />
          </div>
        </Container>
        <Spacer sm={12} md={24} lg={24} />
        <Container>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
            {/* IMG */}
            {productData.image && (
              <img
                src={
                  !selectedValues.color
                    ? productData.image
                    : showSelectedImageColor()
                }
                alt={productData.title}
              />
            )}

            {/* Details */}

            <div>
              <h3 className="text-4xl ">{productData.title}</h3>
              <Spacer size={4} />
              <p>{productData.description}</p>

              <Spacer size={4} />
              <p className="text-3xl">${productData.price}</p>
              <Spacer size={12} />

              {/* COLORS */}
              <div className="flex items-center gap-2">
                <p className="text-xl">{t("color")}</p>
                <Colors colors={productData.color} />
              </div>
              <Spacer size={6} />

              {/* SIZE */}
              <div className="flex items-center gap-2">
                <p className="text-xl">{t("size")}</p>
                <SizeSelector type="size" data={productData.size} />
              </div>
              <Spacer size={6} />

              {/* AMOUNT */}
              <div className="flex items-center gap-2">
                <AddAmount type="productPage" productData={selectedValues} />
              </div>

              <Spacer size={6} />
              <Button onClick={handleAddToCart} disabled={!sessionToken}>
                {isInCart ? (
                  <>
                    {t("addedToCart")}
                    <IconShoppingCartFilled className="ml-2 text-green-500" />
                  </>
                ) : (
                  <>
                    {t("addToCartButton")}
                    <IconShoppingCart className="ml-2" />
                  </>
                )}
              </Button>
              <Spacer size={6} />
              <Button
                disabled={isInWishlist || !sessionToken}
                variant="secondary"
                onClick={handleAddToWishList}
              >
                {isInWishlist ? (
                  <>
                    {t("addedToWishlist")}
                    <IconHeartFilled className="ml-2 text-red-500" />
                  </>
                ) : (
                  <>
                    {t("addToWishlistButton")}
                    <IconHeart className="ml-2" />
                  </>
                )}
              </Button>
              <Spacer size={6} />
            </div>
          </div>
        </Container>
      </Loader>
      <Spacer sm={16} md={24} lg={24} />

      {/* Newsletter */}
      <Container fluid className="bg-gray-100 ">
        <Newsletter />
      </Container>
    </Layout>
  );
}

export default Product;

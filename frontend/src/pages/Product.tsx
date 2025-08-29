import React, { useEffect, useState } from "react";
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
  IconChevronDown,
  IconChevronLeft,
  IconChevronUp,
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
import DOMPurify from "dompurify";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { cn } from "../lib/utils";
import { StarRate } from "../components/ui/starRate";
import { Price } from "../components/Reusable/Price";
function Product() {
  const [open, setOpen] = React.useState(false);
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
          <div className="flex justify-between items-center">
            <div
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && window.history.back()}
              onClick={() => window.history.back()}
              className="flex items-center   cursor-pointer shadow-md rounded-full p-2 w-fit hover:shadow-gray-400 transition-all group"
              title="Go back"
            >
              <IconChevronLeft className="dark:text-white group-hover:-translate-x-2 transition-all duration-200" />
            </div>
            <StarRate
              defaultValue={productData?.ratings?.filter(
                (data) => data.rating > 0
              )}
              sessionToken={sessionToken}
              productId={productData._id}
            />
          </div>
        </Container>
        <Spacer sm={12} md={24} lg={24} />
        <Container>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
            {/* IMG */}
            <div className={cn("w-FULL h-[288px]")}>
              {productData.image && (
                <>
                  <img
                    onClick={() => setOpen(true)}
                    className="w-full h-full object-contain cursor-zoom-in"
                    loading="lazy"
                    src={
                      !selectedValues.color
                        ? productData.image
                        : showSelectedImageColor()
                    }
                    alt={productData.title}
                  />
                  <Lightbox
                    index={productData.images.findIndex((item) =>
                      selectedValues.color
                        ? item.colorName === selectedValues.color
                        : item.colorName === productData.color[0]
                    )}
                    open={open}
                    close={() => setOpen(false)}
                    slides={productData.images.slice().map((item) => ({
                      src: item.image,
                    }))}
                    plugins={[Zoom]}
                  />
                </>
              )}
            </div>

            {/* Details */}

            <div className="dark:text-white">
              <h3 className="text-4xl ">{productData.title}</h3>
              <Spacer size={4} />
              <p>{productData.description}</p>

              <Spacer size={4} />
              {/* PRICE */}

              <Price
                price={productData.price}
                discountPrice={productData.discountPrice}
              />
              <Spacer size={12} />

              {/* COLORS */}
              <div className="flex items-center gap-2">
                <p className="text-xl">{t("color")}</p>
                <Colors colors={productData.color} />
              </div>
              <Spacer size={6} />

              {/* SIZE */}
              <div className="flex items-center gap-2 dark:text-black">
                <p className="text-xl dark:text-gray-100">{t("size")}</p>
                <SizeSelector type="size" data={productData.size} />
              </div>
              <Spacer size={6} />

              {/* AMOUNT */}
              {sessionToken && (
                <div className="flex items-center gap-2">
                  <AddAmount type="productPage" productData={selectedValues} />
                </div>
              )}

              <Spacer size={6} />
              <Button onClick={handleAddToCart} disabled={!sessionToken}>
                {isInCart ? (
                  <>
                    <p>{t("addedToCart")}</p>
                    <IconShoppingCartFilled className="ml-2 text-green-500 " />
                  </>
                ) : (
                  <>
                    <p>{t("addToCartButton")}</p>
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
                    <p className="text-black dark:text-gray-300">
                      {t("addedToWishlist")}
                    </p>
                    <IconHeartFilled className="ml-2 text-red-500" />
                  </>
                ) : (
                  <>
                    <p>{t("addToWishlistButton")}</p>
                    <IconHeart className="ml-2" />
                  </>
                )}
              </Button>
              <Spacer size={6} />
            </div>
          </div>

          {productData.moreInfo && (
            <>
              <p className="font-medium text-xl dark:text-white">
                {t("moreInfo")}
              </p>

              <Spacer size={2} />
              <SafeHTML html={productData.moreInfo} />
            </>
          )}
        </Container>

        <Spacer size={24} />
      </Loader>
      <Spacer sm={16} md={24} lg={24} />

      {/* Newsletter */}
      <Container fluid className="bg-gray-100 dark:bg-gray-800 text-white">
        <Newsletter />
      </Container>
    </Layout>
  );
}

export default Product;

function SafeHTML({ html }: { html: string }) {
  const [showMore, setShowMore] = useState(false);

  const cleanHTML = DOMPurify.sanitize(html).substring(
    0,
    showMore ? html.length : 50
  );
  return (
    <div className="relative">
      <div
        className="dark:text-gray-300 html-content"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />

      {!showMore && (
        <div className="h-14 w-full  top-0 left-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent z-30 absolute"></div>
      )}
      <Button
        variant="ghost"
        onClick={() => setShowMore(!showMore)}
        className="dark:text-white mt-6"
      >
        {showMore ? (
          <>
            Show less
            <IconChevronUp />
          </>
        ) : (
          <>
            Show more
            <IconChevronDown />
          </>
        )}
      </Button>
    </div>
  );
}

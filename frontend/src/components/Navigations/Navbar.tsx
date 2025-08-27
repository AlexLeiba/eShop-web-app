import React from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ShoppingCart } from "./ShoppingCart";
import { LanguagesSelect } from "../Language/LanguagesSelect";
import { Container } from "../Grid/Container";
import { WishList } from "./WishList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import SearchSelector from "./SearchSelector";
import { MyAccountDropdown } from "./MyAccountDropdown";
import type { UserType } from "../../store/userData/reducer";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { fetchWishlist } from "../../store/wishList/apiCalls";
import { fetchCartData } from "../../store/cart/apiCalls";
import { IconShoppingBag } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { usePrivateAxiosInstance } from "../../hooks/useValidAccessToken";
import { cn } from "../../lib/utils";

export function Navbar() {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const { t } = useTranslation("translation", { keyPrefix: "HeaderSection" });
  const stateCartQuantity = useSelector(
    (state: RootState) => state.cart.quantity
  );
  const stateWishList = useSelector((state: RootState) => state.wishlist?.data);
  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionToken = userData?.token || "";
  usePrivateAxiosInstance();

  const withListQuantity = stateWishList?.length;

  const navLinks = [
    {
      name: t("login"),
      slug: "/login",
    },
  ];

  // Fetch cart and favorite data only if we do not have their data in redux, this way we will prevent overfetching  data each time
  React.useEffect(() => {
    const language = localStorage.getItem("language");
    async function fetchData() {
      // Wishlist data
      if (withListQuantity === 0) {
        const responseWishlist = await fetchWishlist({
          dispatch,
          token: sessionToken,
          language: language?.toLowerCase() || "en",
        });

        if (responseWishlist?.error) {
          toast.error(responseWishlist.error);
        }
      }

      // Cart data
      if (stateCartQuantity === 0) {
        const responseCart = await fetchCartData({
          dispatch,
          token: sessionToken,
          language: language?.toLowerCase() || "en",
        });

        if (responseCart?.error) {
          if (responseCart.error !== "Cart not found") {
            toast.error(responseCart.error);
          }
        }
      }
    }
    sessionToken && fetchData();

    // window.document.body.classList.add("dark");
  }, []);
  return (
    <div className="w-full h-14 bg-gray-300 flex items-center fixed top-0 z-50   dark:bg-gray-800 ">
      <Container className="w-full h-full flex items-center justify-center">
        <div className="flex justify-between w-full dark:text-white gap-2">
          {/* Logo */}
          <div className=" flex-1 md:flex hidden ">
            <Logo />
          </div>
          {/* Shopping Bag */}
          <Link
            to={"/"}
            title="Home"
            className="md:hidden flex justify-center items-center"
          >
            <IconShoppingBag className="text-green-500 " size={24} />
          </Link>
          <div className="flex flex-5 md:flex-4 gap-4 items-center">
            {/* Languages */}
            <LanguagesSelect />

            {/* Search */}
            <SearchSelector />
          </div>

          {/* Links */}
          <div className="flex flex-1 md:flex-2 items-center justify-end gap-4">
            {/* All products */}
            <Link
              to={"/products?sort=newest&page=1"}
              title="All Products"
              className="group hidden md:block"
            >
              <p>{t("products")}</p>
              <div
                className={cn(
                  " w-0 h-[1px] dark:bg-white bg-black transition-all ease-in-out",
                  pathname.includes("products")
                    ? "w-full"
                    : "group-hover:w-full"
                )}
              ></div>
            </Link>
            {/* Wish list */}
            <div className=" gap-4 items-center  lg:flex md:flex hidden">
              <WishList quantity={withListQuantity} />

              {/* Cart */}

              <ShoppingCart quantity={stateCartQuantity} />
            </div>
            {sessionToken ? (
              <MyAccountDropdown
                withListQuantity={withListQuantity}
                cartQuantity={stateCartQuantity}
                userData={userData?.data as UserType["data"]}
              />
            ) : (
              navLinks.map((navLink) => {
                return (
                  <NavLinks
                    key={navLink.slug}
                    name={navLink.name}
                    slug={navLink.slug}
                  />
                );
              })
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

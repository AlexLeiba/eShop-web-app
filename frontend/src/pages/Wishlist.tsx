import { Link } from "react-router-dom";
import { Container } from "../components/Grid/Container";
import { Newsletter } from "../components/Home/Newsletter";
import { Announcement } from "../components/ui/Announcement";
import { Button } from "../components/ui/Button";
import { Spacer } from "../components/ui/spacer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { WishListCard } from "../components/WishList/WishListCard";
import { IconChevronLeft, IconHeart, IconTrash } from "@tabler/icons-react";
import {
  deleteAllElemensFromWishlist,
  fetchWishlist,
} from "../store/wishList/apiCalls";
import toast from "react-hot-toast";
import React from "react";
import { Loader } from "../components/ui/Loader";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalProvider,
  ModalTitle,
  ModalTrigger,
} from "../components/ui/Modal";
import { Layout } from "../components/Layout/Layout";
import { useSessionToken } from "../hooks/useSesstionToken";

function Wishlist() {
  const { t } = useTranslation("translation", { keyPrefix: "WishlistPage" });
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const sessionToken = useSessionToken();

  const wishListData = useSelector((state: RootState) => state.wishlist.data);

  async function handleClearList() {
    const response = await deleteAllElemensFromWishlist({
      dispatch,
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t("toast.clearedList"));
    }
  }

  React.useEffect(() => {
    const language = localStorage.getItem("language");
    async function fetchData() {
      setLoading(true);
      const response = await fetchWishlist({
        dispatch,
        token: sessionToken,
        language: language?.toLowerCase() || "en",
      });

      if (response?.error) {
        toast.error(response.error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <Layout>
      <Announcement
        title="lorem20 is coming soon dsdsadsa sdadsa dsadsad"
        link="google.com"
        linkTitle="Read More"
      />

      <Spacer size={24} />

      <div className="flex flex-grow-1 flex-col">
        <Container>
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-4xl font-medium text-center"> {t("title")} </h1>
            <IconHeart size={32} className="text-red-500" />
          </div>
          <Loader loading={loading} className="h-[152px]">
            <div className="">
              <div className="grid span-2 ">
                <Spacer size={8} />
                {wishListData.length > 0 && (
                  <div className="flex justify-between">
                    <Link to="/products?sort=newest&page=1">
                      <Button
                        className="lg:w-[250px] w-[100px] flex justify-center items-center"
                        variant="secondary"
                      >
                        <IconChevronLeft className="lg:ml-2" />

                        <p className="lg:block hidden">
                          {t("continueShoppingButton")}
                        </p>
                      </Button>
                    </Link>
                    <ModalProvider
                      onConfirm={handleClearList}
                      title={t("modal.title")}
                      description={t("modal.description")}
                    >
                      <ModalTrigger>
                        <Button
                          className="lg:w-[200px] w-[100px]  flex justify-center items-center"
                          variant="secondary"
                        >
                          <p className="lg:block hidden">
                            {t("clearListButton")}
                          </p>
                          <IconTrash className="lg:ml-2 text-red-500" />
                        </Button>
                      </ModalTrigger>
                      <Modal>
                        <ModalHeader>
                          <ModalTitle />
                        </ModalHeader>
                        <ModalContent>
                          <ModalDescription />
                        </ModalContent>
                        <ModalFooter />
                      </Modal>
                    </ModalProvider>
                  </div>
                )}

                <Spacer size={8} />

                {/* Cart products List */}
                <div className="flex gap-8 flex-col">
                  {wishListData?.map((item) => {
                    return (
                      <div key={item._id}>
                        <WishListCard type="wishList" data={item} />
                      </div>
                    );
                  })}
                  {wishListData.length === 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold">
                        {t("wishlistEmpty")}
                      </h2>
                      <Link to="/products?sort=newest&page=1">
                        <Spacer size={4} />
                        <Button className="w-[250px]" variant="secondary">
                          {t("continueShoppingButton")}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Loader>
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container fluid className="bg-gray-100 ">
          <Newsletter />
        </Container>
      </div>
    </Layout>
  );
}

export default Wishlist;

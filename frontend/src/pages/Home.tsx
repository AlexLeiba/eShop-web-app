import { Link, useLocation } from "react-router-dom";
import { Container } from "../components/Grid/Container";
import { Categories } from "../components/Home/Categories";
import { Newsletter } from "../components/Home/Newsletter";
import { Products } from "../components/Home/Products";
import { Announcement } from "../components/ui/Announcement";
import { Slider } from "../components/ui/Slider";
import { Spacer } from "../components/ui/spacer";
import { useEffect } from "react";
import toast from "react-hot-toast";
import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout/Layout";
import { fetchProducts } from "../store/products/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Home() {
  const { t } = useTranslation("translation", { keyPrefix: "DashboardPage" });
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const featuredProductsData = useSelector(
    (state: RootState) => state.products.featuredProducts
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const language = localStorage.getItem("language") || "en";
    async function fetchData() {
      let timerStarted = false;
      const timer = setTimeout(() => {
        if (!timerStarted) {
          toast.loading(`${t("toast.loading")}`, {
            id: "loading",
          });
        }
        timerStarted = true;
      }, 4000);

      try {
        const response = await fetchProducts({
          dispatch,
          language: language?.toLowerCase() || "en",
        });

        if (response?.error) {
          throw new Error(response.error);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        clearTimeout(timer);
        toast.dismiss("loading");
      }
    }

    fetchData();

    document.title = "Home | eShop App";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", "Shopping app");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Shopping app";
      document.head.appendChild(newMeta);
    }
  }, [pathname, dispatch, t]);
  return (
    <>
      <Layout>
        <Announcement title="lorem20 is coming soon dsdsadsa sdadsa dsadsad" />
        <div className="flex flex-grow-1 flex-col">
          {/* FEATURED PRODUCTS HERO SLIDER */}
          <Container fluid>
            <Slider data={featuredProductsData.data} />
          </Container>
          <Spacer sm={16} md={24} lg={24} />

          {/* CATEGORIES */}
          <Container>
            <Categories />
          </Container>
          <Spacer sm={16} md={24} lg={24} />

          {/* PRODUCTS */}
          <Container>
            <div className="flex justify-between items-center">
              <h2 className="dark:text-white text-4xl font-bold">
                {t("ProductsSection.title")}
              </h2>
              <Link
                className="group"
                to={"/products?sort=newest&page=1"}
                title={t("ProductsSection.allProducts")}
              >
                <p className="text-2xl font-bold  dark:text-white">
                  {t("ProductsSection.allProducts")}
                </p>
                <div className="w-full h-[1px] bg-gray-800 dark:bg-white group-hover:w-0 transition-all ease-in-out"></div>
              </Link>
            </div>
            <Products loading={loading} type="dashboard" />
          </Container>

          {/* NEWSLETTER */}
          <Spacer sm={16} md={24} lg={24} />
          <Container
            fluid
            className="bg-gray-100 dark:bg-gray-800 dark:text-white "
          >
            <Newsletter />
          </Container>
        </div>
      </Layout>
    </>
  );
}

export default Home;

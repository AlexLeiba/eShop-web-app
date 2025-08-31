import { Container } from "../components/Grid/Container";
import { Newsletter } from "../components/Home/Newsletter";
import { Products } from "../components/Home/Products";
import Filter from "../components/Products/Filter";
import { Announcement } from "../components/ui/Announcement";

import { Spacer } from "../components/ui/spacer";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";
import {
  filterCategories,
  filterColors,
  filterSizes,
  sortOptions,
  type ProductsType,
} from "../consts";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout/Layout";
import { getProducts } from "../store/products/reducer";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../lib/axiosInstance";

export type ProductsDataType = {
  data: ProductsType[];
  count: number;
};

function ProductsList() {
  const { t } = useTranslation("translation", { keyPrefix: "ProductsPage" });
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    const language = localStorage.getItem("language");
    async function fetchData() {
      try {
        const { data: responseData } = await axiosInstance({
          url: `/api/products?language=${language?.toLowerCase() || "en"}&${
            location.search
          }`,
          method: "GET",
        });

        dispatch(
          getProducts({
            data: responseData.data,
            count: responseData.count,
          })
        );
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    document.title = "Products | eShop App";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", "Shopping app");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Shopping app";
      document.head.appendChild(newMeta);
    }
  }, [searchParams, dispatch, location.search]);

  return (
    <Layout>
      <Announcement
        title="lorem20 is coming soon dsdsadsa sdadsa dsadsad"
        link="google.com"
        linkTitle="Read More"
      />

      <Spacer size={24} />

      <div className="">
        <Container>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold dark:text-white">
              {t("title")}
              {selectedCategory && selectedCategory !== "all" && (
                <span className="text-2xl text-gray-500 dark:text-gray-400">
                  {"/" + selectedCategory || ""}
                </span>
              )}
            </h2>
            <Spacer sm={8} md={8} lg={8} />
            {/* Selected category */}
          </div>
          <Spacer size={8} />

          {/* Filters */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex align-center gap-2 flex-wrap">
              <div className="flex gap-4 flex-wrap">
                <Filter type="color" data={filterColors} />
                <Filter type="size" data={filterSizes} />
                <Filter type="category" data={filterCategories} />
              </div>
            </div>
            <div className="flex align-center gap-2">
              <div className="flex gap-4">
                <Filter type="sort" data={sortOptions} />
              </div>
            </div>
          </div>

          {/* Products */}
          <Spacer size={8} />
          <Products loading={loading} type="products-list" />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container
          fluid
          className="bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          <Newsletter />
        </Container>
      </div>
    </Layout>
  );
}

export default ProductsList;

import { Spacer } from "../ui/spacer";
import { ProductsCard } from "./ProductsCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "../ui/Button";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { ProductsSkeleton } from "./ProductsSkeleton";

type ProductsProps = {
  type: "dashboard" | "products-list";
  loading: boolean;
};
export function Products({ type, loading }: ProductsProps) {
  const productsData = useSelector((state: RootState) => state.products);
  const { t } = useTranslation("translation", { keyPrefix: "ProductsPage" });
  const [searchParams, setSearchParams] = useSearchParams();
  const limitPerPage = 12;

  function handleChangePage(direction: "prev" | "next") {
    const params = new URLSearchParams(searchParams);

    // PREV PAGE
    if (direction === "prev") {
      const prevPage = Number(searchParams.get("page") || 0) - 1;
      if (prevPage === 0) return;

      params.set("page", prevPage.toString());
      setSearchParams(params);
      window.scrollTo(0, 0);
    } else {
      const nextPage = (Number(searchParams.get("page")) || 0) + 1;
      // NEXT PAGE
      if (productsData.productsCount > limitPerPage * (nextPage - 1)) {
        // TODO: return all products counted from backend/ check on change page if : limitPerPage * PAGE < ALLProducts
        params.set("page", nextPage.toString());
        setSearchParams(params);
        window.scrollTo(0, 0);
      }
    }
  }

  return (
    <>
      <Spacer sm={8} md={8} lg={8} />

      {type === "products-list" && (
        <div className="flex gap-4 items-center">
          <p className="text-1xl font-bold dark:text-gray-200">
            {t("found")}: {productsData.productsCount}
          </p>
          <p className="dark:text-gray-200">
            {t("page")}: {searchParams.get("page")} /{" "}
            {Math.ceil(productsData.productsCount / limitPerPage) || 1}
          </p>
        </div>
      )}
      <Spacer size={2} />

      {loading ? (
        <ProductsSkeleton />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4  ">
          {productsData?.products && productsData.products.length > 0 ? (
            productsData.products?.map((data) => {
              return <ProductsCard data={data} key={data._id} />;
            })
          ) : (
            <p>{t("noProductsFound")}</p>
          )}
        </div>
      )}
      <Spacer sm={8} md={8} lg={8} />
      {type === "products-list" && (
        <div className="flex justify-between items-center gap-4">
          <Button
            title="Previous page"
            disabled={Number(searchParams.get("page")) === 1}
            variant="secondary"
            onClick={() => handleChangePage("prev")}
            className="w-[100px] group"
          >
            <IconChevronLeft className="group-hover:-translate-x-3 transition-all" />
          </Button>

          <Button
            title="Next page"
            disabled={
              limitPerPage * Number(searchParams.get("page")) >
              productsData.productsCount
            }
            variant="secondary"
            onClick={() => handleChangePage("next")}
            className="w-[100px] group"
          >
            <IconChevronRight className="group-hover:translate-x-3 transition-all" />
          </Button>
        </div>
      )}
    </>
  );
}

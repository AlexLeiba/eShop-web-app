import React, { useEffect } from "react";
import { SearchInput } from "../ui/SearchInput";
import { type ProductsType } from "../../consts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IconLoader } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/search/reducer";
import type { RootState } from "../../store/store";

const initialProductData: ProductsType[] = [];

function SearchSelector() {
  const { t } = useTranslation("translation", { keyPrefix: "HeaderSection" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const searchValue = useSelector(
    (state: RootState) => state.search.searchTerm
  );

  const [productsData, setProductsData] =
    React.useState<ProductsType[]>(initialProductData);

  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const language = localStorage.getItem("language") || "en";
    setLoading(true);
    async function fetchData() {
      if (searchValue !== "") {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/search-products?search=${searchValue}&language=${language?.toLowerCase()}`
          );
          const { data } = await response.json();

          setProductsData(data);
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (searchValue) {
          dispatch(setSearchTerm(""));
        }
        if (productsData.length > 0) {
          setProductsData(initialProductData);
        }
      }
    });
  }, [searchValue, productsData]);

  return (
    <div className="relative w-full" ref={containerRef} title="Search Products">
      <SearchInput
        label={""}
        placeholder={t("searchPlaceholder")}
        error={""}
        type={"text"}
      />

      {searchValue && (
        <div className="absolute top-10 left-0 w-full bg-white dark:bg-gray-500 shadow-lg rounded-md z-50 px-2 py-4 flex flex-col gap-4">
          {loading ? (
            <div className="flex items-center justify-center animate-spin">
              <IconLoader />
            </div>
          ) : productsData && productsData.length > 0 ? (
            productsData.map((item) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    dispatch(setSearchTerm(""));
                  }}
                  key={item._id + item.title}
                  className="hover:text-white gap-4  px-2 relative rounded-sm w-full h-12 flex items-center hover:bg-gray-400 transition-all cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                  <p>{item.title}</p>
                </div>
              );
            })
          ) : (
            <p>{t("noProductsFound")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchSelector;

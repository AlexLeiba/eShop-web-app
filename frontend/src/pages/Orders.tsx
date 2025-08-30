import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "../components/Grid/Container";
import { Newsletter } from "../components/Home/Newsletter";
import { Announcement } from "../components/ui/Announcement";
import { Spacer } from "../components/ui/spacer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { columns, type OrderType } from "../consts";
import { Loader } from "../components/ui/Loader";
import { Layout } from "../components/Layout/Layout";
import { useSessionToken } from "../hooks/useSesstionToken";
import { axiosPrivateInstance } from "../lib/axiosInstance";
import { imageOptimisation } from "../lib/utils";

export type OrdersDataType = {
  data: OrderType[];
  count: number;
};

function Orders() {
  const { t } = useTranslation("translation", { keyPrefix: "OrdersPage" });

  const sessionToken = useSessionToken();

  const [ordersData, setOrdersData] = React.useState<OrderType[]>([]);

  const [loading, setLoading] = React.useState(true);

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    const language = localStorage.getItem("language");
    async function fetchData() {
      try {
        const { data: responseData }: { data: { data: OrderType[] } } =
          await axiosPrivateInstance({
            url: `/api/orders?language=${language?.toLowerCase() || "en"}`,
            method: "GET",
            headers: {
              token: `Bearer ${sessionToken}`,
            },
          });

        setOrdersData(responseData.data || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams, sessionToken]);

  function rowsData() {
    return (
      ordersData &&
      ordersData?.map((row) => {
        return (
          <TableRow
            key={row._id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {columns.map((column) => {
              if (column.id === "createdAt") {
                const date = new Date(row[column.id]);
                const formattedDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: 200 }}
                    component="th"
                  >
                    <p className="dark:text-white"> {formattedDate}</p>
                  </TableCell>
                );
              } else if (column.id === "totalPrice") {
                return (
                  <TableCell key={column.id} style={{ minWidth: 150 }}>
                    <p className="dark:text-white">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(row[column.id] as number)}
                    </p>
                  </TableCell>
                );
              } else if (column.id === "status") {
                return (
                  <TableCell key={column.id} style={{ minWidth: 100 }}>
                    {row[column.id] === "PAID" ? (
                      <p className="text-green-500 font-medium">
                        <b>{row[column.id]}</b>
                      </p>
                    ) : (
                      <p className="text-red-500 font-medium">
                        {row[column.id]}
                      </p>
                    )}
                  </TableCell>
                );
              } else if (column.id === "products") {
                return (
                  <TableCell key={column.id} style={{ minWidth: 100 }}>
                    {row[column.id][0].image && (
                      <img
                        loading="lazy"
                        className="w-14  object-contain"
                        src={imageOptimisation(
                          row[column.id][0].image as string
                        )}
                        alt="product"
                      />
                    )}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={column.id} style={{ minWidth: 150 }}>
                    <p className="dark:text-white">
                      {row[column.id] as string}
                    </p>
                  </TableCell>
                );
              }
            })}
          </TableRow>
        );
      })
    );
  }
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
          <Loader loading={loading} className="h-[152px]">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold dark:text-white">
                {t("title")}
                {selectedCategory && selectedCategory !== "all" && (
                  <span className="text-2xl text-gray-500">
                    {"/" + selectedCategory || ""}
                  </span>
                )}
              </h2>
              <Spacer sm={8} md={8} lg={8} />
            </div>

            <Spacer size={8} />

            {!loading && ordersData.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                {t("noOrders")}
              </div>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    className="dark:bg-gray-800 "
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((data) => {
                          return (
                            <TableCell sx={{ width: 800 }} key={data.id}>
                              <p className="dark:text-white">
                                <b> {data.label}</b>
                              </p>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>{rowsData()}</TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Loader>
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container
          fluid
          className="bg-gray-100 dark:bg-gray-800 dark:text-white "
        >
          <Newsletter />
        </Container>
      </div>
    </Layout>
  );
}

export default Orders;

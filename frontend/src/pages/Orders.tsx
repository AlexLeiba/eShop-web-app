import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import { Announcement } from '../components/ui/Announcement';

import { Spacer } from '../components/ui/spacer';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useTranslation } from 'react-i18next';
import type { OrderType } from '../consts';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Loader } from '../components/ui/Loader';

export type OrdersDataType = {
  data: OrderType[];
  count: number;
};

function Orders() {
  const { t } = useTranslation('translation', { keyPrefix: 'OrdersPage' });

  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  const [ordersData, setOrdersData] = React.useState<OrderType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    const language = localStorage.getItem('language');
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders?language=${
            language?.toLowerCase() || 'en'
          }`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${sessionToken}`,
            },
          }
        );
        const { data: responseData }: { data: OrderType[] } =
          await response.json();

        setOrdersData(responseData || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  const columns: { id: keyof OrderType; label: string }[] = [
    // {
    //   id: 'userId',
    //   label: 'User ID',
    // },
    // {
    //   id: 'stripeId',
    //   label: 'Stripe ID',
    // },
    {
      id: 'userEmail',
      label: 'User Email',
    },
    {
      id: 'userName',
      label: 'User Name',
    },
    {
      id: 'quantity',
      label: 'Amount of Products',
    },
    {
      id: 'totalPrice',
      label: 'Total Price',
    },
    {
      id: 'createdAt',
      label: 'Created At',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <Navbar />
      <Announcement
        title='lorem20 is coming soon dsdsadsa sdadsa dsadsad'
        link='google.com'
        linkTitle='Read More'
      />

      <Spacer sm={16} md={24} lg={24} />

      <div className=''>
        <Container>
          <div className='flex justify-between items-center'>
            <h2 className='text-4xl font-bold'>
              {t('title')}
              {selectedCategory && selectedCategory !== 'all' && (
                <span className='text-2xl text-gray-500'>
                  {'/' + selectedCategory || ''}
                </span>
              )}
            </h2>
            <Spacer sm={8} md={8} lg={8} />
          </div>

          <Spacer size={8} />

          <Loader loading={loading} className='h-[152px]'>
            {!loading && ordersData.length === 0 ? (
              <div className='text-center text-gray-500 mt-8'>
                {t('noOrders')}
              </div>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        {columns.map((data) => {
                          return (
                            <TableCell key={data.id}>{data.label}</TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ordersData.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          {columns.map((column) => {
                            if (column.id === 'createdAt') {
                              const date = new Date(row[column.id]);
                              const formattedDate = date.toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              );

                              return (
                                <TableCell
                                  key={column.id}
                                  component='th'
                                  scope='row'
                                >
                                  <p>{formattedDate}</p>
                                </TableCell>
                              );
                            } else if (column.id === 'totalPrice') {
                              return (
                                <TableCell
                                  key={column.id}
                                  component='th'
                                  scope='row'
                                >
                                  <p>
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                    }).format(row[column.id] as number)}
                                  </p>
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell
                                  key={column.id}
                                  component='th'
                                  scope='row'
                                >
                                  <p>{row[column.id] as string}</p>
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Loader>
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;

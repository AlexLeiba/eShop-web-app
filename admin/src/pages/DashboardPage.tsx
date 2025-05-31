import React from 'react';
import { Charts } from '../components/DashboardPage/Charts';
import { LatestTransactions } from '../components/DashboardPage/LatestTransactions';
import { NewMembers } from '../components/DashboardPage/NewMembers';
import { GridContainer } from '../components/Grid/GridContainer';
import { Layout } from '../components/Layout/Layout';
import Spacer from '../components/ui/Spacer';
import { MONTHS } from '../lib/consts';
import toast from 'react-hot-toast';
import { apiFactory } from '../lib/apiFactory';
import type { RootState } from '../store/config';
import { useSelector } from 'react-redux';
import { type UserType } from '../lib/types';

function Dashboard() {
  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionToken = userData?.token || '';

  const [dashboardData, setDashboardData] = React.useState<{
    users: UserType[];
    usersStats: { _id: number; total: number }[];
    productsStats: { _id: number; total: number }[];
    transactions: any[];
  }>({
    users: [],
    usersStats: [],
    productsStats: [],
    transactions: [],
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        toast.loading('Loading...', {
          id: 'savingToastId',
        });

        const responseData = await apiFactory().getDashboardData(sessionToken);
        let responseStats: { _id: number; total: number }[] = [];

        let responseStatsSoldProducts: {
          _id: number;
          total: number;
          totalPrice: number;
        }[] = [];
        if (responseData.data) {
          // REGISTERED USERS
          if (responseData.data.usersStats) {
            responseStats = responseData.data.usersStats.map(
              (statData: { _id: number; total: number }) => {
                return {
                  month: MONTHS[statData._id],
                  'Active Users': statData.total,
                };
              }
            );
          }

          // SOLD PRODUCTS
          if (responseData.data.productsStats) {
            responseStatsSoldProducts = responseData.data.productsStats.map(
              (statData: {
                _id: number;
                total: number;
                totalPrice: number;
              }) => {
                return {
                  month: MONTHS[statData._id],
                  'Sold products': statData.total,
                  'Total income': statData.totalPrice,
                };
              }
            );
          }

          setDashboardData({
            users: responseData.data.users,
            usersStats: responseStats,
            productsStats: responseStatsSoldProducts,
            transactions: responseData.data.transactions,
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        toast.dismiss('savingToastId');
      }
    }
    fetchData();
  }, []);
  return (
    <Layout>
      <GridContainer fluid>
        <h1>Dashboard</h1>
        <Spacer size={24} />
        {/* SALES INFO
        <div className='grid-container-3'>
          {SALES_INFO_DATA?.map((item) => {
            return <SalesInfo key={item.title} salesData={item} />;
          })}
        </div> */}
        {/* CHARTS SOLD PRODUCTS */}
        <Spacer size={24} />
        <Charts type='soldProducts' chartsData={dashboardData.productsStats} />
        <Spacer size={24} />
        {/* CHARTS REGISTRED USERS */}
        <Charts type='registeredUsers' chartsData={dashboardData.usersStats} />
        <Spacer size={24} />
        <div className='grid-container-dashboard-2'>
          {/* NEW MEMBERS */}
          <NewMembers newMembersData={dashboardData.users} />

          {/* LAST TRANSACTIONS */}
          <LatestTransactions transactionData={dashboardData.transactions} />
          <Spacer size={48} />
        </div>
      </GridContainer>
    </Layout>
  );
}

export default Dashboard;

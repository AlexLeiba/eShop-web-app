import React from 'react';
import { Charts } from '../components/DashboardPage/Charts';
import { LatestTransactions } from '../components/DashboardPage/LatestTransactions';
import { NewMembers } from '../components/DashboardPage/NewMembers';
import SalesInfo from '../components/DashboardPage/SalesInfo';
import { GridContainer } from '../components/Grid/GridContainer';
import { Layout } from '../components/Layout/Layout';
import Spacer from '../components/ui/Spacer';
import { MONTHS, SALES_INFO_DATA } from '../lib/consts';
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
    stats: { _id: number; total: number }[];
    transactions: any[];
  }>({
    users: [],
    stats: [],
    transactions: [],
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        toast.loading('Loading...', {
          id: 'savingToastId',
        });

        const responseData = await apiFactory().getDashboardData(sessionToken);
        let responseStats = [];
        if (responseData.data) {
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
          console.log('🚀 ~ fetchData ~ responseStats:', responseStats);
          console.log('🚀 ~ fetchData ~ responseData.data:', responseData.data);
          setDashboardData({
            users: responseData.data.users,
            stats: responseStats,
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

        {/* SALES INFO */}
        <div className='grid-container-3'>
          {SALES_INFO_DATA?.map((item) => {
            return <SalesInfo key={item.title} salesData={item} />;
          })}
        </div>

        <Spacer size={24} />
        {/* CHARTS */}
        <Charts chartsData={dashboardData.stats} />
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

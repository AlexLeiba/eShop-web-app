import { Charts } from '../components/DashboardPage/Charts';
import { LatestTransactions } from '../components/DashboardPage/LatestTransactions';
import { NewMembers } from '../components/DashboardPage/NewMembers';
import SalesInfo from '../components/DashboardPage/SalesInfo';
import { GridContainer } from '../components/Grid/GridContainer';
import { Layout } from '../components/Layout/Layout';
import Spacer from '../components/ui/Spacer';
import {
  CHARTS_DATA,
  NEW_MEMBERS_DATA,
  SALES_INFO_DATA,
  TABLE_TRANSACTIONS_DATA,
} from '../lib/consts';

function Dashboard() {
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
        <Charts chartsData={CHARTS_DATA} />
        <Spacer size={24} />
        <div className='grid-container-2'>
          {/* NEW MEMBERS */}
          <NewMembers newMembersData={NEW_MEMBERS_DATA} />

          {/* LAST TRANSACTIONS */}
          <LatestTransactions transactionData={TABLE_TRANSACTIONS_DATA} />
          <Spacer size={48} />
        </div>
      </GridContainer>
    </Layout>
  );
}

export default Dashboard;

import { Charts } from '../components/DashboardPage/Charts';
import { LatestTransactions } from '../components/DashboardPage/LatestTransactions';
import { NewMembers } from '../components/DashboardPage/NewMembers';
import SalesInfo from '../components/DashboardPage/SalesInfo';
import { GridContainer } from '../components/Grid/GridContainer';
import { Layout } from '../components/Layout/Layout';
import Spacer from '../components/ui/Spacer';
import { SALES_INFO_DATA } from '../lib/consts';

function Dashboard() {
  return (
    <Layout>
      <GridContainer fluid>
        <h1>Dashboard</h1>

        <Spacer size={24} />
        {/* SALES INFO */}
        <div className='grid-container-3'>
          {SALES_INFO_DATA.map((item) => {
            return <SalesInfo key={item.title} salesData={item} />;
          })}
        </div>

        <Spacer size={24} />
        {/* CHARTS */}
        <Charts />
        <Spacer size={24} />
        <div className='grid-container-2'>
          {/* NEW MEMBERS */}
          <NewMembers />

          {/* LAST TRANSACTIONS */}
          <LatestTransactions />
        </div>
      </GridContainer>
    </Layout>
  );
}

export default Dashboard;

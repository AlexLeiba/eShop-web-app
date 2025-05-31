import Spacer from '../ui/Spacer';
import { WidgetCard } from '../ui/WidgetCard';
import './DashboardPage.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  chartsData: { [value: string]: number }[];
  type: 'registeredUsers' | 'soldProducts';
};

export function Charts({ chartsData, type }: Props) {
  return (
    <WidgetCard>
      <h4>
        {type === 'registeredUsers' ? 'Registered Users' : 'Sold Products'}
      </h4>
      <Spacer size={12} />
      <ResponsiveContainer aspect={3.5 / 1}>
        <LineChart
          width={500}
          height={300}
          data={chartsData || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='4 4' />
          {/* AXES */}
          <XAxis dataKey='month' padding={{ left: 20, right: 20 }} />
          {/* dataKey is the value from DataArray from which it will take value and compare it */}
          <YAxis />
          <Tooltip />
          <Legend />
          {/* LINES */}

          <Line
            type='monotone'
            dataKey={
              type === 'registeredUsers' ? 'Active Users' : 'Sold products'
            }
            stroke='#c38d22'
          />
          {type === 'soldProducts' && (
            <Line type='monotone' dataKey={'Total income'} stroke='#5ad168' />
          )}
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}

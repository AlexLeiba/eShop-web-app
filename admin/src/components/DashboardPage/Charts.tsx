import { CHARTS_DATA } from '../../lib/consts';
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
  chartsData: typeof CHARTS_DATA;
};
export function Charts({ chartsData }: Props) {
  return (
    <WidgetCard>
      <h4>Chart</h4>
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
          <XAxis dataKey='name' padding={{ left: 20, right: 20 }} />
          {/* dataKey is the value from dataArray from which it will compare value */}
          <YAxis />
          <Tooltip />
          <Legend />
          {/* LINES */}
          <Line
            type='monotone'
            dataKey='lastMonth'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line type='monotone' dataKey='currentMonth' stroke='#82ca9d' />
          <Line type='monotone' dataKey='totalIncome' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}

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

export function Charts() {
  return (
    <div className='container-charts'>
      <h3>Chart</h3>
      <ResponsiveContainer aspect={3.5 / 1}>
        <LineChart
          width={500}
          height={300}
          data={data}
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
    </div>
  );
}
const data = [
  {
    name: 'Page A',
    lastMonth: 4000,
    currentMonth: 2400,
    totalIncome: 2400,
  },
  {
    name: 'Page B',
    lastMonth: 3000,
    currentMonth: 1398,
    totalIncome: 2210,
  },
  {
    name: 'Page C',
    lastMonth: 2000,
    currentMonth: 9800,
    totalIncome: 2290,
  },
  {
    name: 'Page D',
    lastMonth: 2780,
    currentMonth: 3908,
    totalIncome: 2000,
  },
  {
    name: 'Page E',
    lastMonth: 1890,
    currentMonth: 4800,
    totalIncome: 2181,
  },
  {
    name: 'Page F',
    lastMonth: 2390,
    currentMonth: 3800,
    totalIncome: 2500,
  },
  {
    name: 'Page G',
    lastMonth: 3490,
    currentMonth: 4300,
    totalIncome: 2100,
  },
];

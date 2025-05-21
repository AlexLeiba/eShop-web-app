import {
  TABLE_TRANSACTIONS_COLUMNS,
  TABLE_TRANSACTIONS_DATA,
} from '../../lib/consts';
import Spacer from '../ui/Spacer';
import { WidgetCard } from '../ui/WidgetCard';
import './DashboardPage.scss';

type Props = {
  transactionData: typeof TABLE_TRANSACTIONS_DATA;
};
export function LatestTransactions({ transactionData }: Props) {
  return (
    <WidgetCard>
      <h4>Latest Transactions</h4>
      <Spacer size={12} />

      <table className='table-container'>
        <thead className='table-head'>
          <tr>
            {TABLE_TRANSACTIONS_COLUMNS.map((column) => {
              return (
                <th>
                  <p>{column.title}</p>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className='table-body'>
          {transactionData?.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </WidgetCard>
  );
}

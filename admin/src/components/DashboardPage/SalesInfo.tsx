import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import './DashboardPage.scss';

type Props = {
  salesData: {
    title: string;
    value: string;
  };
};
function SalesInfo({ salesData }: Props) {
  return (
    <div className='container-sales-info'>
      <p>{salesData.title}</p>

      <div className='flex-center-row'>
        <p>{salesData.value}</p>
        <IconArrowUp />
        <IconArrowDown />
      </div>

      <p>Compared to last month</p>
    </div>
  );
}

export default SalesInfo;

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
      <h4>{salesData.title}</h4>

      <div className='flex-center-row-4'>
        <p>{salesData.value}</p>
        <IconArrowUp color='#6ab96a' />
        <IconArrowDown color='#ff0000' />
      </div>

      <p>Compared to last month</p>
    </div>
  );
}

export default SalesInfo;
